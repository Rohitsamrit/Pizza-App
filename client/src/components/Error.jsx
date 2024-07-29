import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Error() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div
          className="mx-auto w-48 h-48 relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/008/568/886/small/website-page-not-found-error-404-worried-robot-character-with-magnifying-glass-in-hand-site-crash-on-technical-work-eps-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg"
            alt="Error illustration"
            className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30 rounded-full"></div>
        </div>
        <h2 className="mt-6 text-5xl font-extrabold text-indigo-900 animate-bounce">
          404
        </h2>
        <p className="mt-2 text-3xl font-bold text-indigo-700">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-xl text-indigo-600">
          The page you're looking for seems to have wandered off...
        </p>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Take Me Home
          </Link>
          <Link
            to="/about"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
