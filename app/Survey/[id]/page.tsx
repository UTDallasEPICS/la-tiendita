"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Question from '../Interface/Question';
import Module from "../Module";
// import { DateTime } from "next-auth/providers/kakao";
import { JsonObject } from "@prisma/client/runtime/library";

// currently commenting out to check things

// interface Survey {
//   id: number;
//   title: string;
//   lastModified: DateTime;
//   questions: Question[];
//   surveyResults: SurveyResult[];
// }

// interface Question {
//   id: number;
//   type: string;
//   questionString: string;
//   choices: Choice[];
//   category: string;
//   weight: number;
//   surveyId: number;
//   survey: Survey;
// }

// interface Choice {
//   id: number;
//   choiceString: string;
//   questionId: number;
//   question: Question;
// }

// interface SurveyResult {
//   id: number;
//   answersData: JsonObject;
//   userId: number;
//   surveyId: number;
//   lastModified: DateTime;
//   status: string;
//   user: User;
//   survey: Survey; 
// }

// interface User {
//   id: number;
//   role: string;
//   name: string;
//   email: string;
//   dateCreated: DateTime;
//   surveyResults: SurveyResult[];
// }

export default function Survey() {
  const params = useParams();
  const { id } = params;
  // dynamic questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => 
  {
    const fetchQuestions = async () => {
      try {
        // fetch
        const res = await fetch(`/api/surveys/${id}/survey`);

        //throw
        if (!res.ok) throw new Error("Failed to fetch questions");

        // setting data
        const data = await res.json();
        setQuestions(data);
        
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  // const question: Question = {
  //   id: 1,
  //   type: "scale",
  //   questionString: "Do androids dream of electric sheep?",
  //   choices: [], // you can populate this if needed
  //   category: "philosophy",
  //   weight: 1,
  //   surveyId: 42
  // };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-col justify-center">
        {questions.map((q) => 
        (
          <Module key={q.id} question={q} />
        ))}
      </div>
    </section>
  );
}