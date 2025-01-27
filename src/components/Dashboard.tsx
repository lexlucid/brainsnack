'use client'

import Sidebar from "./Sidebar"
import Header from "./Navbar"
import Schedule  from "./Schedule"

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