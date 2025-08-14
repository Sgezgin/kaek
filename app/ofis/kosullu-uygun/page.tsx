'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  FileText,
  Eye,
  Upload,
  Download,
  Calendar,
  User,
  Building2,
  Tag,
  MessageSquare,
  RefreshCw,
  CheckSquare
} from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'

interface ConditionalApproval {
  id: string
  applicationId: string
  applicationNumber: string
  title: string
  type: string
  applicantName: string
  organiztion: string
  decisionDate: string
  conditions: string[]
  requiredDocuments: string[]
  deadline: string
  status: 'PENDING_UPDATE' | 'UPDATED' | 'UNDER_REVIEW' | 'COMPLETED'
  updates: {
    id: string
    submittedAt: string
    documents: {
      name: string
      type: string
      size: number
      uploadedAt: string
    }[]
    note: string
    reviewedBy?: string
    reviewedAt?: string
    approved?: boolean
    reviewNote?: string
  }[]
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

export default function KosulluUygunPage() {
  const [conditionalApprovals, setConditionalApprovals] = useState<ConditionalApproval[]>([])
  const [selectedApproval, setSelectedApproval] = useState<ConditionalApproval | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [reviewNote, setReviewNote] = useState('')
  const [activeTab, setActiveTab] = useState<'PENDING' | 'UPDATED' | 'COMPLETED'>('PENDING')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Mock data
    setConditionalApprovals([
      {
        id: 'ca-1',
        applicationId: 'app-1',
        applicationNumber: 'KA-2024-00001',
        title: 'Kardiyovasküler Hastalıklar Araştırması',
        type: 'KLINIK_ARASTIRMA',
        applicantName: 'Dr. Ahmet Yılmaz',
        organiztion: 'Kardiyoloji Kliniği',
        decisionDate: '2024-08-10T10:00:00Z',
        deadline: '2024-08-25T23:59:59Z',
        status: 'UPDATED',
        conditions: [
          'Hasta bilgilendirme formunda düzeltmeler yapılması',
          'İstatistiksel analiz planının detaylandırılması',
          'Etik onay belgesinin güncellenmesi'
        ],
        requiredDocuments: [
          'Düzeltilmiş hasta bilgilendirme formu',
          'Güncellenmiş istatistik analiz planı',
          'Yeni etik onay belgesi'
        ],
        updates: [
          {
            id: 'update-1',
            submittedAt: '2024-08-15T14:30:00Z',
            note: 'Tüm gerekli düzeltmeler yapılmış ve belgeler güncellenmiştir.',
            documents: [
              {
                name: 'hasta-bilgilendirme-v2.pdf',
                type: 'application/pdf',
                size: 245760,
                uploadedAt: '2024-08-15T14:25:00Z'
              },
              {
                name: 'istatistik-analiz-plani-v2.pdf',
                type: 'application/pdf',
                size: 189440,
                uploadedAt: '2024-08-15T14:27:00Z'
              }
            ]
          }
        ],
        priority: 'HIGH'
      },
      {
        id: 'ca-2',
        applicationId: 'app-2',
        applicationNumber: 'KA-2024-00002',
        title: 'Onkoloji Tedavi Etkinliği Çalışması',
        type: 'ILAC_ARASTIRMASI',
        applicantName: 'Prof. Dr. Elif Kaya',
        organiztion: 'Onkoloji Kliniği',
        decisionDate: '2024-08-08T15:20:00Z',
        deadline: '2024-08-23T23:59:59Z',
        status: 'PENDING_UPDATE',
        conditions: [
          'Biyogüvenlik komitesi onayının alınması',
          'Hasta takip protokolünün detaylandırılması'
        ],
        requiredDocuments: [
          'Biyogüvenlik komitesi onay belgesi',
          'Detaylı hasta takip protokolü'
        ],
        updates: [],
        priority: 'MEDIUM'
      },
      {
        id: 'ca-3',
        applicationId: 'app-3',
        applicationNumber: 'KA-2024-00003',
        title: 'Pediatrik Aşı Güvenliği Araştırması',
        type: 'KLINIK_ARASTIRMA',
        applicantName: 'Dr. Can Yılmaz',
        organiztion: 'Çocuk Sağlığı ve Hastalıkları',
        decisionDate: '2024-08-05T11:00:00Z',
        deadline: '2024-08-20T23:59:59Z',
        status: 'COMPLETED',
        conditions: [
          'Pediatrik hasta grubu için özel bilgilendirme formunun hazırlanması'
        ],
        requiredDocuments: [
          'Pediatrik bilgilendirme formu'
        ],
        updates: [
          {
            id: 'update-1',
            submittedAt: '2024-08-12T09:30:00Z',
            note: 'Pediatrik yaş grubu için özel hazırlanmış bilgilendirme formu eklendi.',
            documents: [
              {
                name: 'pediatrik-bilgilendirme.pdf',
                type: 'application/pdf',
                size: 156880,
                uploadedAt: '2024-08-12T09:28:00Z'
              }
            ],
            reviewedBy: 'Dr. Sekreter',
            reviewedAt: '2024-08-13T10:15:00Z',
            approved: true,
            reviewNote: 'Tüm koşullar yerine getirilmiş, başvuru onaylanmıştır.'
          }
        ],
        priority: 'LOW'
      },
      {
        id: 'ca-4',
        applicationId: 'app-4',
        applicationNumber: 'KA-2024-00004',
        title: 'Tıbbi Cihaz Güvenlik Değerlendirmesi',
        type: 'TIBBI_CIHAZ',
        applicantName: 'Doç. Dr. Mehmet Özkan',
        organiztion: 'Biyomedikal Mühendisliği',
        decisionDate: '2024-08-12T09:00:00Z',
        deadline: '2024-08-27T23:59:59Z',
        status: 'UPDATED',
        conditions: [
          'CE işareti belgesinin sunulması',
          'Cihaz kullanım kılavuzunun eklenmesi',
          'Risk analizi raporunun detaylandırılması'
        ],
        requiredDocuments: [
          'CE işareti belgesi',
          'Cihaz kullanım kılavuzu (Türkçe)',
          'Detaylı risk analizi raporu'
        ],
        updates: [
          {
            id: 'update-2',
            submittedAt: '2024-08-16T11:45:00Z',
            note: 'CE belgesi ve kullanım kılavuzu eklendi. Risk analizi raporu güncellenmiştir.',
            documents: [
              {
                name: 'ce-belgesi.pdf',
                type: 'application/pdf',
                size: 1234567,
                uploadedAt: '2024-08-16T11:40:00Z'
              },
              {
                name: 'kullanim-kilavuzu-tr.pdf',
                type: 'application/pdf',
                size: 3456789,
                uploadedAt: '2024-08-16T11:42:00Z'
              },
              {
                name: 'risk-analizi-v2.pdf',
                type: 'application/pdf',
                size: 987654,
                uploadedAt: '2024-08-16T11:44:00Z'
              }
            ]
          }
        ],
        priority: 'MEDIUM'
      },
      {
        id: 'ca-5',
        applicationId: 'app-5',
        applicationNumber: 'KA-2024-00005',
        title: 'Biyoyararlanım Çalışması - Antihipertansif İlaç',
        type: 'BY_BE',
        applicantName: 'Prof. Dr. Ali Demir',
        organiztion: 'Eczacılık Fakültesi',
        decisionDate: '2024-07-30T14:20:00Z',
        deadline: '2024-08-15T23:59:59Z',
        status: 'COMPLETED',
        conditions: [
          'Analitik metodun validasyonunun tamamlanması',
          'Referans ürün temin belgesinin sunulması'
        ],
        requiredDocuments: [
          'Metod validasyon raporu',
          'Referans ürün temin belgesi'
        ],
        updates: [
          {
            id: 'update-3',
            submittedAt: '2024-08-10T16:20:00Z',
            note: 'Metod validasyonu tamamlandı ve referans ürün temin edildi.',
            documents: [
              {
                name: 'metod-validasyon-raporu.pdf',
                type: 'application/pdf',
                size: 2345678,
                uploadedAt: '2024-08-10T16:15:00Z'
              },
              {
                name: 'referans-urun-temin.pdf',
                type: 'application/pdf',
                size: 567890,
                uploadedAt: '2024-08-10T16:18:00Z'
              }
            ],
            reviewedBy: 'Eczacı Dr. Ayşe Güven',
            reviewedAt: '2024-08-11T09:30:00Z',
            approved: true,
            reviewNote: 'Tüm koşullar eksiksiz yerine getirilmiş, çalışma onaylanmıştır.'
          }
        ],
        priority: 'HIGH'
      }
    ])
  }, [])

  const filteredApprovals = conditionalApprovals.filter(approval => {
    const matchesSearch = approval.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = activeTab === 'PENDING' ? approval.status === 'PENDING_UPDATE' :
                      activeTab === 'UPDATED' ? approval.status === 'UPDATED' :
                      approval.status === 'COMPLETED'
    
    return matchesSearch && matchesTab
  })

  const handleReviewUpdate = async (approvalId: string, updateId: string, approved: boolean) => {
    if (!approved && !reviewNote.trim()) {
      alert('Red için açıklama zorunludur.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setConditionalApprovals(prev => prev.map(approval => 
        approval.id === approvalId
          ? {
              ...approval,
              status: approved ? 'COMPLETED' : 'PENDING_UPDATE',
              updates: approval.updates.map(update => 
                update.id === updateId
                  ? {
                      ...update,
                      reviewedBy: 'Ofis Personeli',
                      reviewedAt: new Date().toISOString(),
                      approved,
                      reviewNote: reviewNote.trim() || undefined
                    }
                  : update
              )
            }
          : approval
      ))
      
      setShowUpdateModal(false)
      setSelectedApproval(null)
      setReviewNote('')
      
      alert(approved ? 'Güncelleme onaylandı.' : 'Güncelleme reddedildi.')
    } catch (error) {
      alert('İşlem sırasında hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openUpdateModal = (approval: ConditionalApproval) => {
    setSelectedApproval(approval)
    setReviewNote('')
    setShowUpdateModal(true)
  }

  const getApplicationTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'KLINIK_ARASTIRMA': 'Klinik Araştırma',
      'ILAC_ARASTIRMASI': 'İlaç Araştırması',
      'TIBBI_CIHAZ': 'Tıbbi Cihaz',
      'ILAC_DISI': 'İlaç Dışı',
      'BY_BE': 'BY/BE',
      'DIGER': 'Diğer'
    }
    return types[type] || type
  }

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      'PENDING_UPDATE': 'Güncelleme Bekliyor',
      'UPDATED': 'Güncellenmiş',
      'UNDER_REVIEW': 'İnceleme Altında',
      'COMPLETED': 'Tamamlandı'
    }
    return statuses[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'PENDING_UPDATE': 'text-yellow-600 bg-yellow-50',
      'UPDATED': 'text-blue-600 bg-blue-50',
      'UNDER_REVIEW': 'text-purple-600 bg-purple-50',
      'COMPLETED': 'text-green-600 bg-green-50'
    }
    return colors[status] || 'text-gray-600 bg-gray-50'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'HIGH': 'text-red-600 bg-red-50',
      'MEDIUM': 'text-yellow-600 bg-yellow-50',
      'LOW': 'text-green-600 bg-green-50'
    }
    return colors[priority] || 'text-gray-600 bg-gray-50'
  }

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      'HIGH': 'Yüksek',
      'MEDIUM': 'Orta',
      'LOW': 'Düşük'
    }
    return labels[priority] || priority
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Koşullu Uygun Kayıtları</h1>
        <p className="text-gray-600">
          Koşullu uygun kararı verilmiş başvuruların güncellemelerini takip edin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {conditionalApprovals.filter(ca => ca.status === 'PENDING_UPDATE').length}
              </p>
              <p className="text-gray-600">Güncelleme Bekleyen</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <RefreshCw className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {conditionalApprovals.filter(ca => ca.status === 'UPDATED').length}
              </p>
              <p className="text-gray-600">Güncellenmiş</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {conditionalApprovals.filter(ca => ca.status === 'COMPLETED').length}
              </p>
              <p className="text-gray-600">Tamamlanan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {conditionalApprovals.filter(ca => isOverdue(ca.deadline)).length}
              </p>
              <p className="text-gray-600">Süresi Geçen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Başvuru no, başlık veya başvuran ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'PENDING'
                  ? 'text-yellow-700 bg-yellow-100'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Bekleyen ({conditionalApprovals.filter(ca => ca.status === 'PENDING_UPDATE').length})
            </button>
            <button
              onClick={() => setActiveTab('UPDATED')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'UPDATED'
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Güncellenmiş ({conditionalApprovals.filter(ca => ca.status === 'UPDATED').length})
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'COMPLETED'
                  ? 'text-green-700 bg-green-100'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Tamamlanan ({conditionalApprovals.filter(ca => ca.status === 'COMPLETED').length})
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Approvals List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {filteredApprovals.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'PENDING' ? 'Güncelleme bekleyen kayıt yok' : 
                 activeTab === 'UPDATED' ? 'Güncellenmiş kayıt yok' : 
                 'Tamamlanan kayıt yok'}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Arama kriterlerinize uygun sonuç bulunamadı.' : 'Bu kategoride henüz kayıt bulunmuyor.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {approval.applicationNumber}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                          {getStatusLabel(approval.status)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                          {getPriorityLabel(approval.priority)}
                        </span>
                        {isOverdue(approval.deadline) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-600 bg-red-50">
                            Süresi Geçmiş
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-medium text-gray-800 mb-2">
                        {approval.title}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-2" />
                          {getApplicationTypeLabel(approval.type)}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {approval.applicantName}
                        </div>
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          {approval.organiztion}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Son Tarih: {new Date(approval.deadline).toLocaleDateString('tr-TR')}
                        </div>
                      </div>

                      {/* Koşullar */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Yerine Getirilmesi Gereken Koşullar:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {approval.conditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Gerekli Belgeler */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Gerekli Belgeler:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {approval.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Güncellemeler */}
                      {approval.updates.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Upload className="w-4 h-4 mr-2" />
                            Başvuran Güncellemeleri ({approval.updates.length})
                          </h5>
                          
                          {approval.updates.map((update, index) => (
                            <div key={update.id} className="bg-white rounded border p-3 mb-3 last:mb-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Güncelleme #{index + 1}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(update.submittedAt).toLocaleDateString('tr-TR')}
                                </span>
                              </div>
                              
                              {update.note && (
                                <p className="text-sm text-gray-700 mb-2">
                                  <MessageSquare className="w-4 h-4 inline mr-1" />
                                  {update.note}
                                </p>
                              )}
                              
                              {update.documents.length > 0 && (
                                <div className="mb-2">
                                  <p className="text-xs font-medium text-gray-600 mb-1">Yüklenen Belgeler:</p>
                                  <div className="space-y-1">
                                    {update.documents.map((doc, docIndex) => (
                                      <div key={docIndex} className="flex items-center text-xs text-gray-600">
                                        <FileText className="w-3 h-3 mr-1" />
                                        {doc.name} ({formatFileSize(doc.size)})
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {update.reviewedAt && (
                                <div className={`mt-2 p-2 rounded text-xs ${
                                  update.approved 
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {update.approved ? 'Onaylandı' : 'Reddedildi'}
                                    </span>
                                    <span>
                                      {update.reviewedBy} - {new Date(update.reviewedAt).toLocaleDateString('tr-TR')}
                                    </span>
                                  </div>
                                  {update.reviewNote && (
                                    <p className="mt-1">{update.reviewNote}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Link
                        href={`/basvuran/basvurular/${approval.applicationId}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Başvuruyu Gör
                      </Link>
                      
                      {approval.status === 'UPDATED' && approval.updates.some(u => !u.reviewedAt) && (
                        <button
                          onClick={() => openUpdateModal(approval)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <CheckSquare className="w-4 h-4 mr-1" />
                          İncele
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Update Modal */}
      {showUpdateModal && selectedApproval && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Güncelleme İnceleme - {selectedApproval.applicationNumber}
              </h3>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">{selectedApproval.title}</h4>
                <p className="text-sm text-gray-600">
                  Başvuru Sahibi: {selectedApproval.applicantName}
                </p>
              </div>

              {/* Latest Update Details */}
              {selectedApproval.updates.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Son Güncelleme Detayları</h5>
                  {selectedApproval.updates.map((update, index) => (
                    !update.reviewedAt && (
                      <div key={update.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Gönderim Tarihi: {new Date(update.submittedAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        
                        {update.note && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-700">
                              <strong>Not:</strong> {update.note}
                            </p>
                          </div>
                        )}
                        
                        {update.documents.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Yüklenen Belgeler:</p>
                            <div className="space-y-2">
                              {update.documents.map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                    <span className="text-sm text-gray-700">{doc.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({formatFileSize(doc.size)})
                                    </span>
                                  </div>
                                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="reviewNote" className="block text-sm font-medium text-gray-700 mb-2">
                    İnceleme Notunuz
                  </label>
                  <textarea
                    id="reviewNote"
                    rows={4}
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Güncelleme hakkında değerlendirmenizi yazın..."
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </button>
              <button
                onClick={() => handleReviewUpdate(selectedApproval.id, selectedApproval.updates[0]?.id, false)}
                disabled={isSubmitting}
                className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'İşleniyor...' : 'Reddet'}
              </button>
              <button
                onClick={() => handleReviewUpdate(selectedApproval.id, selectedApproval.updates[0]?.id, true)}
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'İşleniyor...' : 'Onayla'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}