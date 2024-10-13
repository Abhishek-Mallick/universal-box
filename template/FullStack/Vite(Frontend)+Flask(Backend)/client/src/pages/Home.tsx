"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { logout } from "./Signup";


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
      <button onClick={logout}>Logout</button>
    </div>
  );
}
