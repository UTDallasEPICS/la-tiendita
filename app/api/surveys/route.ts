import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Survey } from "@prisma/client";

const prisma = new PrismaClient();

type Option = {
  option: string;
  category: string;
  weight?: number;
};

/**
 * 
 * @returns 
 */
export async function GET() {
  try {
    // When getting the list of surveys, no need to get the question right away
    const surveys: Survey[] = await prisma.survey.findMany();
    return NextResponse.json(surveys, { status: 200 });
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, categories, questions } = body;

  if (!title) return NextResponse.json({ error: "Invalid Title" }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Invalid Description" }, { status: 400 });

  if (!Array.isArray(categories) || categories.some((c) => typeof c !== "string")) {
    return NextResponse.json(
      { error: "Invalid categories format" },
      { status: 400 }
    );
  }

  for (const question of questions) {
    if (!categories.includes(question.category)) {
      return NextResponse.json(
        { error: `Question category "${question.category}" not in categories list` },
        { status: 400 }
      );
    }

    if (question.optionsMap) {
      try {
        const options = question.optionsMap as Record<string, Option>;

        for (const key in options) {
          const opt = options[key];

          if (
            typeof opt !== "object" ||
            typeof opt.option !== "string" ||
            typeof opt.category !== "string"
          ) {
            return NextResponse.json(
              { error: `Invalid option format at key "${key}"` },
              { status: 400 }
            );
          }

          if (!categories.includes(opt.category)) {
            return NextResponse.json(
              { error: `Option category "${opt.category}" in key "${key}" not in categories list` }, 
              { status: 400 });
          }
        }
      } catch {
        return NextResponse.json({ error: "Malformed optionsMap" }, { status: 400 });
      }
    }
  }

  try {
    const newSurvey = await prisma.survey.create({
      data: {
        title,
        description,
        categories,
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    return NextResponse.json(newSurvey, { status: 201 });
  } 
  catch (err) {
    console.error("Survey creation error:", err);
    return NextResponse.json({ error: "Failed to create survey" }, { status: 500 });
  }
}
