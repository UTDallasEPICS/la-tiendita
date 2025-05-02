import { PrismaClient, SurveyResult, SurveyStatus, QuestionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const prisma = new PrismaClient();

interface SubmitSurveyBody {
  answersData: Array<{ question: number; answer: string | number }>;
  userId: number;
  status: SurveyStatus; 
}

const QuestionSchema = z.object({
  id: z.number().int().positive(),
  type: z.nativeEnum(QuestionType),
  questionString: z.string(),
  category: z.string(),
  minValue: z.number().optional().nullable(),
  maxValue: z.number().optional().nullable(),
  surveyId: z.number().int().positive(),
  optionsMap: z
    .record(
      z.string().length(1), // “A”, “B”, ... might change this...
      z.object({
        option: z.string(),
        category: z.string(),
        weight: z.number().optional(),
      })
    )
    .nullable(),
});

const AnswerEntrySchema = z.object({
  question: QuestionSchema,
  answer: z.union([z.string(), z.number()]),
});

const BodySchema = z.object({
  answersData: z.array(AnswerEntrySchema).nonempty(),
  userId: z.number().int().positive(),
  status: z.enum(["OnGoing", "Complete"]),
});

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
    // Query the survey results of the given surveys 
    const surveyResults = await prisma.surveyResult.findMany({
      where: { surveyId: Number(surveyId) },
      include: { survey: true }
    })

    return NextResponse.json(surveyResults, { status: 200 })
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const {id} = await params;
  const surveyId = Number(id);

  let body: z.infer<typeof BodySchema>;
  try {
    const json = await req.json();
    const b = BodySchema.safeParse(json);
    if (!b.success) throw b.error;
    body = b.data;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.format() }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  // // Unsure if I should map this to a more space optimized structure...
  // //    e.g. [{ questionId: 3, answer: 5 }, ...]
  // const sanitizedAnswers = body.answersData.map((entry) => ({
  //   questionId: entry.question.id,
  //   answer: entry.answer,
  // }));

  try {
    const newResult = await prisma.surveyResult.create({
      data: {
        answersData: body.answersData,
        //answersData: sanitizedAnswers,
        status: body.status,
        user: { connect: { id: body.userId } },
        survey: { connect: { id: surveyId } },
      },
    });
    return NextResponse.json(newResult, { status: 201 });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}