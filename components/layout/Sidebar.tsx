'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  BellIcon, 
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  CalendarIcon,
  UserIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon
} from 'lucide-react'
import { UserRole } from '@/lib/schemas'
import { getMenuItemsForRole } from '@/lib/rbac'
import clsx from 'clsx'

interface SidebarProps {
  userRole: UserRole
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

// İkon haritası
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  document: DocumentTextIcon,
  users: UserGroupIcon,
  bell: BellIcon,
  cog: CogIcon,
  file: FileTextIcon,
  calendar: CalendarIcon,
  user: UserIcon,
  shield: ShieldCheckIcon,
  clipboard: ClipboardDocumentListIcon
}

// Menü öğeleri tanımı
const getMenuItems = (userRole: UserRole) => {
  const baseItems = [
    {
      title: 'Ana Sayfa',
      href: '/dashboard',
      icon: 'home',
      roles: ['ADMIN', 'BASKAN', 'OFIS', 'UYE', 'BASVURAN']
    }
  ]

  const roleSpecificItems: Record<UserRole, Array<{
    title: string
    href: string
    icon: string
    badge?: string
    children?: Array<{ title: string; href: string }>
  }>> = {
    BASVURAN: [
      {
        title: 'Başvurularım',
        href: '/basvuran/basvurular',
        icon: 'clipboard'
      },
      {
        title: 'Yeni Başvuru',
        href: '/basvuran/basvurular/yeni',
        icon: 'document'
      },
      {
        title: 'Duyurular',
        href: '/basvuran/duyurular',
        icon: 'bell'
      },
      {
        title: 'Profil',
        href: '/basvuran/profil',
        icon: 'user'
      }
    ],
    OFIS: [
      {
        title: 'Başvuru Yönetimi',
        href: '/ofis/basvurular',
        icon: 'clipboard'
      },
      {
        title: 'Gündem Yönetimi',
        href: '/ofis/gundemler',
        icon: 'calendar'
      },
      {
        title: 'Atama Yönetimi',
        href: '/ofis/atamalar',
        icon: 'users'
      },
      {
        title: 'Koşullu Uygun',
        href: '/ofis/kosullu-uygun',
        icon: 'shield'
      },
      {
        title: 'Duyuru Yönetimi',
        href: '/ofis/duyurular',
        icon: 'bell'
      },
      {
        title: 'Belge Tanımları',
        href: '/ofis/belge-tanimlari',
        icon: 'file'
      },
      {
        title: 'Parametreler',
        href: '/ofis/parametreler',
        icon: 'cog'
      }
    ],
    UYE: [
      {
        title: 'İnceleme',
        href: '/uye/inceleme',
        icon: 'shield'
      }
    ],
    BASKAN: [
      {
        title: 'Başkan İnceleme',
        href: '/baskan/inceleme',
        icon: 'shield'
      },
      {
        title: 'Üye İnceleme',
        href: '/uye/inceleme',
        icon: 'clipboard'
      }
    ],
    ADMIN: [
      {
        title: 'Başvuru Yönetimi',
        href: '/ofis/basvurular',
        icon: 'clipboard'
      },
      {
        title: 'Gündem Yönetimi',
        href: '/ofis/gundemler',
        icon: 'calendar'
      },
      {
        title: 'Form Tanımları',
        href: '/admin/form-tanimlari',
        icon: 'document'
      },
      {
        title: 'Roller',
        href: '/admin/roller',
        icon: 'users'
      },
      {
        title: 'Sistem Ayarları',
        href: '/ofis/parametreler',
        icon: 'cog'
      }
    ]
  }

  return [
    ...baseItems.filter(item => item.roles.includes(userRole)),
    ...roleSpecificItems[userRole] || []
  ]
}

export default function Sidebar({ userRole, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const menuItems = getMenuItems(userRole)

  return (
    <div className={clsx(
      'bg-white shadow-sm border-r border-gray-200 flex flex-col transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo ve Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full logo-gradient flex items-center justify-center">
              <div className="text-white font-bold text-sm">e</div>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Etik Kurul</h1>
              <p className="text-xs text-gray-500">Ege Üniversitesi</p>
            </div>
          </div>
        )}
        
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Navigasyon Menüsü */}
      <nav className="flex-1 p-4 space-y-1 custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon] || DocumentTextIcon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'nav-link',
                isActive && 'nav-link-active',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <IconComponent className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="truncate">{item.title}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="ml-auto bg-primary-100 text-primary-600 text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Alt Bilgi */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Sistem Sürümü: v1.0.0</p>
            <p className="mt-1">© 2024 Ege Üniversitesi</p>
          </div>
        </div>
      )}
    </div>
  )
}