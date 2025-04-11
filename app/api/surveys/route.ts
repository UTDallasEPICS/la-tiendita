import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * GET method to return all surveys
 * @param request 
 * @returns list of all surveys with optional nested question data
 */
export async function GET(request: NextRequest) {
    try {
        const surveys = await prisma.survey.findMany({
            include: {
                questions: {
                    include: {
                        choices: true
                    }
                }
            }
        });

        return NextResponse.json(surveys, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to retrieve surveys",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
