import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse} from "next/server"; 

const prisma = new PrismaClient()

/**
 * Capitalize the string 
 * @param str 
 * @returns capitalized str
 */
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Get the list of users with the specified role on endpoint
 * /users?role=[student | admin]
 * @param request 
 * @returns the list of users 
 */
export async function GET(request: NextRequest) {
    try {
        // The query parameters 'role' 
        const searchParams = request.nextUrl.searchParams
        const queriedRole = searchParams.get('role')

        // Query users with the role 
        const users = await prisma.user.findMany({
            where: { role: queriedRole != null ? capitalize(queriedRole) : "" }, 
            // Don't show the survey results of the user here 
            include: { surveyResults: false } 
        })

        return NextResponse.json(users, { status: 200 })
    } 
    catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to get users matching role', error: error.message }, 
            { status: 500 }
        )
    }
}

