import React from "react";
import { Question } from "./types";

interface ScalarQuestionProps {
  question: Question;
  onResponse: (value: number) => void;
  currentResponse?: number;
}

export default function ScalarQuestion({
  question,
  onResponse,
  currentResponse,
}: ScalarQuestionProps) {
  const minValue = question.minValue || 1;
  const maxValue = question.maxValue || 10;
  const range = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => i + minValue
  );

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Low</span>
        <span className="text-sm text-gray-500">High</span>
      </div>

      <div className="flex justify-between">
        {range.map((value) => (
          <button
            key={value}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
              ${
                currentResponse === value
                  ? "bg-secondary text-white"
                  : "bg-white border border-gray-300 hover:bg-primary"
              }`}
            onClick={() => onResponse(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500">{question.minValue}</span>
        <span className="text-sm text-gray-500">{question.maxValue}</span>
      </div>
    </div>
  );
}
