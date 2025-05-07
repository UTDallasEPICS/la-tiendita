import React from "react";
import SurveyCard from "./survey-card";
import { Survey, SurveyResults } from "@/app/lib/types";

interface SurveyListProps {
  surveys: SurveyResults[];
  onSurveyClick: (surveyId: number) => void;
}

export default function SurveyList({
  surveys,
  onSurveyClick,
}: SurveyListProps) {
  console.log("SU", surveys);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          survey={survey}
          onClick={() => onSurveyClick(survey.surveyId)}
        />
      ))}
    </div>
  );
}
