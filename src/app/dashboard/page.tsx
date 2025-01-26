'use client'

import Sidebar from '@/components/Sidebar'
import Header from "@/components/Header"
import Schedule  from "@/components/Schedule"

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Schedule */}
        <Schedule />
      </div>
    </div>
  )
}

