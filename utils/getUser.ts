import { cache } from 'react'
import prisma from "@/lib/prisma"
export const revalidate = 30 // revalidate the data at most every hour
 
export const getUser = cache(async () => {
    const users = await prisma.userPayment.findMany({
        where: {
          payment_status: "success",
        },
        select: {
          order_id: true,
          name: true,
          email: true,
          npm: true,
        },
      })
    
      return users
})