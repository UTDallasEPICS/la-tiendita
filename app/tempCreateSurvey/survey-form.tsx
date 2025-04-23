import React from "react";
import { Survey } from "./types";

interface SurveyFormProps {
  survey: Survey;
  onSurveyChange: (survey: Partial<Survey>) => void;
}

export default function SurveyForm({
  survey,
  onSurveyChange,
}: SurveyFormProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Survey Details</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={survey.title}
            onChange={(e) => onSurveyChange({ title: e.target.value })}
            className="w-full p-2 border border-border rounded-md"
            placeholder="Enter survey title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={survey.description}
            onChange={(e) => onSurveyChange({ description: e.target.value })}
            className="w-full p-2 border border-border rounded-md"
            rows={3}
            placeholder="Enter survey description"
          />
        </div>
      </div>
    </div>
  );
}
