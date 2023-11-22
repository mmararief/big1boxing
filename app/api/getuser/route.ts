import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try{
        const users = await prisma.userPayment.findMany({
            where: {
              payment_status: "success",
            },
          })
        return NextResponse.json(users, { status : 200})
    }catch(error){
        return NextResponse.json({message : 'fetch gagal'}, { status : 500})
    }
    
}
