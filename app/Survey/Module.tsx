import ScaleChoiceAnswerForm from "./ScaleChoiceAnswerForm";
import MultipleChoiceAnswerForm from "./MultipleChoiceAnswerForm";
import OpenResponseAnswerForm from "./OpenResponseAnswerForm";
import Question from "./Interface/Question";
import QuestionType from "./Interface/Enum/QuestionType";

interface ModuleProps {
    question: Question;
}

export default function Module(props: ModuleProps) {
    let question = props.question;
    let type = question.type;
    let answerForm;

    if(type == QuestionType.SCALAR) {
      answerForm = <ScaleChoiceAnswerForm question={question} />
    }
    if(type == QuestionType.MULTIPLE_CHOICE) {
      answerForm = <MultipleChoiceAnswerForm question={question} />
    }
    if(type == QuestionType.FREE_RESPONSE) {
      answerForm = <OpenResponseAnswerForm question={question} />
    }
  
    return (
      <div className="flex justify-center items-center w-full space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 max-h-[250px] overflow-hidden">
        <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-xl font-semibold text-customGray">{question.questionString}</h1>
            {answerForm}
        </div>
      </div>
    );
  }