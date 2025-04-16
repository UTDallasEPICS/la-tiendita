import { DateTime } from "next-auth/providers/kakao";

interface User {
    id: number;
    role: string;
    name: string;
    email: string;
    dateCreated: DateTime;
    //surveyResults: SurveyResult[]; // Might remove this as it may not be necessary
    //sessions: Session[];
  
    //oauthAccounts: OAuthAccount[];
}

export default User;