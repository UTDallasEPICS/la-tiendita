import React from "react";
import { MCQQuestion as MCQQuestionType } from "../../../tempCreate/types";

interface MultipleChoiceQuestionProps {
  question: MCQQuestionType;
  value?: string;
  onChange: (value: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  const { optionsMap } = question;

  return (
    <div className="mt-4 space-y-3">
      {Object.entries(optionsMap).map(([key, option]) => (
        <div
          key={key}
          onClick={() => onChange(key)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            value === key
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                value === key
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {key}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{option.option}</p>
              <p className="text-sm text-gray-500">
                Category: {option.category}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
