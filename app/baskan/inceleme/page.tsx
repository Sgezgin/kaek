'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Users,
  Calendar,
  User,
  Building2,
  Tag,
  MessageSquare,
  Crown,
  CheckSquare
} from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'

interface MemberDecision {
  memberId: string
  memberName: string
  decision: 'ONAY' | 'KOSULLU_ONAY' | 'RET'
  decisionNote?: string
  decidedAt: string
}

interface Application {
  id: string
  applicationNumber: string
  title: string
  type: string
  applicantName: string
  submittedAt: string
  status: 'MEMBER_REVIEW' | 'CHAIRMAN_REVIEW' | 'DECIDED'
  memberDecisions: MemberDecision[]
  chairmanDecision?: 'ONAY' | 'KOSULLU_ONAY' | 'RET'
  chairmanNote?: string
  chairmanDecidedAt?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  deadline?: string
}

export default function BaskanIncelemePage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [decision, setDecision] = useState<'ONAY' | 'KOSULLU_ONAY' | 'RET' | ''>('')
  const [decisionNote, setDecisionNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDecisionModal, setShowDecisionModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'PENDING' | 'COMPLETED'>('PENDING')

  useEffect(() => {
    // Mock data
    setApplications([
      {
        id: 'app-1',
        applicationNumber: 'KA-2024-00001',
        title: 'Kardiyovasküler Hastalıklar Araştırması',
        type: 'KLINIK_ARASTIRMA',
        applicantName: 'Dr. Ahmet Yılmaz',
        submittedAt: '2024-08-10T09:00:00Z',
        status: 'CHAIRMAN_REVIEW',
        memberDecisions: [
          {
            memberId: 'uye-1',
            memberName: 'Dr. Elif Kaya',
            decision: 'ONAY',
            decidedAt: '2024-08-12T14:30:00Z'
          },
          {
            memberId: 'uye-2',
            memberName: 'Prof. Dr. Mehmet Özkan',
            decision: 'KOSULLU_ONAY',
            decisionNote: 'Hasta bilgilendirme formunda düzeltmeler gerekli.',
            decidedAt: '2024-08-12T16:45:00Z'
          },
          {
            memberId: 'uye-3',
            memberName: 'Doç. Dr. Zeynep Acar',
            decision: 'ONAY',
            decidedAt: '2024-08-13T10:15:00Z'
          }
        ],
        priority: 'HIGH',
        deadline: '2024-08-20T23:59:59Z'
      },
      {
        id: 'app-2',
        applicationNumber: 'KA-2024-00002',
        title: 'Onkoloji Tedavi Etkinliği Çalışması',
        type: 'ILAC_ARASTIRMASI',
        applicantName: 'Prof. Dr. Ayşe Demir',
        submittedAt: '2024-08-08T11:30:00Z',
        status: 'MEMBER_REVIEW',
        memberDecisions: [
          {
            memberId: 'uye-1',
            memberName: 'Dr. Elif Kaya',
            decision: 'ONAY',
            decidedAt: '2024-08-11T09:20:00Z'
          },
          {
            memberId: 'uye-2',
            memberName: 'Prof. Dr. Mehmet Özkan',
            decision: 'KOSULLU_ONAY',
            decisionNote: 'İstatistiksel analiz planında düzeltmeler gerekli.',
            decidedAt: '2024-08-11T15:30:00Z'
          }
          // 3. üye henüz karar vermedi
        ],
        priority: 'MEDIUM'
      },
      {
        id: 'app-3',
        applicationNumber: 'KA-2024-00003',
        title: 'Pediatrik Aşı Güvenliği Araştırması',
        type: 'KLINIK_ARASTIRMA',
        applicantName: 'Dr. Can Yılmaz',
        submittedAt: '2024-08-05T14:00:00Z',
        status: 'DECIDED',
        memberDecisions: [
          {
            memberId: 'uye-1',
            memberName: 'Dr. Elif Kaya',
            decision: 'ONAY',
            decidedAt: '2024-08-07T10:00:00Z'
          },
          {
            memberId: 'uye-2',
            memberName: 'Prof. Dr. Mehmet Özkan',
            decision: 'ONAY',
            decidedAt: '2024-08-07T14:30:00Z'
          }
        ],
        chairmanDecision: 'ONAY',
        chairmanNote: 'Tüm koşullar sağlanmış, onaylanmıştır.',
        chairmanDecidedAt: '2024-08-08T09:15:00Z',
        priority: 'LOW'
      }
    ])
  }, [])

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'PENDING') {
      return app.status === 'CHAIRMAN_REVIEW'
    } else {
      return app.status === 'DECIDED' || app.chairmanDecision
    }
  })

  const handleFinalDecision = async () => {
    if (!selectedApplication || !decision) return
    
    if ((decision === 'KOSULLU_ONAY' || decision === 'RET') && !decisionNote.trim()) {
      alert('Koşullu onay ve ret kararları için açıklama zorunludur.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update application
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id
          ? {
              ...app,
              status: 'DECIDED' as const,
              chairmanDecision: decision,
              chairmanNote: decisionNote.trim() || undefined,
              chairmanDecidedAt: new Date().toISOString()
            }
          : app
      ))
      
      setShowDecisionModal(false)
      setSelectedApplication(null)
      setDecision('')
      setDecisionNote('')
      
      alert('Nihai karar başarıyla kaydedildi.')
    } catch (error) {
      alert('Karar kaydetme sırasında hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openDecisionModal = (application: Application) => {
    setSelectedApplication(application)
    setDecision('')
    setDecisionNote('')
    setShowDecisionModal(true)
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

  const getDecisionLabel = (decision: string) => {
    const decisions: Record<string, string> = {
      'ONAY': 'Onay',
      'KOSULLU_ONAY': 'Koşullu Onay',
      'RET': 'Ret'
    }
    return decisions[decision] || decision
  }

  const getDecisionColor = (decision: string) => {
    const colors: Record<string, string> = {
      'ONAY': 'text-green-600 bg-green-50 border-green-200',
      'KOSULLU_ONAY': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'RET': 'text-red-600 bg-red-50 border-red-200'
    }
    return colors[decision] || 'text-gray-600 bg-gray-50 border-gray-200'
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

  const isAllMembersDecided = (memberDecisions: MemberDecision[]) => {
    // Bu örnekte 3 üye olduğunu varsayıyoruz
    return memberDecisions.length >= 3
  }

  const getMemberDecisionSummary = (memberDecisions: MemberDecision[]) => {
    const onay = memberDecisions.filter(d => d.decision === 'ONAY').length
    const kosulluOnay = memberDecisions.filter(d => d.decision === 'KOSULLU_ONAY').length
    const ret = memberDecisions.filter(d => d.decision === 'RET').length
    
    return { onay, kosulluOnay, ret }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-2">
          <Crown className="w-6 h-6 text-yellow-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Başkan İnceleme</h1>
        </div>
        <p className="text-gray-600">
          Kurul üyelerinin değerlendirmelerini inceleyerek nihai kararı verin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'CHAIRMAN_REVIEW').length}
              </p>
              <p className="text-gray-600">Nihai Karar Bekleyen</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'MEMBER_REVIEW').length}
              </p>
              <p className="text-gray-600">Üye İncelemesinde</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'DECIDED').length}
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
                {applications.filter(a => a.deadline && new Date(a.deadline) < new Date()).length}
              </p>
              <p className="text-gray-600">Süresi Geçen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'PENDING'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nihai Karar Bekleyen ({applications.filter(a => a.status === 'CHAIRMAN_REVIEW').length})
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'COMPLETED'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tamamlanan ({applications.filter(a => a.status === 'DECIDED').length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'PENDING' ? 'Nihai karar bekleyen başvuru yok' : 'Tamamlanan başvuru yok'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'PENDING' 
                  ? 'Şu anda nihai kararınızı bekleyen başvuru bulunmamaktadır.' 
                  : 'Henüz tamamladığınız başvuru bulunmamaktadır.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredApplications.map((application) => {
                const summary = getMemberDecisionSummary(application.memberDecisions)
                
                return (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.applicationNumber}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                            {getPriorityLabel(application.priority)}
                          </span>
                          {application.status === 'CHAIRMAN_REVIEW' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-yellow-600 bg-yellow-50">
                              <Crown className="w-3 h-3 mr-1" />
                              Nihai Karar Bekliyor
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-xl font-medium text-gray-800 mb-2">
                          {application.title}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            {getApplicationTypeLabel(application.type)}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {application.applicantName}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Başvuru: {new Date(application.submittedAt).toLocaleDateString('tr-TR')}
                          </div>
                          {application.deadline && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              Son Tarih: {new Date(application.deadline).toLocaleDateString('tr-TR')}
                            </div>
                          )}
                        </div>

                        {/* Üye Kararları Özeti */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Kurul Üyesi Kararları ({application.memberDecisions.length}/3)
                          </h5>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{summary.onay}</div>
                              <div className="text-xs text-gray-600">Onay</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">{summary.kosulluOnay}</div>
                              <div className="text-xs text-gray-600">Koşullu Onay</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{summary.ret}</div>
                              <div className="text-xs text-gray-600">Ret</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {application.memberDecisions.map((memberDecision, index) => (
                              <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${getDecisionColor(memberDecision.decision)}`}>
                                <div className="flex items-center">
                                  <CheckSquare className="w-4 h-4 mr-2" />
                                  <span className="font-medium">{memberDecision.memberName}</span>
                                  <span className="ml-2 text-sm">
                                    - {getDecisionLabel(memberDecision.decision)}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(memberDecision.decidedAt).toLocaleDateString('tr-TR')}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Üye Notları */}
                          {application.memberDecisions.some(d => d.decisionNote) && (
                            <div className="mt-4">
                              <h6 className="font-medium text-gray-800 mb-2">Üye Notları:</h6>
                              <div className="space-y-2">
                                {application.memberDecisions
                                  .filter(d => d.decisionNote)
                                  .map((memberDecision, index) => (
                                    <div key={index} className="bg-white p-3 rounded border">
                                      <div className="flex items-center mb-1">
                                        <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
                                        <span className="font-medium text-sm">{memberDecision.memberName}:</span>
                                      </div>
                                      <p className="text-sm text-gray-700 ml-5">
                                        {memberDecision.decisionNote}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Başkan Kararı (Tamamlanan başvurular için) */}
                        {application.chairmanDecision && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Crown className="w-5 h-5 text-yellow-600 mr-2" />
                                <span className="font-medium text-gray-900">Başkan Nihai Kararı:</span>
                                <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDecisionColor(application.chairmanDecision)}`}>
                                  {getDecisionLabel(application.chairmanDecision)}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(application.chairmanDecidedAt!).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                            {application.chairmanNote && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-700">
                                  <MessageSquare className="w-4 h-4 inline mr-1" />
                                  {application.chairmanNote}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Link
                          href={`/basvuran/basvurular/${application.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Görüntüle
                        </Link>
                        
                        {application.status === 'CHAIRMAN_REVIEW' && isAllMembersDecided(application.memberDecisions) && (
                          <button
                            onClick={() => openDecisionModal(application)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <Crown className="w-4 h-4 mr-1" />
                            Nihai Karar
                          </button>
                        )}

                        {application.status === 'MEMBER_REVIEW' && !isAllMembersDecided(application.memberDecisions) && (
                          <div className="text-xs text-gray-500 text-center py-2">
                            Tüm üyelerin kararı bekleniyor
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Final Decision Modal */}
      {showDecisionModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Crown className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Nihai Karar - {selectedApplication.applicationNumber}
                </h3>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">{selectedApplication.title}</h4>
                <p className="text-sm text-gray-600">
                  Başvuru Sahibi: {selectedApplication.applicantName}
                </p>
              </div>

              {/* Üye Kararları Özeti */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-3">Kurul Üyesi Kararları Özeti</h5>
                <div className="space-y-2">
                  {selectedApplication.memberDecisions.map((memberDecision, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 border rounded ${getDecisionColor(memberDecision.decision)}`}>
                      <span className="font-medium">{memberDecision.memberName}</span>
                      <span className="text-sm">{getDecisionLabel(memberDecision.decision)}</span>
                    </div>
                  ))}
                </div>
                
                {selectedApplication.memberDecisions.some(d => d.decisionNote) && (
                  <div className="mt-4">
                    <h6 className="font-medium text-gray-800 mb-2">Üye Notları:</h6>
                    {selectedApplication.memberDecisions
                      .filter(d => d.decisionNote)
                      .map((memberDecision, index) => (
                        <div key={index} className="bg-white p-2 rounded border mb-2">
                          <span className="font-medium text-sm">{memberDecision.memberName}:</span>
                          <p className="text-sm text-gray-700 mt-1">{memberDecision.decisionNote}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nihai Kararınız *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'ONAY', label: 'Onay', color: 'text-green-600' },
                      { value: 'KOSULLU_ONAY', label: 'Koşullu Onay', color: 'text-yellow-600' },
                      { value: 'RET', label: 'Ret', color: 'text-red-600' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="decision"
                          value={option.value}
                          checked={decision === option.value}
                          onChange={(e) => setDecision(e.target.value as any)}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <span className={`ml-2 text-sm font-medium ${option.color}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="chairmanNote" className="block text-sm font-medium text-gray-700 mb-2">
                    Başkan Açıklaması {(decision === 'KOSULLU_ONAY' || decision === 'RET') && '*'}
                  </label>
                  <textarea
                    id="chairmanNote"
                    rows={4}
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={
                      decision === 'KOSULLU_ONAY' 
                        ? 'Koşullu onay için gerekli koşulları belirtiniz...'
                        : decision === 'RET'
                        ? 'Ret gerekçesini belirtiniz...'
                        : 'Nihai karar açıklaması...'
                    }
                  />
                  {(decision === 'KOSULLU_ONAY' || decision === 'RET') && (
                    <p className="mt-1 text-xs text-red-600">
                      Bu karar türü için açıklama zorunludur.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDecisionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                İptal
              </button>
              <button
                onClick={handleFinalDecision}
                disabled={!decision || isSubmitting || ((decision === 'KOSULLU_ONAY' || decision === 'RET') && !decisionNote.trim())}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Nihai Kararı Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}