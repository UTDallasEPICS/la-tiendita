import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// Interface for the user
interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  dateCreated: Date;
}

// GET method to get users using role specidifed from the endpoint 
// Endpoint: /users?role=[]?name=[]?email=[]
export async function GET(request: NextRequest) {
  try {
    let prismaFilter: Prisma.UserWhereInput = {}
    let filter: boolean = false // Indicate if we need to filter 

    // Build the prisma filter based on query params
    // Note: WhereInput can be indexed like map. Is it a good practice? 
    const searchParams = request.nextUrl.searchParams
    for (const field of ['name', 'email', 'role']) {
      if (searchParams.get(field) !== null) {
        filter = true
        if (field === "name" || field === "email") {
          // Name and email that includes the query params 
          prismaFilter[field] = {contains: searchParams.get(field)!}
        } 
        else if (field === "role") {
          // Exact role 
          prismaFilter[field] = searchParams.get(field)!
        }
      }
    }

    // Query users with the role 
    let users: User[] = []
    if (filter) {
      users = await prisma.user.findMany({
        where: prismaFilter,
        // Don't show the survey results of the user here
        include: { surveyResults: false }
      })
    }
    else {
      users = await prisma.user.findMany({ include: { surveyResults: false } })
    }
    return NextResponse.json(users, { status: 200 })
  }
  catch (error: any) {
    const message: string = 'Failed to get users matching role'
    return NextResponse.json(
      { message: message, error: error.message },
      { status: 500 }
    )
  }
}

