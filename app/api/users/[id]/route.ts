import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id: number = Number((await params).id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id: number = Number((await params).id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  try {
    const updates = (await request.json()) as Partial<{
      name: string;
      email: string;
      phoneNumber: string;
      address: string;
    }>;

    const allowedFields = ["name", "email", "phoneNumber", "address"] as const;
    const data: Record<string, string> = {};

    for (const field of allowedFields) {
      if (
        field in updates &&
        typeof updates[field as keyof typeof updates] === "string"
      ) {
        data[field] = updates[field as keyof typeof updates] as string;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
