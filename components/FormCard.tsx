"use client"

import * as React from "react"
import { FaSpinner } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormCard({ className, ...props }: UserAuthFormProps) {
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
      toast({
        title: "Error",
        description: "Error fetching data from API",
        variant: "destructive",
      })
      console.error("Error fetching data from API:", error)
    }

    setIsLoading(false)
  }

  return (
    <Card className="mx-auto md:w-[40%]">
      <CardHeader>
        <CardTitle>Boxing registration</CardTitle>
        <CardDescription>
          Make sure you have filled in the NPM correctly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="npm">NPM</Label>
              <div className="flex justify-between">
                <Input
                  id="npm"
                  placeholder="Your NPM"
                  type="text"
                  width={80}
                  autoCapitalize="none"
                  value={npm}
                  onChange={(e) => setNpm(e.target.value)}
                  disabled={isLoading || data !== null}
                  className="w-[75%]"
                />
                {data === null && (
                  <Button className="text-xs" disabled={isLoading}>
                    {isLoading && (
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin text-xs" />
                    )}
                    Check NPM
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nama">Name</Label>
              <Input
                id="nama"
                placeholder="Your Name"
                type="text"
                autoCapitalize="none"
                value={data ? data.nama : ""}
                disabled={true}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Kelas</Label>
              <Input
                id="kelas"
                placeholder="Your Class"
                type="text"
                autoCapitalize="none"
                value={data ? data.kelasBaru : ""}
                disabled={true}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  )
}
