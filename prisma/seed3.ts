import { PrismaClient, Role, OAuthProvider, QuestionType, SurveyStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: Role.ADMIN,
    },
  });

  // Create OAuth Accounts for User1
  await prisma.oAuthAccount.create({
    data: {
      provider: OAuthProvider.discord,
      providerAccountId: 'discord12345',
      userId: user1.id,
    },
  });

  await prisma.oAuthAccount.create({
    data: {
      provider: OAuthProvider.github,
      providerAccountId: 'github12345',
      userId: user1.id,
    },
  });

  // Create a Survey
  const survey = await prisma.survey.create({
    data: {
      title: 'Customer Feedback Survey',
      description: 'We value your feedback. Please answer the following questions.',
      categories: ['Feedback', 'Product'],
    },
  });

  // Create Questions for the Survey
  const question1 = await prisma.question.create({
    data: {
      type: QuestionType.SCALAR,
      questionString: 'How satisfied are you with our product?',
      category: 'Feedback',
      minValue: 1,
      maxValue: 5,
      surveyId: survey.id,
    },
  });

  const question2 = await prisma.question.create({
    data: {
      type: QuestionType.MULTIPLE_CHOICE,
      questionString: 'Which features do you use the most?',
      category: 'Product',
      optionsMap: { A: 'Feature 1', B: 'Feature 2', C: 'Feature 3' },
      surveyId: survey.id,
    },
  });

  const question3 = await prisma.question.create({
    data: {
      type: QuestionType.FREE_RESPONSE,
      questionString: 'What improvements would you suggest?',
      category: 'Feedback',
      surveyId: survey.id,
    },
  });

  // Create a Survey Result for User1
  const surveyResult1 = await prisma.surveyResult.create({
    data: {
      answersData: {
        [question1.id]: 4,
        [question2.id]: 'A',
        [question3.id]: 'More features!',
      },
      userId: user1.id,
      surveyId: survey.id,
      status: SurveyStatus.Complete,
    },
  });

  // Create a Survey Result for User2 (Admin)
  const surveyResult2 = await prisma.surveyResult.create({
    data: {
      answersData: {
        [question1.id]: 3,
        [question2.id]: 'B',
        [question3.id]: 'Better customer support.',
      },
      userId: user2.id,
      surveyId: survey.id,
      status: SurveyStatus.Complete,
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
