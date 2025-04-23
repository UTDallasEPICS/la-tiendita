import { useEffect, useState } from "react";

import ScaleChoiceAnswerForm from "./ScaleChoiceAnswerForm";
import MultipleChoiceAnswerForm from "./MultipleChoiceAnswerForm";
import OpenResponseAnswerForm from "./OpenResponseAnswerForm";
import Question from './Interface/Question';

// interface Question {
//   id: number;
//   type: string;
//   questionString: string;
//   choices: Choice[];
//   category: string;
//   weight: number;
//   surveyId: number;
// }

interface Choice {
  id: number;
  choiceString: string;
  questionId: number;
  question: Question;
}

interface ModuleProps {
    question: Question;
}

export default function Module(props: ModuleProps) 
{
  let answerForm;

  if(props.question.type == "scale") {
    answerForm = <ScaleChoiceAnswerForm minLabel={""} maxLabel={""} numChoices={props.question.choices.length} />
  }
  if(props.question.type == "mcq") {
    answerForm = <MultipleChoiceAnswerForm answerChoices={props.question.choices} />
  }
  if(props.question.type == "open") {
    answerForm = <OpenResponseAnswerForm />
  }

  return (
    <div className="flex justify-center items-center w-full space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 max-h-[250px] overflow-hidden">
      <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-xl font-semibold text-black">{props.question.questionString}</h1>
          {answerForm}
      </div>
    </div>
  );
}