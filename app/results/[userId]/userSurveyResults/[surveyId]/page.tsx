"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SurveyResultsDisplay from "./survey-results-cards/survey-result-display";
import { SurveyResults } from "../../../../lib/types";
import axios from "axios";
import NotFound from "../../../../components/not-found";
import Loading from "../../../../components/loading";
import Intro from "@/app/results/components/pie";

export default function UserSurveyResults() {
  const [surveyResults, setSurveyResults] = useState<SurveyResults | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<any | null>(null);
  const [message, setMessage] = useState<any | null>(null);
  const { surveyId } = useParams();
  const userId = 1; // use get user id function.

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}/survey_results/${surveyId}`
      );

      setSurveyResults(response.data as SurveyResults);
      setError(null);
      setErrorCode(null);
      setMessage(null);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorCode(error.status);
      setError(error.message);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || !surveyResults) {
    return <NotFound errorCode={errorCode} errorMessage={message} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Survey Results</h1>
        <Intro surveyResult={surveyResults} />
        <SurveyResultsDisplay surveyResults={surveyResults} />
      </div>
    </main>
  );
}
