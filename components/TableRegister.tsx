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

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.userPayment.findMany({
    where: {
      payment_status: "success",
    },
  })

  return {
    props: {
      users,
    },
  }
}

type Props = {
  users: UserPayment[]
}

const TableRegister: React.FC<Props> = (props) => {
  console.log(props.users)
  return (
    <>
      <Table>
        <TableCaption>
          A list of users with payment status success.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>NPM</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.users.map((user) => (
            <TableRow key={user.order_id}>
              <TableCell className="font-medium">{user.order_id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.npm}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
export default TableRegister
