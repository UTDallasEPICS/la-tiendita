import React from "react";
import { ScalarQuestion as ScalarQuestionType } from "../../../lib/types";

interface ScalarQuestionProps {
  question: ScalarQuestionType;
  value?: number;
  onChange: (value: number) => void;
}

const ScalarQuestion: React.FC<ScalarQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  const { minValue, maxValue } = question;
  const range = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => minValue + i
  );

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Strongly Disagree</span>
        <span className="text-sm text-gray-500">Strongly Agree</span>
      </div>

      <div className="flex justify-between">
        {range.map((num) => (
          <div key={num} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange(num)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                value === num
                  ? "bg-primary text-white scale-110 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
            <span className="mt-2 text-xs text-gray-500">{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScalarQuestion;
