import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64 py-20">
      <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
