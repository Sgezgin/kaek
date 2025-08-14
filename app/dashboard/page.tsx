'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  UserGroupIcon,
  CalendarIcon,
  BellIcon,
  TrendingUpIcon
} from 'lucide-react'
import { User, Application, Announcement } from '@/lib/schemas'
import { getRoleLabel } from '@/lib/rbac'

interface DashboardStats {
  applications: {
    total: number
    pending: number
    approved: number
    needsRevision: number
  }
  agendas: {
    upcoming: number
    thisMonth: number
  }
  assignments: {
    pending: number
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Kullanıcı bilgilerini al
        const authResponse = await fetch('/api/auth/login')
        if (authResponse.ok) {
          const authData = await authResponse.json()
          setUser(authData.user)
        }

        // İstatistikleri yükle (mock data)
        setStats({
          applications: {
            total: 24,
            pending: 8,
            approved: 12,
            needsRevision: 4
          },
          agendas: {
            upcoming: 2,
            thisMonth: 5
          },
          assignments: {
            pending: 3
          }
        })

        // Son başvuruları yükle (mock data)
        setRecentApplications([
          {
            id: 'app-1',
            applicationNumber: 'KA-2024-00001',
            type: 'KLINIK_ARASTIRMA',
            applicantId: 'user-1',
            status: 'SUBMITTED',
            title: 'Kalp Hastalıkları Araştırması',
            createdAt: '2024-08-10T10:00:00Z',
            formSchema: 'klinik-arastirma',
            formVersion: 1,
            fields: {},
            files: [],
            kvkkApproved: true,
            revisions: [],
            history: []
          },
          {
            id: 'app-2',
            applicationNumber: 'KA-2024-00002',
            type: 'ILAC_ARASTIRMASI',
            applicantId: 'user-2',
            status: 'IN_REVIEW',
            title: 'Yeni İlaç Etkinlik Çalışması',
            createdAt: '2024-08-12T14:30:00Z',
            formSchema: 'ilac-arastirmasi',
            formVersion: 1,
            fields: {},
            files: [],
            kvkkApproved: true,
            revisions: [],
            history: []
          },
          {
            id: 'app-3',
            applicationNumber: 'KA-2024-00003',
            type: 'TIBBI_CIHAZ',
            applicantId: 'user-3',
            status: 'NEEDS_REVISION',
            title: 'Tıbbi Cihaz Güvenlik Testi',
            createdAt: '2024-08-13T09:15:00Z',
            formSchema: 'tibbi-cihaz',
            formVersion: 1,
            fields: {},
            files: [],
            kvkkApproved: true,
            revisions: [],
            history: []
          }
        ])

        // Duyuruları yükle (mock data)
        setAnnouncements([
          {
            id: 'ann-1',
            category: 'Genel',
            title: 'Sistem Güncellemesi Tamamlandı',
            content: 'Etik kurul sistemi başarıyla güncellenmiştir. Yeni özellikler ve iyileştirmeler aktif edilmiştir.',
            audience: ['BASVURAN', 'OFIS', 'UYE', 'BASKAN'],
            createdBy: 'admin-1',
            createdAt: '2024-08-14T09:00:00Z',
            active: true,
            priority: 'HIGH'
          },
          {
            id: 'ann-2',
            category: 'Toplantı',
            title: 'Ağustos Ayı Kurul Toplantısı',
            content: 'Ağustos ayı kurul toplantısı 20 Ağustos Salı günü saat 14:00\'da yapılacaktır.',
            audience: ['UYE', 'BASKAN', 'OFIS'],
            createdBy: 'ofis-1',
            createdAt: '2024-08-13T16:00:00Z',
            active: true,
            priority: 'MEDIUM'
          },
          {
            id: 'ann-3',
            category: 'Bilgilendirme',
            title: 'Yeni Form Şablonları Eklendi',
            content: 'Biyoyararlanım/Biyoeşdeğerlik araştırmaları için yeni form şablonları sisteme eklenmiştir.',
            audience: ['BASVURAN'],
            createdBy: 'ofis-1',
            createdAt: '2024-08-12T11:30:00Z',
            active: true,
            priority: 'LOW'
          }
        ])

      } catch (error) {
        console.error('Dashboard data loading error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="spinner mb-4" />
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    )
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Günaydın'
    if (hour < 18) return 'İyi günler'
    return 'İyi akşamlar'
  }

