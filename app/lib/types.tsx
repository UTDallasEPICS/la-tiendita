export type QuestionType = "SCALAR" | "MULTIPLE_CHOICE" | "FREE_RESPONSE";

export interface BaseQuestion {
  id?: number;
  surveyId?: number;
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
  id?: number;
  title: string;
  description: string;
  categories: string[];
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
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

export interface AnswerData {
  question: Question;
  answer: string | number;
}

export interface SurveyResults {
  id: number;
  answersData: Answer[];
  userId: number;
  surveyId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  survey: Survey;
}
