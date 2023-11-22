import { NextResponse } from "next/server";

import type { UserPayment } from "@prisma/client";
import prisma from "@/lib/prisma"

export const POST = async (request: Request) => {
  const body: UserPayment = await request.json();
  const payment = await prisma.userPayment.create({
    data: {
      name: body.name,
      order_id: body.order_id,
      email: body.email,
      npm: body.npm,
      total: body.total,
      payment_status: "unpaid",
    },

    
  })

  return NextResponse.json(payment)
}
