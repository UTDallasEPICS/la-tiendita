"use client";
import React, { useState, useEffect } from "react";
import QuestionCard from "./question-card";
import PaginationControls from "./pagination-controls";
import ProgressBar from "./progress-bar";
import { mockSurvey } from "./mock-data";
import { Question, Survey, SurveyResponse } from "./types";
import axios from "axios";
export default function SurveyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [survey, setSurvey] = useState<Survey>(mockSurvey);

  const questionsPerPage = 5;
  const totalPages = Math.ceil(survey.questions.length / questionsPerPage);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = survey.questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/surveys/3");
      console.log(response.data);
      setSurvey(response.data);
    } catch (error) {
      console.log("Failed To Fetch Survey", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResponse = (questionId: number, value: any) => {
    setResponses((prev) => {
      const existingResponseIndex = prev.findIndex(
        (r) => r.questionId === questionId
      );

      if (existingResponseIndex >= 0) {
        const newResponses = [...prev];
        newResponses[existingResponseIndex] = { questionId, value };
        return newResponses;
      } else {
        return [...prev, { questionId, value }];
      }
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    console.log("Survey responses:", responses);
    // Here you would typically send the responses to your backend
    alert("Survey submitted successfully!");
  };

  const progress = (responses.length / survey.questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {survey.title}
        </h1>
        <p className="text-gray-600 mb-6">{survey.description}</p>

        <ProgressBar progress={progress} />

        <div className="mt-8 space-y-8">
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onResponse={(value) => handleResponse(question.id, value)}
              currentResponse={
                responses.find((r) => r.questionId === question.id)?.value
              }
            />
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          onSubmit={currentPage === totalPages ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
}
