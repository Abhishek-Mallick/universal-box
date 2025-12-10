"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { logout } from "./Signup";
import { Link } from "react-router-dom";


export default function Home(): JSX.Element {

  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "Home",
      className: "text-blue-500 dark:text-blue-500",
    },

    {
      text: "page.",
    },

  ];
  return (
    <div className="flex flex-col items-center justify-center mt-40 ">
      <TypewriterEffectSmooth words={words} />
      <div className="flex gap-4">
        <Link to="/chat"><button>Chat</button></Link>
      <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
