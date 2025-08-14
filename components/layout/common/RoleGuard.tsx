'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/schemas'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string[]
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // localStorage'dan kullanıcı bilgilerini al
        const savedUser = localStorage.getItem('ege_ethics_user')
        
        if (!savedUser) {
          // Kullanıcı giriş yapmamış
          router.push('/login')
          return
        }

        const userData: User = JSON.parse(savedUser)
        setUser(userData)

        // Rol kontrolü yap
        if (allowedRoles.includes(userData.role)) {
          setHasAccess(true)
        } else {
          // Yetkisiz erişim
          setHasAccess(false)
        }
      } catch (error) {
        console.error('Role guard error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [allowedRoles, router])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yetki kontrol ediliyor...</p>
        </div>
      </div>
    )
  }

  // Access denied
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Yetkisiz Erişim</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişim yetkiniz bulunmamaktadır.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Gerekli roller: {allowedRoles.join(', ')}
            </p>
            {user && (
              <p className="text-sm text-gray-500">
                Mevcut rolünüz: {user.role}
              </p>
            )}
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Geri Dön
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Ana Sayfaya Git
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Access granted
  return <>{children}</>
}