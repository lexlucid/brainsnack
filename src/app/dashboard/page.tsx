'use client'

import { useEffect } from "react"
import { Dashboard } from "@/components/Dashboard"
import { UserProvider } from "../lib/context/user"

export default function DashboardPage() {
  return (
    <Dashboard />
  )
}

