import Scale_Choice_Answer from "./Scale_Choice_Answer";

interface FormProps {
    numChoices: number;
    lowLabel: string;
    highLabel: string;
}

export default function Scale_Choice_Answer_Form(props: FormProps) {
    return (
        <form className="flex flex-row justify-between w-full space-x-20 items-center">
            <Scale_Choice_Answer label="Strongly Disagree" />
            <Scale_Choice_Answer label="Disagree" />
            <Scale_Choice_Answer label="Neutral" />
            <Scale_Choice_Answer label="Agree" />
            <Scale_Choice_Answer label="Strongly Agree" />
        </form>
    );
}