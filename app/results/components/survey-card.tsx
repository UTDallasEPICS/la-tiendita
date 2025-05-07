import React from "react";
import { SurveyResults, Question, Survey } from "@/app/lib/types";

interface SurveyCardProps {
  survey: SurveyResults;
  onClick: () => void;
}

export default function SurveyCard({ survey, onClick }: SurveyCardProps) {
  const formattedDate = new Date(survey.createdAt).toLocaleDateString();
  console.log(survey);
  const questionCount = survey.answersData.length;

  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{survey.survey.title}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            survey.status === "Complete"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {survey.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {questionCount} question{questionCount !== 1 ? "s" : ""}
      </p>
      <p className="text-sm text-gray-500 mb-4">Completed on {formattedDate}</p>
      <div className="flex justify-end">
        <button
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={onClick}
        >
          View Results →
        </button>
      </div>
    </div>
  );
}
