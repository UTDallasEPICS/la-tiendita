export type QuestionType = "SCALAR" | "MULTIPLE_CHOICE" | "FREE_RESPONSE";

export interface BaseQuestion {
  // id: number;
  // surveyID: number;
  category: string;
  questionString: string;
  type: QuestionType;
}

export interface ScalarQuestion extends BaseQuestion {
  minValue: number;
  maxValue: number;
}

export interface MCQOption {
  option: string;
  category: string;
  weight?: number;
}

export interface MCQQuestion extends BaseQuestion {
  optionsMap: {
    [key: string]: MCQOption;
  };
}

export interface FRQQuestion extends BaseQuestion {
  // we dont have any additional properties for free response questions
}

export type Question = ScalarQuestion | MCQQuestion | FRQQuestion;

export interface Survey {
  title: string;
  description: string;
  categories: string[];
  questions: Question[];
}

export interface Answer {
  question: Question;
  answer: string | number;
}

export interface SurveyResult {
  answersData: Answer[];
  userId: number;
  surveyId: number;
  status: "OnGoing" | "Complete";
}
