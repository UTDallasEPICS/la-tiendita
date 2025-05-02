import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/surveys/:id
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const surveyId: number = Number((await params).id)

  if (isNaN(surveyId)) 
    // Invalid ID
    return NextResponse.json({ error: 'Invalid survey ID' }, { status: 400 });

  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: { questions: true, surveyResults: true },
  });

  if (!survey) 
    // There's is no survey with given ID
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 });

  return NextResponse.json(survey, { status: 200 });
}


// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const surveyId = parseInt(params.id);
//   const body = await req.json();
//   const { title, description, categories } = body;

//   try {
//     const updatedSurvey = await prisma.survey.update({
//       where: { id: surveyId },
//       data: {
//         title,
//         description,
//         categories,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(updatedSurvey);
//   } catch (err) {
//     return NextResponse.json({ error: 'Failed to update survey' }, { status: 500 });
//   }
// }

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     const surveyId = parseInt(params.id);
//     const body = await req.json();
//     const { title, description, categories, questions } = body;
  
//     try {
//       // Update survey basic fields
//       const updatedSurvey = await prisma.survey.update({
//         where: { id: surveyId },
//         data: {
//           title,
//           description,
//           categories,
//           updatedAt: new Date(),
//         },
//       });
  
//       // Optional: clear old questions if new ones are provided
//       if (Array.isArray(questions)) {
//         await prisma.question.deleteMany({ where: { surveyId } });
  
//         await prisma.question.createMany({
//           data: questions.map((q: any) => ({
//             ...q,
//             surveyId,
//           })),
//         });
//       }
  
//       const surveyWithQuestions = await prisma.survey.findUnique({
//         where: { id: surveyId },
//         include: { questions: true },
//       });
  
//       return NextResponse.json(surveyWithQuestions);
//     } catch (err) {
//       console.error(err);
//       return NextResponse.json({ error: 'Failed to update survey' }, { status: 500 });
//     }
//   }
  

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const surveyId = parseInt(params.id);

  try {
    await prisma.survey.delete({ where: { id: surveyId } });
    return NextResponse.json({ message: 'Survey deleted successfully' });
  } 
  catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete survey' }, 
      { status: 500 });
  }
}
