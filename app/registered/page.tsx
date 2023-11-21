import TableRegister from "@/components/TableRegister"

export default function RegisteredPage() {
  return (
    <>
      <>
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Thank you for registering for the Big1boxing competition
            </h1>
          </div>
          {/* <Form /> */}
          <TableRegister />
        </section>
      </>
    </>
  )
}
