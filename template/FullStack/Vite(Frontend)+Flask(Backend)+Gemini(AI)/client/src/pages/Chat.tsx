"use client";
import { useState, useRef, useEffect } from "react";
import { InputGroup, InputGroupButton, InputGroupTextarea, InputGroupAddon } from "@/components/ui/input-group";
import {
    Message,
    MessageContent,
    MessageResponse,
} from "@/components/ui/message";
import { Loader2, ArrowUp, Camera, Image, X } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    images?: string[]; // Array of image URLs for preview
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [showCamera, setShowCamera] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Cleanup camera stream on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Update image previews when selectedImages change
    useEffect(() => {
        const newPreviews = selectedImages.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);

        // Cleanup old URLs
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [selectedImages]);

    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0 && files.length > 0) {
            toast.error("Please select image files only");
            return;
        }

        setSelectedImages(prev => [...prev, ...imageFiles]);
        
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleCameraClick = async () => {
        if (showCamera) {
            // Stop camera
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
            setShowCamera(false);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            streamRef.current = stream;
            setShowCamera(true);
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error: any) {
            toast.error("Failed to access camera", {
                description: error.message || "Please allow camera access"
            });
        }
    };

    const handleCapturePhoto = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
                    setSelectedImages(prev => [...prev, file]);
                    // Stop camera after capture
                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach(track => track.stop());
                        streamRef.current = null;
                    }
                    setShowCamera(false);
                }
            }, 'image/jpeg', 0.9);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

        // Create image preview URLs for display
        const imageUrls = selectedImages.map(file => URL.createObjectURL(file));

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim() || "",
            images: imageUrls,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setSelectedImages([]);
        setIsLoading(true);

        // Create abort controller for this request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        // Create assistant message placeholder
        const assistantMessageId = (Date.now() + 1).toString();
        const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: "assistant",
            content: "",
        };
        setMessages((prev) => [...prev, assistantMessage]);

        try {
            let response: Response;
            
            if (selectedImages.length > 0) {
                // Send multipart/form-data with images
                const formData = new FormData();
                formData.append('message', input.trim() || '');
                
                selectedImages.forEach((file) => {
                    formData.append('files[]', file);
                });

                response = await fetch(`${BACKEND_URL}/chat/stream`, {
                    method: "POST",
                    body: formData,
                    signal: abortController.signal,
                });
            } else {
                // Send JSON (text-only)
                response = await fetch(`${BACKEND_URL}/chat/stream`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: input.trim() }),
                    signal: abortController.signal,
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error("No reader available");
            }

            let buffer = "";
            let fullText = "";

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.type === "chunk" && data.text) {
                                fullText += data.text;
                                setMessages((prev) =>
                                    prev.map((msg) =>
                                        msg.id === assistantMessageId
                                            ? { ...msg, content: fullText }
                                            : msg
                                    )
                                );
                            } else if (data.type === "done") {
                                if (data.text) {
                                    fullText = data.text;
                                    setMessages((prev) =>
                                        prev.map((msg) =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: fullText }
                                                : msg
                                        )
                                    );
                                }
                            } else if (data.type === "error") {
                                throw new Error(data.error || "Unknown error occurred");
                            }
                        } catch (parseError) {
                            console.error("Error parsing SSE data:", parseError);
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === "AbortError") {
                // Request was aborted, remove the assistant message
                setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
                return;
            }

            toast.error("Error sending message", {
                description: error.message || "Failed to get response from server",
            });

            // Remove the assistant message on error
            setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <h1 className="text-lg font-semibold">Chat</h1>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto max-w-3xl py-6 px-4">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <p className="text-lg">Start a conversation</p>
                                <p className="text-sm">Send a message to begin chatting</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <Message key={message.id} from={message.role}>
                                    <MessageContent>
                                        {message.role === "user" ? (
                                            <div className="space-y-2">
                                                {message.images && message.images.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {message.images.map((imgUrl, idx) => (
                                                            <div key={idx} className="relative">
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Upload ${idx + 1}`}
                                                                    className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {message.content && (
                                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <MessageResponse>
                                                {message.content || "Thinking..."}
                                            </MessageResponse>
                                        )}
                                    </MessageContent>
                                </Message>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto max-w-3xl px-4 py-4">
                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2">
                            {imagePreviews.map((preview, idx) => (
                                <div key={idx} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${idx + 1}`}
                                        className="h-20 w-20 rounded-lg object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Camera Preview */}
                    {showCamera && (
                        <div className="mb-2 relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full max-h-64 rounded-lg object-cover"
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleCapturePhoto}
                                    className="rounded-full bg-primary p-3 text-primary-foreground hover:bg-primary/90"
                                >
                                    <Camera className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCameraClick}
                                    className="rounded-full bg-destructive p-3 text-destructive-foreground hover:bg-destructive/90"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSend} className="w-full">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <InputGroup>
                            <InputGroupTextarea
                                value={input}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                disabled={isLoading}
                            />
                            <InputGroupAddon align="block-end" className="flex items-center justify-between">
                            <div className="flex">
                            <InputGroupButton
                                    type="button"
                                    variant="ghost"
                                    className="rounded-full"
                                    size="icon-xs"
                                    onClick={handleCameraClick}
                                >
                                    <Camera />
                                </InputGroupButton>
                                <InputGroupButton
                                    type="button"
                                    variant="ghost"
                                    className="rounded-full"
                                    size="icon-xs"
                                    onClick={handleImageUpload}
                                >
                                    <Image />
                                </InputGroupButton>
                            </div>
                                <InputGroupButton
                                    variant="default"
                                    className="rounded-full"
                                    size="icon-xs"
                                    type="submit"
                                    disabled={(!input.trim() && selectedImages.length === 0) || isLoading}
                                >
                                    {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ArrowUp className="h-4 w-4" />
                                )}
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                </div>
            </div>
        </div>
    );
}

