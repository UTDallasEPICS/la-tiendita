import React from "react";
import {
  SurveyResults,
  ScalarQuestion as ScalarQuestionType,
  MCQQuestion as MultupleChoiceQuestionType,
} from "../../../lib/types";
import ScalarResult from "./scalar-results";
import MultipleChoiceResult from "./multiple-choice-results";
import FreeResponseResult from "./free-response-result";

interface SurveyResultsDisplayProps {
  surveyResults: SurveyResults;
}

const SurveyResultsDisplay: React.FC<SurveyResultsDisplayProps> = ({
  surveyResults,
}) => {
  const { survey, answersData } = surveyResults;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
        <p className="text-gray-600 mt-2">{survey.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {survey.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {answersData.map((data, index) => {
          const { question, answer } = data;

          return (
            <div
              key={question.id}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Question {index + 1}: {question.questionString}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Category: {question.category}
                  </p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {question.type.replace(/_/g, " ")}
                </span>
              </div>

              {question.type === "SCALAR" && (
                <ScalarResult
                  question={question as ScalarQuestionType}
                  answer={answer as number}
                />
              )}
              {question.type === "MULTIPLE_CHOICE" && (
                <MultipleChoiceResult
                  question={question as MultupleChoiceQuestionType}
                  answer={answer as string}
                />
              )}
              {question.type === "FREE_RESPONSE" && (
                <FreeResponseResult
                  question={question}
                  answer={answer as string}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurveyResultsDisplay;
