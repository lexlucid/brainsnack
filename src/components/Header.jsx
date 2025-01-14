import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

export default function Header () {
   return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600">Welcome, Jane Doe</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="ml-2">
              <LogOutIcon className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>
    )
}