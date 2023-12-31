import Link from "next/link"

import { FormReg } from "@/components/FormReg"
import Form from "@/components/form"

export default function EventRegister() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Do you love boxing and want to show your skills?
            <br className="hidden sm:inline" />
            Register now before the slots are full.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            <Link href="/registered">Who has registered??</Link>
          </p>
        </div>

        <FormReg />
      </section>
    </>
  )
}
