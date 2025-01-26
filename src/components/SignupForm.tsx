"use client"

import { useUser } from '@/app/lib/context/user'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">)   
{
  const {register } = useUser();



  async function handleSignup(formData : FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    await register(email, password, name)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSignup}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Sally Johnson"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                id="password" 
                name="password"
                type="password" 
                required />
              </div>
              <Button type="submit" className="w-full">
                Signup
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
             Already have an account?{" "}
              <a href="#" className="underline underline-offset-4">
               Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
