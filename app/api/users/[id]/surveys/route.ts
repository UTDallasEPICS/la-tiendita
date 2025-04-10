import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to get the list of surveys taken by user with given userID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const queriedUserId: string = (await params).id;
  try {
    // Query the surveys taken by userID 
    const surveys = await prisma.survey.findMany({
      where: {
        // At least 1 survey result belonging to the user
        surveyResults: { some: { userId: Number(queriedUserId) } }
      },
      // Don't show survey results of the survey here
      include: { surveyResults: false }
    })
    return NextResponse.json(surveys, { status: 200 })
  }
  catch (error: any) {
    const message: string = `Failed to get surveys taken by ${queriedUserId}`;
    return NextResponse.json(
      { message: message, error: error.message },
      { status: 500 }
    )
  }
}