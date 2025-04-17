import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to return the list of results of the survey with given ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const queriedSurveyId = (await params).id;

  try {
    // Query the survey results of the given surveys 
    const surveyResults = await prisma.surveyResult.findMany({
      where: { surveyId: Number(queriedSurveyId) },
    })

    return NextResponse.json(surveyResults, { status: 200 })
  }
  catch (error: any) {
    const message: string = `Failed to get survey results of ${queriedSurveyId}`;
    return NextResponse.json(
      { message: message, error: error.message },
      { status: 500 }
    )
  }
}