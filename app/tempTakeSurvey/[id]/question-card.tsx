import React from "react";
import ScalarQuestion from "./scalar-question";
import McqQuestion from "./mcq-question";
import FrqQuestion from ".//frq-question";
import { Question } from "./types";

interface QuestionCardProps {
  question: Question;
  onResponse: (value: any) => void;
  currentResponse?: any;
}

export default function QuestionCard({
  question,
  onResponse,
  currentResponse,
}: QuestionCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {question.questionString}
      </h3>

      {question.type === "SCALAR" && (
        <ScalarQuestion
          question={question}
          onResponse={onResponse}
          currentResponse={currentResponse}
        />
      )}

      {question.type === "MULTIPLE_CHOICE" && (
        <McqQuestion
          question={question}
          onResponse={onResponse}
          currentResponse={currentResponse}
        />
      )}

      {question.type === "FREE_RESPONSE" && (
        <FrqQuestion
          question={question}
          onResponse={onResponse}
          currentResponse={currentResponse}
        />
      )}
    </div>
  );
}
