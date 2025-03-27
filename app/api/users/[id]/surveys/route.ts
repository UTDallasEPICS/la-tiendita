import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient(); 

/**
 * GET method to get the list of surveys taken by user with given userID
 * @param request 
 * @param param1 
 * @returns the list of surveys
 */
export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> } 
) {
    const queriedUserId = (await params).id;

    try {
        // Query the surveys taken by userID 
        const surveys = await prisma.survey.findMany({
            where: {
                surveyResults: {
                    // At least 1 survey result belonging to the user
                    some: { userId: Number(queriedUserId) }
                }
            },
            // Don't show survey results of the survey here
            include: { surveyResults: false }
        })

        return NextResponse.json(surveys, { status: 200 })
    }
    catch (error: any) {
        return NextResponse.json(
            { 
                message: `Failed to get surveys taken by ${queriedUserId}`, 
                error: error.message 
            }, 
            { status: 500 }
        )
    }
}