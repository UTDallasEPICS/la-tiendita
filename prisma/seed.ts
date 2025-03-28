import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

/**
 * The mock data for survey
 * There are 2 surveys
 */
const surveyData: Prisma.SurveyCreateInput[] =[
    {
        title: 'Job Aptitude Survey For First Students', 
        lastModified: new Date('2025-03-26T10:00:00Z'),
        questions: {
            create: [
                {
                    type: 'MCQ', 
                    questionString: 'Which work environment do you prefer?', 
                    choices: {
                        create: [
                            {choiceString: 'Fast-paced and dynamic'},
                            {choiceString: 'Structured and predictable'}, 
                            {choiceString: 'Creative and flexible'},
                            {choiceString: 'Independent and self-directed'}
                        ]
                    },
                    category: 'Environment',
                    weight: 3,
                }, 
                {
                    type: 'MCQ', 
                    questionString: 'Which of these skills do you feel most confident in?',
                    choices: {
                        create: [
                            {choiceString: 'Problem-solving'}, 
                            {choiceString: 'Communication'}, 
                            {choiceString: 'Technical expertise'}, 
                            {choiceString: 'Leadership'}, 
                        ]
                    },
                    category: 'Skill',
                    weight: 5,
                }, 
                {
                    type: 'Scale', 
                    questionString: 'I enjoy working on tasks that require analytical thinking.',
                    category: 'Environment', 
                    weight: 3,
                }, 
                {
                    type: 'Scale', 
                    questionString: 'I prefer working in a team rather than independently.',
                    category: 'Environment', 
                    weight: 3, 
                }, 
                {
                    type: 'Open', 
                    questionString: 'What are your top three strengths that make you a good candidate for a job?', 
                    category: 'Strength', 
                    weight: 4, 
                }, 
                {
                    type: 'Open', 
                    questionString: 'Describe a time when you had to solve a difficult problem at school or work. How did you approach it?',
                    category: 'Situation', 
                    weight: 3,
                }
            ]
        }
    }, 
    {
        title: 'Job Aptitude Survey For Second Students', 
        lastModified: new Date('2025-03-26T12:00:00Z'),
        questions: {
            create: [
                {
                    type: 'MCQ', 
                    questionString: 'What motivates you the most in a job?', 
                    choices: {
                        create: [
                            {choiceString: 'Salary and benefits'},
                            {choiceString: 'Career growth opportunities'}, 
                            {choiceString: 'Work-life balance'},
                            {choiceString: 'Making a positive impact'}
                        ]
                    },
                    category: 'Motivation',
                    weight: 4,
                }, 
                {
                    type: 'MCQ', 
                    questionString: 'Which of these tasks do you enjoy the most?',
                    choices: {
                        create: [
                            {choiceString: 'Problem-solving'}, 
                            {choiceString: 'Collaborating with a team'}, 
                            {choiceString: 'Organizing and planning projects'}, 
                            {choiceString: 'Working with technology'}, 
                        ]
                    },
                    category: 'Environment',
                    weight: 4,
                }, 
                {
                    type: 'Scale', 
                    questionString: 'I feel comfortable adapting to new technologies and tools.',
                    category: 'Work', 
                    weight: 5,
                }, 
                {
                    type: 'Scale', 
                    questionString: 'I prefer having a set routine rather than handling unexpected tasks.',
                    category: 'Work', 
                    weight: 4, 
                }, 
                {
                    type: 'Open', 
                    questionString: 'Describe a situation where you successfully worked under pressure. How did you manage it?', 
                    category: 'Ability', 
                    weight: 5, 
                }, 
                {
                    type: 'Open', 
                    questionString: 'What kind of job role do you see yourself excelling in, and why?',
                    category: 'Ability', 
                    weight: 4,
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
        role: 'Student', 
        name: 'Abraham Lossfunction',
        email: 'abra.loss@utdallas.edu', 
        dateCreated: new Date('2025-03-26T10:00:00Z'),
    }, 
    {
        role: 'Student', 
        name: 'Anna Karenina', 
        email: 'ann.karen@utdallas.edu', 
        dateCreated: new Date('2025-03-26T10:00:00Z'),
    },
    {
        role: 'Admin', 
        name: 'Jane Eyre', 
        email: 'jane.eyre@utdallas.edu', 
        dateCreated: new Date('2025-03-26T10:00:00Z'), 
    },
    {
        role: 'Admin', 
        name: 'Leto Atreides II', 
        email: 'leto.atre@utdallas.edu',
        dateCreated: new Date('2025-03-26T10:00:00Z'), 
    }
]

/**
 * Add manually to Prisma Studio 
 */
const surveyResultData: Prisma.SurveyResultCreateInput[] = [
    {
        answersData: {
            1: 'A', 
            2: 'C', 
            3: 5, 
            4: 3, 
            5: 'I am eager to learn, I communicate very well, I work hard',
            6: 'I was not able to get the math homework done. I sought help from other people and got it.'
        }, 
        lastModified: new Date('2025-04-01T10:00:00Z'), 
        status: 'Completed',
        user: {connect: {email: 'abra.loss@utdallas.edu'}},
        survey: {connect: {id: 1}},  
    }, 
    {
        answersData: {
            1: 'D', 
            2: 'B', 
            3: 4, 
            4: 4, 
            5: 'During my internship, I had to complete a critical project within 24 hours due to an unexpected deadline change. I prioritized tasks, delegated responsibilities among team members, and stayed focused under pressure. By working efficiently and maintaining clear communication, we completed the project on time and met all quality expectations.',
            6: 'I see myself excelling in a backend software engineering role, particularly in API development and database management. I enjoy problem-solving, optimizing performance, and working with frameworks like Django and Go. My analytical thinking and attention to detail help me write efficient and scalable code.'
        }, 
        lastModified: new Date('2025-04-02T10:00:00Z'), 
        status: 'Completed',
        user: {connect: {email: 'abra.loss@utdallas.edu'}},
        survey: {connect: {id: 2}},  
    }, 
    {
        answersData: {
            1: 'B', 
            2: 'D', 
            3: 3, 
            4: 4, 
            5: 'Whatever I am doing, I am all good at them',
            6: 'I was not able to get the literature homework done. I sought help from other people and got it.'
        }, 
        lastModified: new Date('2025-04-01T10:00:00Z'), 
        status: 'Completed',
        user: {connect: {email: 'ann.karen@utdallas.edu'}},
        survey: {connect: {id: 1}},  
    }, 
    {
        answersData: {
            1: 'C', 
            2: 'A', 
            3: 5, 
            4: 1, 
            5: 'In my final year of college, I had to give a group presentation, but two members dropped out at the last minute. I quickly reorganized the slides, redistributed the speaking parts, and practiced extra to ensure a smooth delivery. Despite the setback, we delivered a strong presentation and received positive feedback',
            6: 'I believe I would thrive as a Machine Learning Engineer because I enjoy working with data, training models, and optimizing AI systems. I have experience with PyTorch and deep learning, and I’m passionate about improving real-world applications using AI. My ability to analyze complex problems and implement solutions makes this a great fit.'
        }, 
        lastModified: new Date('2025-04-02T10:00:00Z'), 
        status: 'Completed',
        user: {connect: {email: 'ann.karen@utdallas.edu'}},
        survey: {connect: {id: 2}},  
    }, 
]

export async function main() {
    for (const survey of surveyData) {
        await prisma.survey.create({data: survey})
    }

    for (const user of userData) {
        await prisma.user.create({data: user})
    }

    for (const result of surveyResultData) {
        await prisma.surveyResult.create({data: result})
    }
}

main()