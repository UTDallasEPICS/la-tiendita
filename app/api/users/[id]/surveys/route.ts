import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to get the list of surveys taken by user with given userID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const queriedUserId: number = Number((await params).id);
  if (isNaN(queriedUserId)) 
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })

  try {
    // Query the surveys taken by userID 
    const surveys = await prisma.survey.findMany({
      where: {
        // At least 1 survey result belonging to the user
        surveyResults: { some: { userId: queriedUserId } }
      },
      include: { questions: true }
    })
    return NextResponse.json(surveys, { status: 200 })
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}