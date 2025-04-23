export type QuestionType = "SCALAR" | "MULTIPLE_CHOICE" | "FREE_RESPONSE";

export interface OptionItem {
  option: string;
  category: string;
  weight?: number;
}

export interface Question {
  id: number;
  surveyId: number;
  type: QuestionType;
  questionString: string;
  category: string;
  minValue?: number;
  maxValue?: number;
  optionsMap?: Record<string, OptionItem>;
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  questions: Question[];
}

export interface SurveyResponse {
  questionId: number;
  value: any;
}
