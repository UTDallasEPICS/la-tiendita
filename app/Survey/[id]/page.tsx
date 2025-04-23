"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Module from "../Module";
import Survey from "../Interface/Survey";
import Question from "../Interface/Question";
import QuestionType from "../Interface/Enum/QuestionType";

export default function SurveyPage() {
  const params = useParams();
  const { id } = params;
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurvey() {
      try {
        const res = await fetch("/api/surveys");

        if (!res.ok) {
          throw new Error("No survey data!");
        }

        const apiSurveys = await res.json();

        const rawSurvey = apiSurveys.find((s: any) => s.id.toString() === id);
        if (!rawSurvey) {
          throw new Error("No raw survey data!");
        }

        const typedSurvey: Survey = {
          id: rawSurvey.id,
          title: rawSurvey.title,
          description: rawSurvey.description,
          categories: rawSurvey.categories,
          questions: rawSurvey.questions.map((q: any) => {
            const question: Question = {
              id: q.id,
              type: q.type as QuestionType,
              questionString: q.questionString,
              category: q.category,
              minValue: q.minValue ?? undefined,
              maxValue: q.maxValue ?? undefined,
              surveyId: q.surveyId,
              optionsMap: q.optionsMap ?? undefined,
            };
            return question;
          }),
        };

        setSurvey(typedSurvey);
      } catch (err: any) {
        setError(err.message || "Unknown error!");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchSurvey();
    }
  }, [id]);

  if (loading) {
    return <div className="mt-20 p-5 max-w-5xl mx-auto text-center">Loading survey...</div>;
  }

  if (error) {
    return <div className="mt-20 p-5 max-w-5xl mx-auto text-center text-red-500">{error}</div>;
  }

  if (!survey) {
    return <div className="mt-20 p-5 max-w-5xl mx-auto text-center">Survey not available.</div>;
  }
  
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-col justify-center">
        {survey.questions.map((question: Question) => (
          <Module key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
}