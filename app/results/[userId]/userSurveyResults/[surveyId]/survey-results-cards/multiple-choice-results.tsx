import React from "react";
import { Question, MCQQuestion } from "../../../../../lib/types";

interface MultipleChoiceResultProps {
  question: MCQQuestion;
  answer: string;
}

const MultipleChoiceResult: React.FC<MultipleChoiceResultProps> = ({
  question,
  answer,
}) => {
  const { optionsMap } = question;

  if (!optionsMap) {
    return <div>Invalid multiple choice question configuration</div>;
  }

  return (
    <div className="mt-4 space-y-3">
      {Object.entries(optionsMap).map(([key, option]) => (
        <div
          key={key}
          className={`p-4 rounded-lg border-2 ${
            answer === key ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                answer === key
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

export default MultipleChoiceResult;
