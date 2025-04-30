"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Survey, SurveyResult } from "../../interface";
import FormResult from "./FormResult";
import Loading from "../../components/loading";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // State of the page
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getSurveysAndResults() {
    try {
      const BASE_URL = `http://localhost:3000/api/users/${id}`;
      console.log(BASE_URL);
      // Call 2 requests simultaneously
      const responses: Response[] = await Promise.all([
        fetch(`${BASE_URL}/surveys`),
        fetch(`${BASE_URL}/survey_results`),
      ]);
      // Set the data
      const surveyData: any = await responses[0].json();
      const surveyResultData: any = await responses[1].json();
      setSurveys(surveyData);
      setSurveyResults(surveyResultData);

      // Set the the page loading status
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getSurveysAndResults();
  }, []);

  // Get the survey result associated with the provided survey
  function getQueriedResult(survey: Survey) {
    const queriedResult = surveyResults.find(
      (result) => result.surveyId === survey.id
    );
    if (queriedResult === undefined) {
      throw new Error("There is no survey result associated with surveys");
    }
    return queriedResult;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-10 text-text">
      <h1 className="mt-20 text-2xl font-bold text-center">Survey Results</h1>
      <div className="flex gap-2 w-[80%] mx-auto mt-4">
        <button
          className="bg-accent text-white text-lg rounded-lg px-1"
          onClick={() => router.push("/dashboard")}
        >
          Back
        </button>
        <h3 className="font-semibold text-xl">
          This user has taken {surveyResults.length} surveys
        </h3>
      </div>
      <div className="flex flex-col gap-6 mt-2">
        {surveys.map((survey) => (
          <FormResult
            key={survey.id}
            survey={survey}
            result={getQueriedResult(survey)}
          />
        ))}
      </div>
    </div>
  );
}
