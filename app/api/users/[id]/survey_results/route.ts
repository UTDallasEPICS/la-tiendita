import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to return the list of results of survey taken the user with given ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const queriedUserId: string = (await params).id;

  try {
    // Query the survey results with queried user ID
    const surveyResults = await prisma.surveyResult.findMany({
      where: { userId: Number(queriedUserId) },
    })

    return NextResponse.json(surveyResults, { status: 200 })
  }
  catch (error: any) {
    const message: string = `Failed to get results taken by ${queriedUserId}`
    return NextResponse.json(
      { message: message, error: error.message },
      { status: 500 }
    )
  }
}