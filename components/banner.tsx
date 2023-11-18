"use client"

import Image from "next/image"
import Link from "next/link"
import Typewriter from "typewriter-effect"

import { buttonVariants } from "@/components/ui/button"

export default function Banner() {
  return (
    <>
      <div className="hero mx-auto w-[80%] bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
          <div className="hero-wrapper grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="hero-text col-span-6">
              <h1 className=" max-w-xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                <Typewriter
                  options={{
                    strings: ["Big1Boxing", "AmayDev"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>

              <p className="mt-8 text-base font-semibold leading-relaxed text-gray-800">
                Unofficial Inter-class boxing competition.
              </p>
              <div className="py-10">
                <Link href="/event" className={buttonVariants()} replace>
                  Join Now
                </Link>
              </div>
            </div>

            <div className="hero-image col-span-6 px-10">
              <Image
                src="/Sports1.png"
                width={300}
                height={400}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
