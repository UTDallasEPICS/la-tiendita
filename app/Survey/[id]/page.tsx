"use client";

import { useParams } from "next/navigation";
import Module from "../Module";
import { DateTime } from "next-auth/providers/kakao";
import { JsonObject } from "@prisma/client/runtime/library";

interface Survey {
  id: number;
  title: string;
  lastModified: DateTime;
  questions: Question[];
  surveyResults: SurveyResult[];
}

interface Question {
  id: number;
  type: string;
  questionString: string;
  choices: Choice[];
  category: string;
  weight: number;
  surveyId: number;
  survey: Survey;
}

interface Choice {
  id: number;
  choiceString: string;
  questionId: number;
  question: Question;
}

interface SurveyResult {
  id: number;
  answersData: JsonObject;
  userId: number;
  surveyId: number;
  lastModified: DateTime;
  status: string;
  user: User;
  survey: Survey; 
}

interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  dateCreated: DateTime;
  surveyResults: SurveyResult[];
}

export default function Survey() {
  const params = useParams();
  const { id } = params;
  
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-col justify-center">
        <Module type="scale"
          question="Do androids dream of electric sheep?"
          minLabel="Strongly Disagree"
          maxLabel="Strongly Agree"
          numChoices={5}
        />

        <Module type="mcq"
          question="Do androids dream of electric sheep?"
          answerChoices={[
            "Yes",
            "Probably",
            "Unsure",
            "Probably not",
            "No"
          ]}
        />

        <Module type="open"
          question="Do androids dream of electric sheep?"
        />

        <Module type="scale"
          question="Do androids dream of electric sheep?"
        />

        <Module type="mcq"
          question="Do androids dream of electric sheep?"
        />
      </div>
    </section>
  );
}