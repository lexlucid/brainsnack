import { useUser } from "@/app/lib/context/user"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { userInfo } from "os"
import Link from 'next/link'

export default function Header () {
  const { current, logout } = useUser()


   return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600">Welcome, {current?.name}!</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={`Avatar image for ${current?.name}`} />  
              <AvatarFallback>{current?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="ml-2" onClick={logout}>
              <LogOutIcon className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>
    )
}