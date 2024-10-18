"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

interface HeroProps {
    onSignupClick: () => void; // Define the prop type
}

export const Hero: React.FC<HeroProps> = ({ onSignupClick }) => {
    
    const words = [
        {
            text: "Welcome",
        },
        {
            text: "to",
        },
        {
            text: "Landing",
            className: "text-blue-500 dark:text-blue-500",
        },
        
        {
            text: "page.",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center mt-40 ">
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center sm:text-left">
                This is the client landing page.
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                
                <button onClick={onSignupClick}>Sign Up</button>
            </div>
        </div>
    );
}
