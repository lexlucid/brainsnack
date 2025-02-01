"use client"
import { useEffect, useState } from 'react'
import { useUser } from './lib/context/user'
import { useRouter } from 'next/navigation'
import DashboardPage from './dashboard/page'
import LoginPage from './login/page'
import { Spinner } from '@/components/ui/spinner'

export default function Home() {
    const { current } = useUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!current) {
            router.push('/login')
        } else {
            router.push('/dashboard')
        }
    })

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" className="bg-black dark:bg-white" />
            </div>
        )
    }

  return (
    <div>
        {current ? <DashboardPage /> : <LoginPage />}
    </div>
  )
}