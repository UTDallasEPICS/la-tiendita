import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to return the list of results of the survey with given ID
export async function GET
(
    request: NextRequest,
    context: { params : { id: string } }
) {
    const idParam = (await context.params)?.id;

    if (!idParam) {
        return NextResponse.json({ error: "Survey ID is required" }, { status: 400 });
    }

    const queriedSurveyId = parseInt(idParam, 10);
    
    // ID is a bad number
    if (isNaN(queriedSurveyId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try
    {
        // Query the survey results of the given surveys 
        const surveyQuestions = await prisma.Question.findMany({
            where: 
            {
                surveyId: Number(queriedSurveyId) 
            },
        })

        // catches a null return
        if (!surveyQuestions) {
            return NextResponse.json({ message: "Survey not found" }, { status: 404 });
        }

        console.log("Fetched questions:", surveyQuestions);

        return NextResponse.json(surveyQuestions, { status: 200 })
    }
    catch (error: unknown) {
        const err = error instanceof Error ? error : new Error("Unknown error");
    
        console.error("Error fetching questions:", err.message);
    
        return NextResponse.json(
        {
            message: `Failed to get survey results of ${queriedSurveyId}`,
            error: err.message,
        },
        { status: 500 }
        );
    }
}