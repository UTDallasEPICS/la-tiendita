import QuestionType from "./Enum/QuestionType";

interface Question {
    id: number;
    type: QuestionType;
    questionString: string;
    category: string;
    minValue?: number;
    maxValue?: number;
    surveyId: number;
    optionsMap?: JSON;
  }

export default Question;