'use client'

import Sidebar from '@/components/Sidebar'
import Navbar from "@/components/Navbar"
import Schedule  from "@/components/Schedule"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar />

        {/* Schedule */}
        <Schedule />
      </div>
    </div>
  )
}

