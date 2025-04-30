"use client";
import React, { useState } from "react";
import { Survey, Question, Answer } from "../../lib/types";
import ScalarQuestion from "./question-types/scalar-question";
import MultipleChoiceQuestion from "./question-types/multuple-choice-question";
import FreeResponseQuestion from "./question-types/free-response-question";
import ProgressBar from "./progressbar";
import { useParams } from "next/navigation";
import {
  ScalarQuestion as ScalarQuestionType,
  MCQQuestion as MultupleChoiceQuestionType,
} from "../../lib/types";
import axios from "axios";
interface SurveyTakerProps {
  survey: Survey;
  questionsPerPage: number;
}

const SurveyTaker: React.FC<SurveyTakerProps> = ({
  survey,
  questionsPerPage,
}) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalPages = Math.ceil(survey.questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(
    startIndex + questionsPerPage,
    survey.questions.length
  );
  const currentQuestions = survey.questions.slice(startIndex, endIndex);

  const handleAnswer = (question: Question, answer: string | number) => {
    setAnswers((prev) => {
      // checking if this question has already been answered
      const existingIndex = prev.findIndex(
        (a) =>
          a.question.questionString === question.questionString &&
          a.question.type === question.type
      );

      if (existingIndex >= 0) {
        // updating... existing answer
        const newAnswers = [...prev];
        newAnswers[existingIndex] = { question, answer };
        return newAnswers;
      } else {
        // adding new answer
        return [...prev, { question, answer }];
      }
    });
  };

  const getAnswerForQuestion = (
    question: Question
  ): string | number | undefined => {
    const answer = answers.find(
      (a) =>
        a.question.questionString === question.questionString &&
        a.question.type === question.type
    );
    return answer?.answer;
  };

  const isCurrentPageComplete = () => {
    return currentQuestions.every((question) => {
      const answer = getAnswerForQuestion(question);
      return answer !== undefined;
    });
  };

  const isAllQuestionsAnswered = () => {
    return survey.questions.every((question) => {
      const answer = getAnswerForQuestion(question);
      return answer !== undefined;
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!isAllQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitting(true);

    try {
      const surveyResult = {
        answersData: answers,
        userId: 1, // I need to replace this with the get current user id function.
        status: "Complete" as const,
      };

      console.log("Submitting survey result:", surveyResult);
      const response = await axios.post(
        `http://localhost:3000/api/surveys/${id}/survey_results`,
        surveyResult,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Saved survey result:", response);

      setIsComplete(true);
    } catch (error: any) {
      console.error("Error submitting survey:", error);
      const message =
        error.response?.data?.error || error.message || "Unknown error";
      alert(`Submission failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
        <p className="text-lg mb-6">
          Your survey has been successfully submitted.
        </p>
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-gray-600">We appreciate your participation!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">{survey.title}</h1>
        <p className="text-gray-600 mt-2">{survey.description}</p>
      </div>

      <ProgressBar
        currentPage={currentPage + 1}
        totalPages={totalPages}
        answeredQuestions={answers.length}
        totalQuestions={survey.questions.length}
      />

      <div className="p-6">
        {currentQuestions.map((question, index) => (
          <div
            key={`${question.type}-${question.questionString}`}
            className="mb-8 pb-8 border-b border-gray-200 last:border-0"
          >
            <div className="mb-4">
              <span className="inline-block bg-primary text-white text-sm py-1 px-3 rounded-full mb-2">
                Question {startIndex + index + 1} of {survey.questions.length}
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                {question.questionString}
              </h3>
              <span className="text-sm text-gray-500">
                Category: {question.category}
              </span>
            </div>

            {question.type === "SCALAR" && (
              <ScalarQuestion
                question={question as ScalarQuestionType}
                value={getAnswerForQuestion(question) as number | undefined}
                onChange={(value) => handleAnswer(question, value)}
              />
            )}

            {question.type === "MULTIPLE_CHOICE" && (
              <MultipleChoiceQuestion
                question={question as MultupleChoiceQuestionType}
                value={getAnswerForQuestion(question) as string | undefined}
                onChange={(value) => handleAnswer(question, value)}
              />
            )}

            {question.type === "FREE_RESPONSE" && (
              <FreeResponseQuestion
                question={question}
                value={getAnswerForQuestion(question) as string | undefined}
                onChange={(value) => handleAnswer(question, value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-md ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Page {currentPage + 1} of {totalPages}
        </div>

        {currentPage < totalPages - 1 ? (
          <button
            onClick={handleNextPage}
            disabled={!isCurrentPageComplete()}
            className={`px-4 py-2 rounded-md ${
              !isCurrentPageComplete()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isCurrentPageComplete()}
            className={`px-4 py-2 rounded-md ${
              isSubmitting || !isCurrentPageComplete()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Survey"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyTaker;
