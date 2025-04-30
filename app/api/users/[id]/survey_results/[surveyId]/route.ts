import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get survey results for a specific survey for a specific user
export async function GET(
    req: NextRequest,
    { params }: { params: { id?: number; surveyId?: number } }
  ) {

    const rawUserId = (await params).id;
    const userId = rawUserId ? Number(rawUserId) : NaN;
    if (!rawUserId || Number.isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing user ID in URL" },
        { status: 400 }
      );
    }
  
    const rawSurveyId = (await params).surveyId;
    const surveyId = rawSurveyId ? Number(rawSurveyId) : NaN;
    if (!rawSurveyId || Number.isNaN(surveyId) || surveyId <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing surveyId in URL" },
        { status: 400 }
      );
    }
  
    try {
      const result = await prisma.surveyResult.findUnique({
        where: {
          userId_surveyId: {
            userId,
            surveyId,
          },
        },
        include : {survey : true}
      });
  
      if (!result) {
        return NextResponse.json(
          { error: "No survey result found for that user & survey" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error fetching survey result:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }