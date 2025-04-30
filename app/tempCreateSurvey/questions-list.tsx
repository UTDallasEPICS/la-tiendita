import React from "react";
import { Question } from "./types";

interface QuestionsListProps {
  questions: Question[];
  onDeleteQuestion: (id: number) => void;
}

export default function QuestionsList({
  questions,
  onDeleteQuestion,
}: QuestionsListProps) {
  if (questions.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <p className="text-muted-foreground">No questions added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Questions</h2>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 border border-border rounded-md"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground mr-2">
                  {question.type}
                </span>
                {question.type !== "FRQ" && (
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {question.category}
                  </span>
                )}
              </div>
              <button
                onClick={() => onDeleteQuestion(question.id)}
                className="text-destructive hover:text-destructive-foreground"
              >
                Delete
              </button>
            </div>

            <h3 className="text-lg font-medium mb-3">
              {question.questionString}
            </h3>

            {question.type === "Scalar" && (
              <div className="ml-4">
                <p>
                  Range: {question.min_value} - {question.max_value}
                </p>
              </div>
            )}

            {question.type === "MCQ" && (
              <div className="ml-4 space-y-2">
                <p className="font-medium">Options:</p>
                <ul className="space-y-1">
                  {Object.entries(question.optionsMap).map(([key, option]) => (
                    <li key={key} className="flex items-start">
                      <span className="font-medium mr-2">{key}:</span>
                      <div>
                        <p>{option.option}</p>
                        <p className="text-sm text-muted-foreground">
                          Category: {option.category}, Weight:{" "}
                          {option.weight || 0}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
