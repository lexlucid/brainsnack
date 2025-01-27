'use client'

import { Dashboard } from "@/components/Dashboard"
import { UserProvider } from "../lib/context/user"

export default function DashboardPage() {
  return (
   <UserProvider>
    <Dashboard />
   </UserProvider>
  )
}

