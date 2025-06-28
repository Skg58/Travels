"use client"
import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-3 h-[100vh] bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <div className="flex flex-col items-center">
        {/* Animated Loader */}
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-700"></div>
          {/* Animated Car SVG */}
          <div className="absolute h-16 w-16 flex items-center justify-center">
            <span className="block animate-car-move">
              <svg
                width="48"
                height="24"
                viewBox="0 0 48 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                <rect x="8" y="10" width="32" height="8" rx="3" fill="#2563eb"/>
                <rect x="12" y="6" width="24" height="8" rx="2" fill="#60a5fa"/>
                <circle cx="16" cy="20" r="3" fill="#222"/>
                <circle cx="32" cy="20" r="3" fill="#222"/>
                <circle cx="16" cy="20" r="1.5" fill="#fff"/>
                <circle cx="32" cy="20" r="1.5" fill="#fff"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Loading Text */}
        <p className="mt-8 text-xl md:text-2xl font-semibold text-blue-700 animate-pulse text-center">
          Loading  page...
        </p>
        {/* Subtext */}
        <p className="mt-2 text-sm md:text-base text-gray-500 text-center">
           Please wait while we load your experience.
        </p>
      </div>
      {/* Custom animation for car movement */}
      <style jsx>{`
        .animate-car-move {
          animation: car-move 1.2s ease-in-out infinite alternate;
        }
        @keyframes car-move {
          0% { transform: translateX(-12px); }
          100% { transform: translateX(12px); }
        }
      `}</style>
    </div>
  );
}


