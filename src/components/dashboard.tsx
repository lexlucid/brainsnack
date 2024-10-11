'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, HomeIcon, UsersIcon, SettingsIcon, LogOutIcon } from "lucide-react"

// Mock data for co-working sessions
const sessions = [
  { id: 1, title: "Morning Productivity", startTime: "2023-09-27T09:00:00", endTime: "2023-09-27T11:00:00", attendees: 5 },
  { id: 2, title: "Lunch & Learn: React Hooks", startTime: "2023-09-27T12:00:00", endTime: "2023-09-27T13:00:00", attendees: 10 },
  { id: 3, title: "Afternoon Focus Session", startTime: "2023-09-27T14:00:00", endTime: "2023-09-27T16:00:00", attendees: 7 },
  { id: 4, title: "Evening Networking", startTime: "2023-09-27T18:00:00", endTime: "2023-09-27T19:30:00", attendees: 15 },
]

export function DashboardComponent() {
  const [activeSession, setActiveSession] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000) // Update every 30 seconds
    return () => clearInterval(timer)
  }, [])

  const joinSession = (sessionId) => {
    setActiveSession(sessionId)
    // Here you would typically implement the logic to actually join the session
  }

  const scheduleSession = (sessionId) => {
    // Here you would implement the logic to add the session to the user's calendar
    console.log(`Scheduling session ${sessionId}`)
  }

  const isWithinJoinWindow = (startTime) => {
    const start = new Date(startTime)
    const diffMinutes = (currentTime - start) / 60000
    return Math.abs(diffMinutes) <= 5
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Brainsnack</h1>
        </div>
        <nav className="mt-6">
          {[
            { icon: HomeIcon, label: "Dashboard" },
            { icon: CalendarIcon, label: "Schedule" },
            { icon: UsersIcon, label: "Members" },
            { icon: SettingsIcon, label: "Settings" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Schedule */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{session.title}</CardTitle>
                  {isWithinJoinWindow(session.startTime) ? (
                    <Button
                      size="sm"
                      onClick={() => joinSession(session.id)}
                      disabled={activeSession === session.id}
                    >
                      {activeSession === session.id ? 'Joined' : 'Join'}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => scheduleSession(session.id)}
                    >
                      Schedule
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    {formatTime(session.startTime)} - {formatTime(session.endTime)}
                  </div>
                  <div className="text-sm text-gray-500">{session.attendees} attendees</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}