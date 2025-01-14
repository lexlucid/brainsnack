'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "./Sidebar"
import Header from "./Header"

// Mock data for co-working sessions
const sessions = [
  { id: 1, title: "Morning Productivity", startTime: "2023-09-27T09:00:00", endTime: "2023-09-27T11:00:00", attendees: 5 },
  { id: 2, title: "Lunch & Learn: React Hooks", startTime: "2023-09-27T12:00:00", endTime: "2023-09-27T13:00:00", attendees: 10 },
  { id: 3, title: "Afternoon Focus Session", startTime: "2023-09-27T14:00:00", endTime: "2023-09-27T16:00:00", attendees: 7 },
  { id: 4, title: "Evening Networking", startTime: "2023-09-27T18:00:00", endTime: "2023-09-27T19:30:00", attendees: 15 },
]

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Schedule */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{session.title}</CardTitle>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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