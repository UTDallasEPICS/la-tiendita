import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient(); 

/**
 * GET method to return the list of results of survey taken the user with given ID
 * @param request 
 * @param param1 
 * @returns the list of survey results 
 */
export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> } 
) {
    const queriedUserId = (await params).id; 

    try {
        // Query the survey results with queried user ID
        const surveyResults = await prisma.surveyResult.findMany({
            where: { userId: Number(queriedUserId) },
        })

        return NextResponse.json(surveyResults, { status: 200 })
    }
    catch (error: any) {
        return NextResponse.json(
            { 
                message: `Failed to get results taken by ${queriedUserId}`, 
                error: error.message 
            }, 
            { status: 500 }
        )
    }
}