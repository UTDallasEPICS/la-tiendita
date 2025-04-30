import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-background z-0">
      <div className="text-4xl font-bold text-black animate-pulse">
        Loading
        <span className="inline-block w-3 h-3 rounded-full bg-black ml-1 animate-bounce delay-0"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-black ml-1 animate-bounce delay-100"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-black ml-1 animate-bounce delay-200"></span>
      </div>
    </div>
  );
}
