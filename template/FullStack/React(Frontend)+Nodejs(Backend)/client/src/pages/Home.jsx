import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import '../index.css'; // Import the CSS file

export default function Home() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Timer to remove the caret after the typing animation completes
    const timer = setTimeout(() => {
      setCompleted(true); // Set completed to true after the typing duration
    }, 3600); // Match the duration of typing animation

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div>
      <section className="relative py-12 md:py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto text-center">
          <div className="relative inline-block">
            {/* Typewriter Animation */}
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 text-white typewriter ${completed ? 'typewriter-complete' : ''}`}>
              Welcome To Your Webiste 
            </h1>
            <span className="absolute inset-0 animate-spin-slow"></span>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-400">
            Your catchy headline goes here. Make it <span className="text-white">impactful!</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 no-underline">
  Get Started
</Link>
<Link to="/about" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 no-underline">
  Learn More
</Link>

          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
