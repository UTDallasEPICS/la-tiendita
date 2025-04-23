"use client";

import type React from "react";

import { useState } from "react";
import CategoryManager from "./category-manager";
import QuestionCreator from "./question-creator";
import QuestionList from "./question-list";
import axios from "axios";
import { Question, Survey } from "./types";

export default function SurveyCreator() {
  const submitSurvey = async () => {
    try {
      const response = await axios.post("/api/surveys", {
        title: survey.title,
        description: survey.description,
        categories: survey.categories,
        questions: survey.questions,
      });
      setSurvey({
        title: "",
        description: "",
        categories: [],
        questions: [],
      });
      setEditingQuestion(null);

      console.log("Survey created:", response.data);
    } catch (error) {
      console.error("Error creating survey:", error, error);
    }
  };

  const [survey, setSurvey] = useState<Survey>({
    title: "",
    description: "",
    categories: [],
    questions: [],
  });

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleSurveyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSurvey((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCategory = (category: string) => {
    if (category.trim() && !survey.categories.includes(category)) {
      setSurvey((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const removeCategory = (category: string) => {
    setSurvey((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const addQuestion = (question: Question) => {
    setSurvey((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          ...question,
        },
      ],
    }));
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        // Instead of `id`, we use `questionString` and `category` for uniqueness
        q.questionString === updatedQuestion.questionString &&
        q.category === updatedQuestion.category
          ? updatedQuestion
          : q
      ),
    }));
    setEditingQuestion(null);
  };

  const deleteQuestion = (question: Question) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter(
        (q) =>
          q.questionString !== question.questionString ||
          q.category !== question.category
      ),
    }));
  };

  const startEditQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Survey Details</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={survey.title}
              onChange={handleSurveyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter survey title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={survey.description}
              onChange={handleSurveyChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter survey description"
            />
          </div>
        </div>
      </div>

      <CategoryManager
        categories={survey.categories}
        onAddCategory={addCategory}
        onRemoveCategory={removeCategory}
      />

      <QuestionCreator
        categories={survey.categories}
        onAddQuestion={addQuestion}
        editingQuestion={editingQuestion}
        onUpdateQuestion={updateQuestion}
        onCancelEdit={() => setEditingQuestion(null)}
      />

      <QuestionList
        questions={survey.questions}
        onEditQuestion={startEditQuestion}
        onDeleteQuestion={deleteQuestion}
      />

      <button
        onClick={submitSurvey}
        className="w-full p-2 bg-primary text-primary-foreground rounded-md"
      >
        Create Survey
      </button>
    </div>
  );
}
