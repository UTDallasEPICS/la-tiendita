import { PrismaClient, Prisma, SurveyStatus } from "@prisma/client";

const prisma = new PrismaClient()

/**
 * Add manually to Prisma Studio 
 */

const surveyResultData: Prisma.SurveyResultCreateInput[] = [
  {
    answersData: {
      4: 'A',
      5: 'C',
      6: 5,
      7: 3,
      8: 'I am eager to learn, I communicate very well, I work hard',
      9: 'I was not able to get the math homework done. I sought help from other people and got it.'
    },
    status: SurveyStatus.Complete,
    user: { connect: { email: 'abra.loss@utdallas.edu' } },
    survey: { connect: { id: 2 } },
  },
  {
    answersData: {
      10: 'D',
      11: 'B',
      12: 4,
      13: 4,
      14: 'During my internship, I had to complete a critical project within 24 hours due to an unexpected deadline change. I prioritized tasks, delegated responsibilities among team members, and stayed focused under pressure. By working efficiently and maintaining clear communication, we completed the project on time and met all quality expectations.',
      15: 'I see myself excelling in a backend software engineering role, particularly in API development and database management. I enjoy problem-solving, optimizing performance, and working with frameworks like Django and Go. My analytical thinking and attention to detail help me write efficient and scalable code.'
    },
    status: SurveyStatus.Complete,
    user: { connect: { email: 'abra.loss@utdallas.edu' } },
    survey: { connect: { id: 3 } },
  },
  {
    answersData: {
      4: 'B',
      5: 'D',
      6: 3,
      7: 4,
      8: 'Whatever I am doing, I am all good at them',
      9: 'I was not able to get the literature homework done. I sought help from other people and got it.'
    },
    status: SurveyStatus.Complete,
    user: { connect: { email: 'ann.karen@utdallas.edu' } },
    survey: { connect: { id: 2 } },
  },
  {
    answersData: {
      10: 'C',
      11: 'A',
      12: 5,
      13: 1,
      14: 'In my final year of college, I had to give a group presentation, but two members dropped out at the last minute. I quickly reorganized the slides, redistributed the speaking parts, and practiced extra to ensure a smooth delivery. Despite the setback, we delivered a strong presentation and received positive feedback',
      15: 'I believe I would thrive as a Machine Learning Engineer because I enjoy working with data, training models, and optimizing AI systems. I have experience with PyTorch and deep learning, and I’m passionate about improving real-world applications using AI. My ability to analyze complex problems and implement solutions makes this a great fit.'
    },
    status: SurveyStatus.Complete,
    user: { connect: { email: 'ann.karen@utdallas.edu' } },
    survey: { connect: { id: 3 } },
  },
]

export async function main() {
  for (const result of surveyResultData) {
    await prisma.surveyResult.create({ data: result })
  }
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });