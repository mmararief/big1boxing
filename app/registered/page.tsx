import { GetServerSideProps } from "next"
import { PrismaClient, UserPayment } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const prisma = new PrismaClient()

const getUser = async () => {
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
}

const RegisteredPage = async () => {
  const users = await getUser()
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Thank you for registering for the Big1boxing competition
          </h1>
        </div>
        <Table>
          <TableCaption>
            A list of users with payment status success.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>NPM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.order_id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.npm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export default RegisteredPage
