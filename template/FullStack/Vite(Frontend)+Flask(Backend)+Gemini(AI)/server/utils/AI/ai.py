from google import genai
from google.genai import types
from flask import request, jsonify, Response
from dotenv import load_dotenv
import os
import json
import mimetypes

load_dotenv()

api_key = os.getenv('GOOGLE_API_KEY')
client = None
if api_key:
    client = genai.Client(api_key=api_key)

def chat_handler():
    """
    Handler for chat/text generation requests.
    Expects JSON with 'message' or 'contents' field.
    Optionally accepts 'model' field (defaults to 'gemini-2.0-flash-exp').
    """
    try:
        if not client:
            return jsonify({"error": "GOOGLE_API_KEY environment variable is not set"}), 500
        
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        contents = data.get('message') or data.get('contents')
        if not contents:
            return jsonify({"error": "message or contents field is required"}), 400
        
        model = data.get('model', 'gemini-2.5-flash')
        
        response = client.models.generate_content(
            model=model,
            contents=contents,
        )
        
        response_text = response.text if hasattr(response, 'text') else str(response)
        
        return jsonify({
            "message": response_text,
            "model": model,
            "usage": {
                "prompt_tokens": response.usage_metadata.prompt_token_count if hasattr(response, 'usage_metadata') else None,
                "candidates_tokens": response.usage_metadata.candidates_token_count if hasattr(response, 'usage_metadata') else None,
                "total_tokens": response.usage_metadata.total_token_count if hasattr(response, 'usage_metadata') else None,
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def chat_stream_handler():
    """
    Handler for streaming chat/text generation requests.
    Accepts either:
    - JSON with 'message' or 'contents' field (text-only)
    - multipart/form-data with 'message' field and 'files[]' array (text + images)
    Optionally accepts 'model' field (defaults to 'gemini-2.5-flash').
    Returns a Server-Sent Events (SSE) stream.
    """
    try:
        if not client:
            return jsonify({"error": "GOOGLE_API_KEY environment variable is not set"}), 500
        
        # Check if request is multipart/form-data (has files) or JSON
        # Check if files are present first, then fall back to content-type check
        has_files = len(request.files) > 0
        is_multipart = has_files or (request.content_type and 'multipart/form-data' in request.content_type)
        
        # Supported image MIME types
        SUPPORTED_IMAGE_TYPES = {
            'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 
            'image/heic', 'image/heif'
        }
        
        # Extract message and model
        if is_multipart:
            message = request.form.get('message', '')
            model = request.form.get('model', 'gemini-2.5-flash')
            
            # Extract image files
            image_files = request.files.getlist('files[]')
            if not message and not image_files:
                return jsonify({"error": "message or images are required"}), 400
            
            # Process images
            image_parts = []
            for file in image_files:
                if file.filename == '':
                    continue
                
                # Validate file size (20MB limit for inline data)
                file.seek(0, os.SEEK_END)
                file_size = file.tell()
                file.seek(0)
                
                if file_size > 20 * 1024 * 1024:  # 20MB
                    return jsonify({"error": f"File {file.filename} exceeds 20MB size limit"}), 400
                
                # Detect MIME type
                mime_type, _ = mimetypes.guess_type(file.filename)
                if not mime_type:
                    # Try to infer from extension
                    ext = file.filename.lower().split('.')[-1] if '.' in file.filename else ''
                    mime_map = {
                        'jpg': 'image/jpeg',
                        'jpeg': 'image/jpeg',
                        'png': 'image/png',
                        'webp': 'image/webp',
                        'heic': 'image/heic',
                        'heif': 'image/heif'
                    }
                    mime_type = mime_map.get(ext, 'image/jpeg')
                
                # Normalize MIME type
                if mime_type == 'image/jpg':
                    mime_type = 'image/jpeg'
                
                # Validate MIME type
                if mime_type not in SUPPORTED_IMAGE_TYPES:
                    return jsonify({"error": f"Unsupported image format: {mime_type}. Supported: {', '.join(SUPPORTED_IMAGE_TYPES)}"}), 400
                
                # Read file bytes
                image_bytes = file.read()
                
                # Create Part object for image
                image_part = types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type
                )
                image_parts.append(image_part)
        else:
            # JSON request (backward compatibility)
            data = request.get_json()
            
            if not data:
                return jsonify({"error": "Request body is required"}), 400
            
            message = data.get('message') or data.get('contents')
            if not message:
                return jsonify({"error": "message or contents field is required"}), 400
            
            model = data.get('model', 'gemini-2.5-flash')
            image_parts = []
        
        # Construct contents array: images first, then text (per Gemini best practices)
        contents_list = []
        
        # Add image parts
        contents_list.extend(image_parts)
        
        # Add text message if provided
        if message:
            contents_list.append(message)
        
        if not contents_list:
            return jsonify({"error": "At least one image or message is required"}), 400
        
        def generate():
            """Generator function that yields SSE formatted chunks"""
            try:
                response_stream = client.models.generate_content_stream(
                    model=model,
                    config=types.GenerateContentConfig(
                        system_instruction="You are a helpful assistant"
                    ),
                    contents=contents_list,
                )
                
                yield f"data: {json.dumps({'type': 'start', 'model': model})}\n\n"
                
                full_text = ""
                for chunk in response_stream:
                    if hasattr(chunk, 'text') and chunk.text:
                        chunk_text = chunk.text
                        full_text += chunk_text
                        yield f"data: {json.dumps({'type': 'chunk', 'text': chunk_text})}\n\n"
                
                yield f"data: {json.dumps({'type': 'done', 'text': full_text})}\n\n"
                
            except Exception as e:
                yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
        
        return Response(
            generate(),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no',
                'Connection': 'keep-alive'
            }
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500