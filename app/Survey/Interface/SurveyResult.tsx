import SurveyStatus from "./Enum/SurveyStatus";

interface SurveyResult {
    id: number;
    answersData: JSON;
    userId: number;
    surveyId: number;
    status: SurveyStatus;
}

export default SurveyResult;