'use client'

import { ReactNode, useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import RoleGuard from '@/components/layout/common/RoleGuard'
import { User } from '@/lib/schemas'

interface BaskanLayoutProps {
  children: ReactNode
}

export default function BaskanLayout({ children }: BaskanLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('ege_ethics_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else {
          // Mock başkan user
          const mockUser: User = {
            id: 'baskan-1',
            email: 'baskan@demo.tr',
            name: 'Prof. Dr. Kurul Başkanı',
            role: 'BASKAN',
            organization: 'Ege Üniversitesi Tıp Fakültesi',
            createdAt: new Date().toISOString(),
            active: true
          }
          setUser(mockUser)
          localStorage.setItem('ege_ethics_user', JSON.stringify(mockUser))
        }
      } catch (error) {
        console.error('User loading error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <RoleGuard allowedRoles={['ADMIN', 'BASKAN']}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar user={user} />
        <div className="lg:pl-64">
          <Topbar user={user} />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}