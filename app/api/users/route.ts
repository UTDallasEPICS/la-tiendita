import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { User, Role } from "@prisma/client";

const prisma = new PrismaClient()

// GET method to get users using role specidifed from the endpoint 
// /users?role=?name=?email=
export async function GET(request: NextRequest) {
  try {
    let prismaFilter: Prisma.UserWhereInput = {}
    let filter: boolean = false // Indicate if we need to filter 

    // Build the prisma filter based on query params
    const searchParams = request.nextUrl.searchParams
    
    const fieldArr: string[] = ['name', 'email', 'role']
    fieldArr.forEach((field: string) => {
      if (searchParams.get(field) !== null) {
        filter = true

        if (field === 'name' || field === 'email') {
          // Name and email only need to include the query params 
          prismaFilter[field] = { contains: searchParams.get(field)! } 
        }
        else if (field === 'role') {
          prismaFilter[field] = searchParams.get(field) == 'USER' ? Role.USER : Role.ADMIN
        }
      }
    })

    // Query users with the role 
    let users: User[] = []
    if (filter) 
      users = await prisma.user.findMany({ where: prismaFilter })
    else 
      users = await prisma.user.findMany()

    return NextResponse.json(users, { status: 200 })
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

