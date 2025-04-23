import { Survey } from "./types";

export const mockSurvey: Survey = {
  id: 1,
  title: "Personality Assessment",
  description:
    "This survey will help you understand your personality traits and preferences.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: [
    "Openness",
    "Conscientiousness",
    "Extraversion",
    "Agreeableness",
    "Neuroticism",
  ],
  questions: [
    {
      id: 1,
      surveyId: 1,
      type: "SCALAR",
      questionString: "How comfortable are you in social situations?",
      category: "Extraversion",
      minValue: 1,
      maxValue: 5,
    },
    {
      id: 2,
      surveyId: 1,
      type: "MULTIPLE_CHOICE",
      questionString:
        "Which of these activities would you prefer on a weekend?",
      category: "Extraversion",
      optionsMap: {
        A: {
          option: "Going to a party with lots of people",
          category: "Extraversion",
          weight: 3,
        },
        B: {
          option: "Meeting a small group of close friends",
          category: "Ambiversion",
          weight: 2,
        },
        C: {
          option: "Staying home with a good book or movie",
          category: "Introversion",
          weight: 1,
        },
        D: {
          option: "Outdoor activity alone like hiking",
          category: "Introversion",
          weight: 1,
        },
      },
    },
    {
      id: 3,
      surveyId: 1,
      type: "FREE_RESPONSE",
      questionString:
        "Describe a situation where you felt most energized and why.",
      category: "Extraversion",
    },
    {
      id: 4,
      surveyId: 1,
      type: "SCALAR",
      questionString:
        "How important is it for you to have a structured routine?",
      category: "Conscientiousness",
      minValue: 1,
      maxValue: 7,
    },
    {
      id: 5,
      surveyId: 1,
      type: "MULTIPLE_CHOICE",
      questionString:
        "When working on a project, which approach do you typically take?",
      category: "Conscientiousness",
      optionsMap: {
        A: {
          option: "Plan everything in detail before starting",
          category: "High Conscientiousness",
          weight: 3,
        },
        B: {
          option: "Have a general plan but adapt as needed",
          category: "Moderate Conscientiousness",
          weight: 2,
        },
        C: {
          option: "Jump in and figure it out as I go",
          category: "Low Conscientiousness",
          weight: 1,
        },
        D: {
          option: "Procrastinate until the deadline approaches",
          category: "Low Conscientiousness",
          weight: 1,
        },
      },
    },
    {
      id: 6,
      surveyId: 1,
      type: "FREE_RESPONSE",
      questionString:
        "What strategies do you use to stay organized in your daily life?",
      category: "Conscientiousness",
    },
    {
      id: 7,
      surveyId: 1,
      type: "SCALAR",
      questionString: "How easily do you adapt to new ideas and experiences?",
      category: "Openness",
      minValue: 1,
      maxValue: 7,
    },
    {
      id: 8,
      surveyId: 1,
      type: "MULTIPLE_CHOICE",
      questionString:
        "Which statement best describes your approach to trying new things?",
      category: "Openness",
      optionsMap: {
        A: {
          option: "I actively seek out new experiences and ideas",
          category: "High Openness",
          weight: 3,
        },
        B: {
          option: "I enjoy new experiences but also value familiarity",
          category: "Moderate Openness",
          weight: 2,
        },
        C: {
          option: "I prefer to stick with what I know works",
          category: "Low Openness",
          weight: 1,
        },
        D: {
          option: "I find change uncomfortable and avoid it when possible",
          category: "Low Openness",
          weight: 1,
        },
      },
    },
    {
      id: 9,
      surveyId: 1,
      type: "FREE_RESPONSE",
      questionString:
        "Describe a time when you challenged your own beliefs or perspectives.",
      category: "Openness",
    },
    {
      id: 10,
      surveyId: 1,
      type: "SCALAR",
      questionString:
        "How important is it for you to maintain harmony in relationships?",
      category: "Agreeableness",
      minValue: 1,
      maxValue: 7,
    },
  ],
};
