import Question from "./Interface/Question";

interface ScaleChoiceAnswerFormProps {
    question: Question;
}

export default function ScaleChoiceAnswerForm(props: ScaleChoiceAnswerFormProps) {
    const min = props.question.minValue ?? 1;
    const max = props.question.maxValue ?? 5;
    const inputName = `q${props.question.id}`;
    
    let answerChoiceInputs = [];
    for (let i = min; i <= max; i++) {
        const inputId = `q${props.question.id}-scale-${i}`;
        answerChoiceInputs.push(
            <div key={inputId}>
                <input type="radio" id={inputId} name={inputName} value={i} />
            </div>
        );
    }
    
    return (
        <form className="flex flex-row w-full space-x-5">
            <label htmlFor={answerChoiceInputs[0].props.id}>{min}</label>
            {answerChoiceInputs}
            <label htmlFor={answerChoiceInputs[max - min].props.id}>{max}</label>
        </form>
    );
}