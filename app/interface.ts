export interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  dateCreated: Date;
}

export interface Survey {
  id: number;
  title: string;
  lastModified: Date;
  questions: Question[];
  surveyResults: SurveyResult[];
}

export interface Question {
  id: number;
  type: string; // Could also use a union type like 'MCQ' | 'Scale' | 'Open'
  questionString: string;
  choices: Choice[];
  category: string;
  weight: number;
  surveyId: number;
}

export interface Choice {
  id: number;
  choiceString: string;
  questionId: number;
}

export interface SurveyResult {
  id: number;
  answersData: Record<string, any>; // Replace `any` with a more specific type if you know the structure
  userId: number;
  surveyId: number;
  lastModified: Date;
  status: string; // Could also be 'OnGoing' | 'Complete'
}