import { PrismaClient, Prisma, Role, QuestionType, SurveyStatus } from "@prisma/client";

const prisma = new PrismaClient()

/**
 * The mock data for survey
 * There are 2 surveys
 */
const surveyData: Prisma.SurveyCreateInput[] = [
  {
    title: 'First Survey for High School Students',
    description: 'This is the survey aimed specifically at the high school students.',
    categories: ['High School', 'Career', 'Environment', 'Skill'],
    questions: {
      create: [
        {
          type: QuestionType.MULTIPLE_CHOICE,
          questionString: 'Which work environment do you prefer?',
          category: 'Environment',
          optionsMap: {
            A: 'Fast-paced and dynamic', 
            B: 'Structured and predictable',
            C: 'Creative and flexible',
            D: 'Independent and self-directed',
          },
        },
        {
          type: QuestionType.MULTIPLE_CHOICE,
          questionString: 'Which of these skills do you feel most confident in?',
          category: 'Skill',
          optionsMap: {
            A: 'Problem solving', 
            B: 'Communication', 
            C: 'Technical expertise', 
            D: 'Leadership',
          }
        },
        {
          type: QuestionType.SCALAR,
          questionString: 'I enjoy working on tasks that require analytical thinking.',
          category: 'Environment',
          minValue: 1, 
          maxValue: 5, 
        },
        {
          type: QuestionType.SCALAR,
          questionString: 'I prefer working in a team rather than independently.',
          category: 'Environment',
          minValue: 1, 
          maxValue: 5, 
        },
        {
          type: QuestionType.FREE_RESPONSE,
          questionString: 'What are your top three strengths that make you a good candidate for a job?',
          category: 'Skill',
        },
        {
          type: QuestionType.FREE_RESPONSE,
          questionString: 'Describe a time when you had to solve a difficult problem at school or work. How did you approach it?',
          category: 'Environment',
        }
      ]
    }
  },
  {
    title: 'Second Survey for Middle School Students',
    description: 'This is the survey aimed specifically at the middle school students.',
    categories: ['Middle school', 'Motivation', 'Environment', 'Skill'],
    questions: {
      create: [
        {
          type: QuestionType.MULTIPLE_CHOICE,
          questionString: 'What motivates you the most in a job?',
          category: 'Motivation',
          optionsMap: {
            A: 'Salary and benefits', 
            B: 'Career growth opportunities', 
            C: 'Work-life balance', 
            D: 'Making a positive impact',
          },
        },
        {
          type: QuestionType.MULTIPLE_CHOICE,
          questionString: 'Which of these tasks do you enjoy the most?',
          category: 'Environment', 
          optionsMap: {
            A: 'Problem-solving', 
            B: 'Collaborating with a team',
            C: 'Organizing and planning projects',
            D: 'Working with technology',
          },
        },
        {
          type: QuestionType.SCALAR,
          questionString: 'I feel comfortable adapting to new technologies and tools.',
          category: 'Skill',
          minValue: 1, 
          maxValue: 5, 
        },
        {
          type: QuestionType.SCALAR,
          questionString: 'I prefer having a set routine rather than handling unexpected tasks.',
          category: 'Environment',
          minValue: 1, 
          maxValue: 5, 
        },
        {
          type: QuestionType.FREE_RESPONSE,
          questionString: 'Describe a situation where you successfully worked under pressure. How did you manage it?',
          category: 'Skill',
        },
        {
          type: QuestionType.FREE_RESPONSE, 
          questionString: 'What kind of job role do you see yourself excelling in, and why?',
          category: 'Environment',
        }
      ]
    }
  }
]
/**
 * Mock data for users.
 * 3 users: 2 students and 2 admins
 */
const userData: Prisma.UserCreateInput[] = [
  {
    role: Role.USER,
    name: 'Abraham Lossfunction',
    email: 'abra.loss@utdallas.edu',
    phoneNumber: '123456789',
  },
  {
    role: Role.USER,
    name: 'Anna Karenina',
    email: 'ann.karen@utdallas.edu',
    phoneNumber: '3457723327',
  },
  {
    role: Role.ADMIN,
    name: 'Jane Eyre',
    email: 'jane.eyre@utdallas.edu',
    phoneNumber: '9122197702',
  },
  {
    role: Role.ADMIN,
    name: 'Leto Atreides II',
    email: 'leto.atre@utdallas.edu',
    phoneNumber: '4698761225',
  }
]

export async function main() {
  for (const survey of surveyData) {
    await prisma.survey.create({ data: survey })
  }

  for (const user of userData) {
    await prisma.user.create({ data: user })
  }
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });