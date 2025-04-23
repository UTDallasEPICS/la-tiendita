import React from "react";
import { FRQQuestion as FRQQuestionType } from "../../../tempCreate/types";

interface FreeResponseQuestionProps {
  question: FRQQuestionType;
  value?: string;
  onChange: (value: string) => void;
}

const FreeResponseQuestion: React.FC<FreeResponseQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="mt-4">
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full p-4 min-h-[150px] border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
      />
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Be thoughtful and honest in your response</span>
        <span>{value?.length || 0} characters</span>
      </div>
    </div>
  );
};

export default FreeResponseQuestion;
