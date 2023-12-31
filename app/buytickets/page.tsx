import Link from "next/link"

import { FormCard } from "@/components/FormCard"
import Form from "@/components/form"

export default function EventPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Do you love boxing ?
            <br className="hidden sm:inline" />
            Watching the boxing fun that Gunadarma students take part in!
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            <Link href="/buytickets/ticketbuyers">
              Who are the spectators of the competition?
            </Link>
          </p>
        </div>
        {/* <Form /> */}
        <FormCard />
      </section>
    </>
  )
}
