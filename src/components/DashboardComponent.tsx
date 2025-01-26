'use client'

import Sidebar from "./Sidebar"
import Header from "./Header"
import Schedule  from "./Schedule"

export function DashboardComponent() {
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