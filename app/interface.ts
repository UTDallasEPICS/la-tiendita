import { Role, QuestionType, SurveyStatus } from "@prisma/client";

export interface User {
  id: number;
  role: Role;
  name: string;
  email: string;
  phoneNumber: string | undefined; 
  createdAt: Date;
}

export interface Survey {
  id: number;
  title: string;
  description: string; 
  createdAt: Date; 
  updatedAt: Date; 
  categories: string[]; 
  questions: Question[];
  surveyResults: SurveyResult[];
}

export interface Question {
  id: number;
  type: QuestionType; 
  questionString: string;
  category: string;
  minValue: number; 
  maxValue: number; 
  surveyId: number;
  optionsMap: Record<string, string>; // Used for MCQ
}

export interface SurveyResult {
  id: number;
  answersData: Record<string, any> | undefined; // Replace `any` with a more specific type if you know the structure
  userId: number;
  surveyId: number;
  createdAt: Date; 
  updatedAt: Date; 
  status: SurveyStatus;
}