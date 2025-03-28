import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

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
    for (const result of surveyResultData) {
        await prisma.surveyResult.create({data: result})
    }
}

main()