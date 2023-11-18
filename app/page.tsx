import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Banner from "@/components/banner"

export default function IndexPage() {
  return (
    <div className="py-10">
      <Banner />
    </div>
  )
}