  const getQuickActions = () => {
    switch (user.role) {
      case 'BASVURAN':
        return [
          { title: 'Yeni Başvuru', href: '/basvuran/basvurular/yeni', icon: DocumentTextIcon, color: 'blue', description: 'Yeni etik kurul başvurusu oluşturun' },
          { title: 'Başvurularım', href: '/basvuran/basvurular', icon: ClockIcon, color: 'green', description: 'Mevcut başvurularınızı görüntüleyin' },
          { title: 'Duyurular', href: '/basvuran/duyurular', icon: BellIcon, color: 'purple', description: 'Önemli duyuruları takip edin' }
        ]
      case 'OFIS':
        return [
          { title: 'Başvuru Yönetimi', href: '/ofis/basvurular', icon: DocumentTextIcon, color: 'blue', description: 'Gelen başvuruları inceleyin' },
          { title: 'Gündem Oluştur', href: '/ofis/gundemler/yeni', icon: CalendarIcon, color: 'green', description: 'Kurul toplantısı gündemi hazırlayın' },
          { title: 'Üye Ataması', href: '/ofis/atamalar', icon: UserGroupIcon, color: 'purple', description: 'Başvuruları kurul üyelerine atayın' }
        ]
      case 'UYE':
      case 'BASKAN':
        return [
          { title: 'İnceleme', href: user.role === 'BASKAN' ? '/baskan/inceleme' : '/uye/inceleme', icon: CheckCircleIcon, color: 'blue', description: 'Atanan başvuruları inceleyin' },
          { title: 'Gündemler', href: '/ofis/gundemler', icon: CalendarIcon, color: 'green', description: 'Kurul gündemlerini görüntüleyin' }
        ]
      case 'ADMIN':
        return [
          { title: 'Form Tanımları', href: '/admin/form-tanimlari', icon: DocumentTextIcon, color: 'blue', description: 'Dinamik formları yönetin' },
          { title: 'Sistem Ayarları', href: '/ofis/parametreler', icon: CheckCircleIcon, color: 'green', description: 'Sistem parametrelerini ayarlayın' },
          { title: 'Kullanıcı Yönetimi', href: '/admin/roller', icon: UserGroupIcon, color: 'purple', description: 'Kullanıcı rollerini yönetin' }
        ]
      default:
        return []
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      'DRAFT': 'Taslak',
      'SUBMITTED': 'Gönderildi',
      'UNDER_CHECK': 'Kontrolde',
      'NEEDS_REVISION': 'Düzeltme Gerekli',
      'IN_REVIEW': 'İncelemede',
      'DECIDED': 'Karar Verildi',
      'CLOSED': 'Kapatıldı'
    }
    return statusLabels[status] || status
  }

