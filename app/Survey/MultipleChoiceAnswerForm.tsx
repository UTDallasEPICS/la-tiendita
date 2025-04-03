interface MultipleChoiceAnswerFormProps {
    answerChoices?: string[];
}

export default function MultipleChoiceAnswerForm(props: MultipleChoiceAnswerFormProps) {
    let answerChoiceInputs = props.answerChoices?.map(answerChoice =>
        <div key={answerChoice} className="space-x-2">
            <input type="radio" id={answerChoice.toLowerCase().replaceAll(" ", "-")} name="multiple-choice" value={answerChoice} />
            <label htmlFor={answerChoice.toLowerCase().replaceAll(" ", "-")}>{answerChoice}</label><br />
        </div>
      );
    
    return (
        <form className="">
            {answerChoiceInputs}
        </form>
    );
}