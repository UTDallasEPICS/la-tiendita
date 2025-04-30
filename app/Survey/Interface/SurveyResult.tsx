import { DateTime } from "next-auth/providers/kakao";
import Survey from "./Survey";

interface SurveyResult {
    id: number;
    answersData: Json; // Stores answers as JSON (question -> answer mapping)
    userId: number;
    surveyId: number;
    lastModified: DateTime;
    status: string // 'OnGoing' or 'Complete'
    user: User;
    survey: Survey;
}

export default SurveyResult;