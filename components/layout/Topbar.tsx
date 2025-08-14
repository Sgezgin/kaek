'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BellIcon, 
  UserIcon, 
  LogOutIcon, 
  SettingsIcon,
  ChevronDownIcon
} from 'lucide-react'
import { User } from '@/lib/schemas'
import { getRoleLabel } from '@/lib/rbac'
import clsx from 'clsx'

interface TopbarProps {
  user?: User | null
  notifications?: Array<{
    id: string
    title: string
    message: string
    read: boolean
    createdAt: string
  }>
}

export default function Topbar({ user, notifications = [] }: TopbarProps) {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isLoading, setIsLoading] = useState(!user)
  const [currentUser, setCurrentUser] = useState<User | null>(user || null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Mock user data yükleme (eğer user prop'u yoksa)
  useEffect(() => {
    if (!user) {
      const loadUserData = async () => {
        try {
          // Gerçek uygulamada auth context'ten gelecek
          // Şimdilik localStorage'dan kontrol edelim
          const savedUser = localStorage.getItem('ege_ethics_user')
          if (savedUser) {
            setCurrentUser(JSON.parse(savedUser))
          } else {
            // Mock user data
            const mockUser: User = {
              id: 'user-1',
              email: 'admin@demo.tr',
              name: 'Sistem Yöneticisi',
              role: 'ADMIN',
              organization: 'Ege Üniversitesi',
              createdAt: new Date().toISOString(),
              active: true
            }
            setCurrentUser(mockUser)
            localStorage.setItem('ege_ethics_user', JSON.stringify(mockUser))
          }
        } catch (error) {
          console.error('User loading error:', error)
        } finally {
          setIsLoading(false)
        }
      }

      loadUserData()
    } else {
      setCurrentUser(user)
      setIsLoading(false)
    }
  }, [user])

  const unreadCount = notifications.filter(n => !n.read).length

  // Dışarı tıklanınca menüleri kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('ege_ethics_user')
      setCurrentUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // API hatası olsa bile logout yap
      localStorage.removeItem('ege_ethics_user')
      setCurrentUser(null)
      router.push('/login')
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Az önce'
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`
    return `${Math.floor(diffInMinutes / 1440)} gün önce`
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  // User not found state
  if (!currentUser) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Etik Kurul Sistemi
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Sol taraf - Breadcrumb veya sayfa başlığı buraya eklenebilir */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            {/* Bu dinamik olarak sayfa başlığı olabilir */}
          </h1>
        </div>

        {/* Sağ taraf - Bildirimler ve Kullanıcı Menüsü */}
        <div className="flex items-center space-x-4">
          {/* Bildirimler */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <BellIcon className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Bildirim Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Bildirimler</h3>
                    {unreadCount > 0 && (
                      <p className="text-xs text-gray-500">{unreadCount} okunmamış bildirim</p>
                    )}
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        Henüz bildirim yok
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={clsx(
                            'px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0',
                            !notification.read && 'bg-blue-50'
                          )}
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Tümünü gör
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Kullanıcı Menüsü */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-primary-600" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.name || 'Kullanıcı'}
                </p>
                <p className="text-xs text-gray-500">
                  {currentUser?.role ? getRoleLabel(currentUser.role) : 'Rol'}
                </p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>

            {/* Kullanıcı Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.name || 'Kullanıcı'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentUser?.email || ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentUser?.role ? getRoleLabel(currentUser.role) : ''}
                    </p>
                  </div>
                  
                  {currentUser?.role === 'BASVURAN' && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        router.push('/basvuran/profil')
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserIcon className="h-4 w-4 mr-3" />
                      Profil
                    </button>
                  )}
                  
                  {(currentUser?.role === 'ADMIN' || currentUser?.role === 'OFIS') && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        router.push('/ofis/parametreler')
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SettingsIcon className="h-4 w-4 mr-3" />
                      Ayarlar
                    </button>
                  )}
                  
                  <div className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOutIcon className="h-4 w-4 mr-3" />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}