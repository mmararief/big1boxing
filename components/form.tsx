"use client"

import * as React from "react"
import { FaSpinner } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Form({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [npm, setNpm] = React.useState<string>("")
  const [data, setData] = React.useState<{
    npm: string
    nama: string
    kelasBaru: string
  } | null>(null)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API request (replace with actual API call)
    try {
      const response = await fetch(
        `https://frightened-hare-wrap.cyclic.app/api/mahasiswa/${npm}`
      )
      const result = await response.json()

      // Assuming the API response structure is similar to your example
      if (result && result.length > 0) {
        setData(result[0])
        toast({
          title: "Success",
          description: "NPM found in gunadarma",
        })
      } else {
        toast({
          title: "Error",
          description: "NPM not found in gunadarma",
          variant: "destructive",
        })
        setData(null)
      }
    } catch (error) {
      console.error("Error fetching data from API:", error)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div
        className={cn(
          "mx-auto my-10 grid w-full gap-6 border-2  md:w-[30%]",
          className
        )}
        {...props}
      >
        <form onSubmit={onSubmit}>
          <div className="m-4 grid gap-2">
            <p className="my-3 text-center text-2xl font-extrabold leading-tight tracking-tighter md:text-2xl">
              Register
            </p>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="npm">
                NPM
              </Label>
              <Input
                id="npm"
                placeholder="Your NPM"
                type="text"
                autoCapitalize="none"
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                disabled={isLoading || data !== null}
              />
            </div>
            {data && (
              <>
                <Label className="sr-only" htmlFor="nama">
                  Nama
                </Label>
                <Input
                  id="nama"
                  placeholder="ammar"
                  type="text"
                  autoCapitalize="none"
                  value={data.nama}
                  disabled={true}
                />

                <Label className="sr-only" htmlFor="kelas">
                  Kelas
                </Label>
                <Input
                  id="kelas"
                  placeholder="2KA25"
                  type="text"
                  autoCapitalize="none"
                  value={data.kelasBaru}
                  disabled={true}
                />
              </>
            )}
            {/* Conditionally render the button based on the data state */}
            {data === null && (
              <Button className={buttonVariants()} disabled={isLoading}>
                {isLoading && (
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Check NPM
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
