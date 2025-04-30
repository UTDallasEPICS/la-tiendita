import React from "react";

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
  answeredQuestions: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentPage,
  totalPages,
  answeredQuestions,
  totalQuestions,
}) => {
  const pageProgress = (currentPage / totalPages) * 100;
  const questionProgress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-gray-50 px-6 py-4">
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-gray-700 font-medium">Survey Progress</span>
        <span className="text-gray-600">
          {answeredQuestions} of {totalQuestions} questions answered
        </span>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${questionProgress}%` }}
        />
      </div>

      <div className="flex justify-between mt-4 mb-1 text-sm">
        <span className="text-gray-700 font-medium">Page Progress</span>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              index < currentPage
                ? "bg-primary"
                : index === currentPage - 1
                ? "bg-primary"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
