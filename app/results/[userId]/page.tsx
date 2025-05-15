"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import SurveyList from "../components/survey-list";
import LoadingSpinner from "../../components/loading-spinner";
import NotFound from "../../components/not-found";
import { Survey, SurveyResults } from "@/app/lib/types";
import { useUser } from "@/app/context/UserContext";

export default function UserSurveysPage() {
  const [surveys, setSurveys] = useState<SurveyResults[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<any | null>(null);
  const [message, setMessage] = useState<any | null>(null);
  const params = useParams();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/users/${user?.id}/survey_results`
        );
        setSurveys(response.data);
        setError(null);
        setErrorCode(null);
        setMessage(null);
      } catch (error: any) {
        console.error("Error fetching surveys:", error);
        setError("Failed to load surveys. Please try again later.");
        setErrorCode(error.status);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchSurveys();
    }
  }, [user?.id]);

  const handleSurveyClick = (surveyId: number) => {
    router.push(`${user?.id}/userSurveyResults/${surveyId}`);
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        return <NotFound errorCode={errorCode} errorMessage={message} />;
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-6">Your Survey Results</h1>
      {surveys.length === 0 ? (
        <p className="text-gray-500">You haven't taken any surveys yet.</p>
      ) : (
        <SurveyList surveys={surveys} onSurveyClick={handleSurveyClick} />
      )}
    </div>
  );
}
