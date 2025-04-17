import Choice from "./Choice";
import Survey from "./Survey";

interface Question {
    id: number;
    type: string; // 'MCQ' 'Scale' 'Open'
    questionString: string;
    choices: Choice[];
    category: string;
    weight: number;
    surveyId: number;
    survey: Survey;
}

export default Question;