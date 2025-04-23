import React from "react";
import { Question } from "./types";

interface FrqQuestionProps {
  question: Question;
  onResponse: (value: string) => void;
  currentResponse?: string;
}

export default function FrqQuestion({
  question,
  onResponse,
  currentResponse,
}: FrqQuestionProps) {
  return (
    <div>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        rows={4}
        placeholder="Type your answer here..."
        value={currentResponse || ""}
        onChange={(e) => onResponse(e.target.value)}
      ></textarea>
    </div>
  );
}
