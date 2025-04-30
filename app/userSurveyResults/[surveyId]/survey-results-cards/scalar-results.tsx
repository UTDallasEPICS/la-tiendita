import React from "react";
import { Question, ScalarQuestion } from "../../../lib/types";

interface ScalarResultProps {
  question: ScalarQuestion;
  answer: number;
}

const ScalarResult: React.FC<ScalarResultProps> = ({ question, answer }) => {
  const { minValue, maxValue } = question;

  if (minValue === null || maxValue === null) {
    return <div>Invalid scalar question configuration</div>;
  }

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
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                answer === num
                  ? "bg-primary text-white scale-110 shadow-md"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {num}
            </div>
            <span className="mt-2 text-xs text-gray-500">{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScalarResult;
