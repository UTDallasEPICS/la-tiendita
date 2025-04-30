import { DateTime } from "next-auth/providers/kakao";
import Question from "./Question";

interface Survey {
    id: number;
    title: string;
    lastModified: DateTime;
    questions: Question[];
    surveyResults: SurveyResult[];
}

export default Survey;