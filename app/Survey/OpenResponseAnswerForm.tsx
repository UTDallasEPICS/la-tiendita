import Question from "./Interface/Question";

interface OpenResponseAnswerFormProps {
    question: Question;
}

export default function OpenResponseAnswerForm(props: OpenResponseAnswerFormProps) {
    const inputId = `q${props.question.id}-open`;

    return (
        <form>
            <textarea
                id={inputId}
                name={`q${props.question.id}`}
                placeholder="Type answer here..."
                rows={4}
                cols={50}
            ></textarea>
            <br />
        </form>
    );
}