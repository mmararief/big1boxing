import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  name: string
  email: string
  npm: string
  weight: string
  class: string
}
async function getUser() {
  const res = await fetch(
    "https://frightened-hare-wrap.cyclic.app/api/midtrans/getuserboxing",
    { next: { revalidate: 0 } }
  )
  return res.json()
}

const RegisteredPage = async () => {
  const users = (await getUser()) as User[]

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Thank you for registering for the Big1boxing competition.
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              {/* <TableHead>Email</TableHead> */}
              <TableHead>NPM</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-small text-sm">
            {users.map((user, index) => (
              <TableRow key={user.npm}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                {/* <TableCell>{user.email}</TableCell> */}
                <TableCell>{user.npm}</TableCell>
                <TableCell>{user.weight}</TableCell>
                <TableCell>{user.class}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export default RegisteredPage
