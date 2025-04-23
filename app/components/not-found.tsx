"use client";

import React, { useEffect, useState } from "react";

interface NotFoundProps {
  errorCode?: string;
  errorMessage?: string;
}

export default function NotFound({ errorCode, errorMessage }: NotFoundProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const code = errorCode || "404";
  const message = errorMessage || "Page Not Found";

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1
            className={`text-9xl font-bold text-primary transition-all duration-700 ${
              isAnimating
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-y-10"
            }`}
          >
            {code}
          </h1>
          <div
            className={`h-2 w-24 bg-primary mx-auto my-6 rounded transition-all duration-700 delay-200 ${
              isAnimating ? "opacity-100 transform-none" : "opacity-0 scale-x-0"
            }`}
          ></div>
          <h2
            className={`text-2xl font-semibold text-foreground mb-2 transition-all duration-700 delay-300 ${
              isAnimating
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            {message}
          </h2>
          <p
            className={`text-muted-foreground mb-8 transition-all duration-700 delay-400 ${
              isAnimating ? "opacity-100 transform-none" : "opacity-0"
            }`}
          >
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-500 ${
            isAnimating
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
