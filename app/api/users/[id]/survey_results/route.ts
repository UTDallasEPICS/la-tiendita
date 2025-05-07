import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to return the list of results of survey taken the user with given ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const queriedUserId: number = Number((await params).id);
  if (isNaN(queriedUserId)) 
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })

  try {
    // Query the survey results with queried user ID
    const surveyResults = await prisma.surveyResult.findMany({
      where: { userId: queriedUserId },
      include: {survey : true}
    })

    return NextResponse.json(surveyResults, { status: 200 })
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}