  const getApplicationTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'KLINIK_ARASTIRMA': 'Klinik Araştırma',
      'ILAC_ARASTIRMASI': 'İlaç Araştırması',
      'TIBBI_CIHAZ': 'Tıbbi Cihaz',
      'ILAC_DISI': 'İlaç Dışı',
      'BY_BE': 'Biyoyararlanım/Biyoeşdeğerlik',
      'DIGER': 'Diğer'
    }
    return typeLabels[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Mesajı */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getWelcomeMessage()}, {user.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {getRoleLabel(user.role)} • {formatDate(new Date().toISOString())}
            </p>
            {user.organization && (
              <p className="text-sm text-gray-500 mt-1">{user.organization}</p>
            )}
          </div>
          <div className="h-16 w-16 rounded-full logo-gradient flex items-center justify-center">
            <div className="text-white font-bold text-xl">e</div>
          </div>
        </div>
      </div>

      {/* İstatistik Kartları */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Toplam Başvuru</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applications.total}</p>
                <p className="text-xs text-gray-600 mt-1">Bu yıl toplam</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Bekleyen</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applications.pending}</p>
                <p className="text-xs text-gray-600 mt-1">İnceleme bekliyor</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Onaylanan</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applications.approved}</p>
                <p className="text-xs text-gray-600 mt-1">Başarıyla tamamlandı</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Düzeltme Gereken</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applications.needsRevision}</p>
                <p className="text-xs text-gray-600 mt-1">Revizyon gerekli</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hızlı İşlemler ve İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hızlı İşlemler */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-3">
            {getQuickActions().map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <action.icon className={`h-5 w-5 text-${action.color}-600 mt-0.5 mr-3 group-hover:text-primary-600`} />
                <div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary-900">{action.title}</span>
                  {action.description && (
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Son Başvurular */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Son Başvurular</h2>
            <Link href="/basvuran/basvurular" className="text-sm text-primary-600 hover:text-primary-700">
              Tümünü gör
            </Link>
          </div>
          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Henüz başvuru yok</p>
            ) : (
              recentApplications.map((app) => (
                <div key={app.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{app.applicationNumber}</p>
                      <p className="text-xs text-gray-600 mt-1">{app.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getApplicationTypeLabel(app.type)} • {formatTime(app.createdAt)}
                      </p>
                    </div>
                    <span className={`status-badge status-${app.status.toLowerCase().replace('_', '-')} ml-2`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Duyurular */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Duyurular</h2>
            <Link href="/basvuran/duyurular" className="text-sm text-primary-600 hover:text-primary-700">
              Tümünü gör
            </Link>
          </div>
          <div className="space-y-3">
            {announcements.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Henüz duyuru yok</p>
            ) : (
              announcements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{announcement.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">{formatTime(announcement.createdAt)}</p>
                        <span className="text-xs text-blue-600 font-medium">{announcement.category}</span>
                      </div>
                    </div>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {announcement.priority === 'HIGH' ? 'Yüksek' : 
                       announcement.priority === 'MEDIUM' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Rol Bazlı Ek Bilgiler */}
      {user.role === 'BASVURAN' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Başvuru Süreci Hakkında</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">1. Başvuru Oluştur</h3>
              <p className="text-sm text-gray-600">Araştırma türünüze uygun formu doldurun ve gerekli belgeleri yükleyin</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">2. İnceleme Süreci</h3>
              <p className="text-sm text-gray-600">Başvurunuz ofis tarafından kontrol edilir ve kurul üyelerine atanır</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">3. Karar</h3>
              <p className="text-sm text-gray-600">Kurul kararı size e-posta ve sistem üzerinden bildirilir</p>
            </div>
          </div>
        </div>
      )}

      {(user.role === 'OFIS' || user.role === 'ADMIN') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sistem Durumu */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Aktif Kullanıcılar</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bu Ay Başvuru</span>
                <span className="text-sm font-medium text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bekleyen İncelemeler</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bu Ay Toplantı</span>
                <span className="text-sm font-medium text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sistem Durumu</span>
                <span className="inline-flex items-center text-sm font-medium text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Çevrimiçi
                </span>
              </div>
            </div>
          </div>

          {/* Son Etkinlikler */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Etkinlikler</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Yeni başvuru alındı</p>
                  <p className="text-xs text-gray-500">KA-2024-00003 • 2 saat önce</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Gündem kapatıldı</p>
                  <p className="text-xs text-gray-500">Ağustos 2024 Gündemi • 1 gün önce</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Üye ataması yapıldı</p>
                  <p className="text-xs text-gray-500">3 başvuru atandı • 2 gün önce</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Yeni duyuru yayınlandı</p>
                  <p className="text-xs text-gray-500">Sistem güncellemesi • 3 gün önce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(user.role === 'UYE' || user.role === 'BASKAN') && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bekleyen İncelemelerim</h2>
          {stats && stats.assignments.pending > 0 ? (
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stats.assignments.pending} başvuru incelemenizi bekliyor
                  </p>
                  <p className="text-xs text-gray-600">Lütfen en kısa sürede değerlendirin</p>
                </div>
              </div>
              <Link 
                href={user.role === 'BASKAN' ? '/baskan/inceleme' : '/uye/inceleme'}
                className="btn-primary"
              >
                İncele
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Şu anda bekleyen incelemeniz yok</p>
              <p className="text-xs text-gray-400 mt-1">Yeni atamalar yapıldığında bilgilendirileceksiniz</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}