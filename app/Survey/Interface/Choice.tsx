import Question from "./Question";

interface Choice {
    id: number;
    choiceString: string;
    questionId: number;
    question: Question;
}

export default Choice;