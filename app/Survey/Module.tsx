import ScaleChoiceAnswerForm from "./ScaleChoiceAnswerForm";
import MultipleChoiceAnswerForm from "./MultipleChoiceAnswerForm";
import OpenResponseAnswerForm from "./OpenResponseAnswerForm";

interface Question {
  id: number;
  type: string;
  questionString: string;
  choices: Choice[];
  category: string;
  weight: number;
  surveyId: number;
}

interface Choice {
  id: number;
  choiceString: string;
  questionId: number;
  question: Question;
}

interface ModuleProps {
    // General question properties
    type: string;
    question: string;

    // For multiple choice
    answerChoices?: string[];

    // For scalar choice
    minLabel?: string;
    maxLabel?: string;
    numChoices?: number;
}

export default function Module(props: ModuleProps) {
    let answerForm;

    if(props.type == "scale") {
      answerForm = <ScaleChoiceAnswerForm minLabel={props.minLabel} maxLabel={props.maxLabel} numChoices={props.numChoices} />
    }
    if(props.type == "mcq") {
      answerForm = <MultipleChoiceAnswerForm answerChoices={props.answerChoices} />
    }
    if(props.type == "open") {
      answerForm = <OpenResponseAnswerForm />
    }
  
    return (
      <div className="flex justify-center items-center w-full space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 max-h-[250px] overflow-hidden">
        <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-xl font-semibold text-customGray">{props.question}</h1>
            {answerForm}
        </div>
      </div>
    );
  }