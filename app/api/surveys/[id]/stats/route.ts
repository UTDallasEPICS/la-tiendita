import { PrismaClient, SurveyResult, QuestionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET method to return the list of results of the survey with given ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const surveyId = Number((await params).id)

  // Invalid survey ID
  if (isNaN(surveyId)) 
    return NextResponse.json({ error: "Invalid survey ID" }, { status: 400 })

  try {
    const responseJSON: Record<string, any> = {'stat': {}}

    // Query the survey results of the given surveys 
    const surveyResults: SurveyResult[] = await prisma.surveyResult.findMany({
      where: { surveyId: Number(surveyId) },
    })

    // Aggregation on the number users taken the survey
    responseJSON.stat["Users taken"] = await prisma.surveyResult.count({
      where: { surveyId: Number(surveyId) },
    })

    // Aggregation on the number users taken the 
    const map: Record<string, QuestionType> = {
      'Scalar': QuestionType.SCALAR, 
      'MCQ': QuestionType.MULTIPLE_CHOICE, 
      'FRQ': QuestionType.FREE_RESPONSE
    }
    for (const qType of Object.keys(map)) {
      responseJSON.stat[qType] = await prisma.question.count({
          where: { surveyId: Number(surveyId), 
          type: map[qType] 
        }
      })
    }

    // Aggregation on the choice distribution 
    const idToDist: Record<number, Record<string, number>> = {}

    for (const surveyResult of surveyResults) {
      for (const data of surveyResult.answersData as Record<string, any>[]) {
        const question = data.question
        const answer = data.answer

        if (question.type !== 'FREE_RESPONSE') {
          if (!idToDist[question.id]) {
            idToDist[question.id] = {}
            
            // Build the map based on the question's type 
            if (question.type === "MULTIPLE_CHOICE") {
              Object.keys(question.optionsMap).map((field) => {
                idToDist[question.id]![field] = 0
              })
            } else {
              for (let i = question.minValue; i <= question.maxValue; i++) {
                idToDist[question.id]![i] = 0
              }
            }
          }

          // Distribution based on the type of the question
          idToDist[question.id]![answer]++
        }
      }
    }
    responseJSON['choice distribution'] = idToDist
    
    // Return the response
    return NextResponse.json(responseJSON, { status: 200 })

  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}