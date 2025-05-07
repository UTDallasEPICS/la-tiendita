import React from "react";
import { Question } from "../../../../../lib/types";

interface FreeResponseResultProps {
  question: Question;
  answer: string;
}

const FreeResponseResult: React.FC<FreeResponseResultProps> = ({
  question,
  answer,
}) => {
  return (
    <div className="mt-4">
      <div className="w-full p-4 min-h-[150px] border-2 border-gray-200 rounded-lg bg-gray-50">
        <p className="whitespace-pre-wrap">{answer}</p>
      </div>
      <div className="flex justify-end mt-2 text-sm text-gray-500">
        <span>{answer.length} characters</span>
      </div>
    </div>
  );
};

export default FreeResponseResult;
