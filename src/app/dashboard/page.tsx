'use client'

import { useEffect } from "react"
import { Dashboard } from "@/components/Dashboard"
import { UserProvider, useUser } from "../lib/context/user"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { current, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if(!isLoading && !current) {
      router.push('/login')
    }
  }, [current, isLoading, router])

  if (!current) {
    return <div>Loading...</div>
  }

  return (
    <Dashboard />
  )
}

