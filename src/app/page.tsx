"use client"
import { useEffect, useState } from 'react'
import { useUser } from './lib/context/user'
import { useRouter } from 'next/navigation'
import DashboardPage from './dashboard/page'
import LoginPage from './login/page'

export default function Home() {
    const { current } = useUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            if (!current) {
                router.push('/login')
            } else {
                router.push('/dashboard')
            }
        } catch {
            router.push('/login')
        } finally {
            setIsLoading(false)
        }
    }, [current, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
        {current ? <DashboardPage /> : <LoginPage />}
    </div>
  )
}