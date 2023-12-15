import { NextResponse } from "next/server";

import type { UserBoxing } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: UserBoxing = await request.json();
  
    const existingBoxers = await prisma.userBoxing.findMany({
      where: { class: body.class },
    });
  
    // Check if the allowed limit is reached
    if (existingBoxers.length >= 3) {
      throw new Error("This class is already full!");
    }
  
    const payment = await prisma.userBoxing.create({
      data: {
        npm: body.npm,
        name: body.name,
        class: body.class,
        email: body.email,
        weight: body.weight,
      },
    });
  
    console.log(body);
    console.log(payment);
  
    return NextResponse.json(payment);
  };
  