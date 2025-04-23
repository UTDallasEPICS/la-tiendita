import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit?: () => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onSubmit,
}: PaginationControlsProps) {
  return (
    <div className="mt-8 flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-all
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Previous
      </button>

      <div className="text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {currentPage < totalPages ? (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-all"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          Submit
        </button>
      )}
    </div>
  );
}
