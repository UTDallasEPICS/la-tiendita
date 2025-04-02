import Scale_Choice_Answer_Form from "./Scale_Choice_Answer_Form";

interface ModuleProps {
    question: string;
    type: string;
}

export default function Module(props: ModuleProps) {
    return (
      <div className="flex items-center w-full space-x-6 p-6 block border-2 border-blue-500 rounded-lg mb-6 max-h-[250px] overflow-hidden">
        <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-semibold text-customGray">{props.question}</h1>
            <Scale_Choice_Answer_Form numChoices={5} lowLabel="Strongly Disagree" highLabel="Strongly Agree"></Scale_Choice_Answer_Form>
        </div>
      </div>
    );
  }