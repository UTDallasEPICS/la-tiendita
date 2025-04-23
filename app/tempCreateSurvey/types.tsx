export type QuestionType = "MCQ" | "Scalar" | "FRQ";

export interface BaseQuestion {
  id: number;
  surveyID: number;
  category: string;
  questionString: string;
  type: QuestionType;
}

export interface ScalarQuestion extends BaseQuestion {
  type: "Scalar";
  min_value: number;
  max_value: number;
}

export interface MCQOption {
  option: string;
  category: string;
  weight?: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: "MCQ";
  optionsMap: {
    [key: string]: MCQOption;
  };
}

export interface FRQQuestion extends BaseQuestion {
  type: "FRQ";
}

export type Question = ScalarQuestion | MCQQuestion | FRQQuestion;

export interface Survey {
  title: string;
  description: string;
  categories: string[];
  questions: Question[];
}
