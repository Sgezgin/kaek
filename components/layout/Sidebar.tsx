// components/layout/Sidebar.tsx için gerekli interface güncellemesi

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  DocumentTextIcon,
  CalendarIcon,
  UsersIcon,
  BellIcon,
  CogIcon,
  ShieldCheckIcon,
  FileTextIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'
import { User } from '@/lib/schemas'
import { getRoleLabel } from '@/lib/rbac'
import clsx from 'clsx'

interface SidebarProps {
  user?: User | null
}

// Rol bazlı menü öğeleri
const getMenuItemsForRole = (role: string) => {
  const menuItems = {
    BASVURAN: [
      { title: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
      { title: 'Başvurularım', href: '/basvuran/basvurular', icon: ClipboardDocumentListIcon },
      { title: 'Yeni Başvuru', href: '/basvuran/basvurular/yeni', icon: DocumentTextIcon },
      { title: 'Duyurular', href: '/basvuran/duyurular', icon: BellIcon },
      { title: 'Profil', href: '/basvuran/profil', icon: UsersIcon }
    ],
    OFIS: [
      { title: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
      { title: 'Başvuru Yönetimi', href: '/ofis/basvurular', icon: ClipboardDocumentListIcon },
      { title: 'Gündem Yönetimi', href: '/ofis/gundemler', icon: CalendarIcon },
      { title: 'Atama Yönetimi', href: '/ofis/atamalar', icon: UsersIcon },
      { title: 'Koşullu Uygun', href: '/ofis/kosullu-uygun', icon: ShieldCheckIcon },
      { title: 'Duyuru Yönetimi', href: '/ofis/duyurular', icon: BellIcon },
      { title: 'Belge Tanımları', href: '/ofis/belge-tanimlari', icon: FileTextIcon },
      { title: 'Parametreler', href: '/ofis/parametreler', icon: CogIcon }
    ],
    UYE: [
      { title: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
      { title: 'İnceleme', href: '/uye/inceleme', icon: ShieldCheckIcon }
    ],
    BASKAN: [
      { title: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
      { title: 'Başkan İnceleme', href: '/baskan/inceleme', icon: ShieldCheckIcon },
      { title: 'Üye İnceleme', href: '/uye/inceleme', icon: ClipboardDocumentListIcon }
    ],
    ADMIN: [
      { title: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
      { title: 'Başvuru Yönetimi', href: '/ofis/basvurular', icon: ClipboardDocumentListIcon },
      { title: 'Gündem Yönetimi', href: '/ofis/gundemler', icon: CalendarIcon },
      { title: 'Form Tanımları', href: '/admin/form-tanimlari', icon: DocumentTextIcon },
      { title: 'Roller', href: '/admin/roller', icon: UsersIcon },
      { title: 'Sistem Ayarları', href: '/ofis/parametreler', icon: CogIcon }
    ]
  }
  
  return menuItems[role as keyof typeof menuItems] || []
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Eğer user yoksa, loading veya default göster
  if (!user) {
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Etik Kurul</h1>
                <p className="text-xs text-gray-500">Ege Üniversitesi</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const menuItems = getMenuItemsForRole(user.role)

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo ve Başlık */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Etik Kurul</h1>
              <p className="text-xs text-gray-500">Ege Üniversitesi</p>
            </div>
          </div>
        </div>

        {/* Kullanıcı Bilgisi */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-medium text-sm">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{getRoleLabel(user.role)}</p>
            </div>
          </div>
        </div>

        {/* Menü Öğeleri */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sistem Sürümü: v1.0.0
          </p>
          <p className="text-xs text-gray-500">
            © 2024 Ege Üniversitesi
          </p>
        </div>
      </div>
    </div>
  )
}