"use client";

import React, { useState } from "react";
import SurveyForm from "./survey-form";
import CategoryManager from "./category-manager";
import QuestionCreator from "./question-creator";
import QuestionsList from "./questions-list";
import { Question, Survey } from "./types";

export default function CreateSurveyPage() {
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    description: "",
    categories: [],
    questions: [],
  });

  const handleSurveyChange = (updatedSurvey: Partial<Survey>) => {
    setSurvey((prev) => ({ ...prev, ...updatedSurvey }));
    console.log(survey);
  };

  const handleAddQuestion = (question: Question) => {
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
    console.log(survey);
  };

  const handleDeleteQuestion = (questionId: number) => {
    console.log(survey);
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSurveySubmit = () => {};

  return (
    <div className="container mx-auto px-4 py-8 pt-12">
      <h1 className="text-3xl font-bold mb-6">Create New Survey</h1>

      <div className="space-y-8">
        <SurveyForm survey={survey} onSurveyChange={handleSurveyChange} />

        <CategoryManager
          categories={survey.categories}
          onCategoriesChange={(categories) =>
            handleSurveyChange({ categories })
          }
        />

        <QuestionCreator
          categories={survey.categories}
          onAddQuestion={handleAddQuestion}
          questionCount={survey.questions.length}
        />

        <QuestionsList
          questions={survey.questions}
          onDeleteQuestion={handleDeleteQuestion}
        />
      </div>
    </div>
  );
}
