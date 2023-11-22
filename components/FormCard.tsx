"use client"

import * as React from "react"
import { useEffect } from "react"
import axios from "axios"
import { FaSpinner } from "react-icons/fa"
import uniqid from "uniqid"

import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
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
  const [weight, setWeight] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [npm, setNpm] = React.useState<string>("")
  const [token, setToken] = React.useState<string>("")
  const [isInputFocused, setIsInputFocused] = React.useState(false)
  var order_id = "ORDER-" + uniqid()

  const process = async () => {
    const data = {
      order_id: order_id,
      name: datas ? datas.nama : "",
      total: 5000,
      email: email,
      npm: npm,
      status: "unpaid",
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await axios.post(
        "https://frightened-hare-wrap.cyclic.app/api/payment/process-transaction",
        data,
        config
      )
      console.log(response.data.token)

      setToken(response.data.token)
      const res = await axios.post("/api", data)
    } catch (error) {
      toast({
        title: "Error",
        description: "transaction_details.order_id sudah digunakan",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (token) {
      window.snap.pay(
        token,
        {
          onSuccess: (result: any) => {
            localStorage.setItem("Pembayaran", JSON.stringify(result))
            setToken("")
          },
          onPending: (result: any) => {
            localStorage.setItem("Pembayaran", JSON.stringify(result))
            setToken("")
          },
          onError: (error: any) => {
            console.log(error)
            setToken("")
          },
          onClose: () => {
            console.log("Anda belum menyelesaikan pembayaran")
            setToken("")
          },
        },
        {
          // Additional configuration options if needed
        }
      )
      setNpm("")
    }
  }, [token])

  useEffect(() => {
    const scriptTag = document.createElement("script")
    scriptTag.src = "https://app.midtrans.com/snap/snap.js"
    scriptTag.async = true

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  const [datas, setdatas] = React.useState<{
    npm: string
    nama: string
    kelasBaru: string
  } | null>(null)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://frightened-hare-wrap.cyclic.app/api/mahasiswa/${npm}`
      )
      console.log(response)
      const result = await response.json()

      if (result && result.length > 0) {
        setdatas(result[0])
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
        setdatas(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching datas from API",
        variant: "destructive",
      })
      console.error("Error fetching datas from API:", error)
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full items-center gap-4">
            {isInputFocused && (
              <Alert>
                <AlertTitle>Note !</AlertTitle>
                <AlertDescription>
                  Use a space when you have finished filling in the NPM.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="npm">NPM</Label>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="npm"
                  placeholder="Your NPM"
                  type="text"
                  value={npm}
                  onChange={(e) => {
                    setNpm(e.target.value)

                    if (e.target.value.length === 9) {
                      onSubmit(e)
                      setIsInputFocused(false)
                    }
                  }}
                  disabled={isLoading || datas !== null}
                  className="w-[100%]"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />

                {/* {datas === null && (
                  <Button className="text-xs" disabled={isLoading}>
                    {isLoading && (
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin text-xs" />
                    )}
                    Check NPM
                  </Button>
                )} */}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nama">Name</Label>
              <Input
                id="nama"
                placeholder="Your Name"
                type="text"
                autoCapitalize="none"
                value={datas ? datas.nama : ""}
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
                value={datas ? datas.kelasBaru : ""}
                disabled={true}
              />
            </div>
            {datas && (
              <>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="Your Weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Label htmlFor="weight">Email</Label>
                <Input
                  id="email"
                  placeholder="Your Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={process}
                  className={buttonVariants()}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  )
}
