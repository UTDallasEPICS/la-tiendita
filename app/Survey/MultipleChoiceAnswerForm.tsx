import Question from "./Interface/Question";

interface MultipleChoiceAnswerFormProps {
    question: Question;
}

export default function MultipleChoiceAnswerForm(props: MultipleChoiceAnswerFormProps) {
    const optionsMap = props.question.optionsMap ? JSON.parse(JSON.stringify(props.question.optionsMap)) : {};
    const keys = Object.keys(optionsMap);

    return (
        <form>
            {keys.map((key) => {
                const inputId = `q${props.question.id}-choice-${key}`;
                return (
                    <div key={inputId} className="space-x-2">
                        <input type="radio" id={inputId} name={`q${props.question.id}`} value={key} />
                        <label htmlFor={inputId}>{optionsMap[key]}</label><br />
                    </div>
                );
            })}
        </form>
    );
}