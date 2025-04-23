import React from "react";
import { Question } from "./types";

interface McqQuestionProps {
  question: Question;
  onResponse: (value: string) => void;
  currentResponse?: string;
}

export default function McqQuestion({
  question,
  onResponse,
  currentResponse,
}: McqQuestionProps) {
  const optionsMap = question.optionsMap || {};
  const options = Object.entries(optionsMap);

  return (
    <div className="space-y-3">
      {options.map(([key, option]) => (
        <div
          key={key}
          className={`p-4 rounded-lg border cursor-pointer transition-all
            ${
              currentResponse === key
                ? "border-secondary bg-primary"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          onClick={() => onResponse(key)}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
              ${
                currentResponse === key
                  ? "bg-secondary"
                  : "border border-gray-400"
              }`}
            >
              {currentResponse === key && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-gray-800">{option.option}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
