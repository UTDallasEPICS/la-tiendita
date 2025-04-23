import Question from "./Question";

interface Survey {
    id: number;
    title: string;
    description: string;
    categories: JSON;
    questions: Question[];
}

export default Survey;