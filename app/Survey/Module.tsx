import ScaleChoiceAnswerForm from "./ScaleChoiceAnswerForm";
import MultipleChoiceAnswerForm from "./MultipleChoiceAnswerForm";
import OpenResponseAnswerForm from "./OpenResponseAnswerForm";

interface ModuleProps {
    type: string;
    question: string;
    answerChoices?: string[];
}

export default function Module(props: ModuleProps) {
    let answerForm;

    if(props.type == "scale") {
      answerForm = <ScaleChoiceAnswerForm />
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