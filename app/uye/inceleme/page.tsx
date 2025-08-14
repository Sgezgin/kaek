'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Download,
  Calendar,
  User,
  Building2,
  Tag,
  MessageSquare
} from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'

interface Assignment {
  id: string
  applicationId: string
  applicationNumber: string
  title: string
  type: string
  applicantName: string
  assignedAt: string
  status: 'PENDING' | 'REVIEWED' | 'DECIDED'
  decision?: 'ONAY' | 'KOSULLU_ONAY' | 'RET'
  decisionNote?: string
  decidedAt?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  deadline?: string
}

export default function UyeIncelemePage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [decision, setDecision] = useState<'ONAY' | 'KOSULLU_ONAY' | 'RET' | ''>('')
  const [decisionNote, setDecisionNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDecisionModal, setShowDecisionModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'PENDING' | 'COMPLETED'>('PENDING')

  useEffect(() => {
    // Mock data
    setAssignments([
      {
        id: 'assign-1',
        applicationId: 'app-1',
        applicationNumber: 'KA-2024-00001',
        title: 'Kardiyovasküler Hastalıklar Araştırması',
        type: 'KLINIK_ARASTIRMA',
        applicantName: 'Dr. Ahmet Yılmaz',
        assignedAt: '2024-08-10T09:00:00Z',
        status: 'PENDING',
        priority: 'HIGH',
        deadline: '2024-08-20T23:59:59Z'
      },
      {
        id: 'assign-2',
        applicationId: 'app-2',
        applicationNumber: 'KA-2024-00002',
        title: 'Onkoloji Tedavi Etkinliği Çalışması',
        type: 'ILAC_ARASTIRMASI',
        applicantName: 'Prof. Dr. Elif Kaya',
        assignedAt: '2024-08-12T14:30:00Z',
        status: 'PENDING',
        priority: 'MEDIUM',
        deadline: '2024-08-22T23:59:59Z'
      },
      {
        id: 'assign-3',
        applicationId: 'app-3',
        applicationNumber: 'KA-2024-00003',
        title: 'Nöroloji Teşhis Cihazı Değerlendirmesi',
        type: 'TIBBI_CIHAZ',
        applicantName: 'Doç. Dr. Mehmet Özkan',
        assignedAt: '2024-08-05T11:15:00Z',
        status: 'DECIDED',
        decision: 'KOSULLU_ONAY',
        decisionNote: 'Hasta bilgilendirme formunda düzeltmeler yapılması gerekmektedir.',
        decidedAt: '2024-08-08T16:20:00Z',
        priority: 'MEDIUM'
      }
    ])
  }, [])

  const filteredAssignments = assignments.filter(assignment => 
    activeTab === 'PENDING' ? assignment.status === 'PENDING' : assignment.status !== 'PENDING'
  )

  const handleDecisionSubmit = async () => {
    if (!selectedAssignment || !decision) return
    
    if ((decision === 'KOSULLU_ONAY' || decision === 'RET') && !decisionNote.trim()) {
      alert('Koşullu onay ve ret kararları için açıklama zorunludur.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update assignment
      setAssignments(prev => prev.map(assignment => 
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              status: 'DECIDED' as const,
              decision,
              decisionNote: decisionNote.trim() || undefined,
              decidedAt: new Date().toISOString()
            }
          : assignment
      ))
      
      setShowDecisionModal(false)
      setSelectedAssignment(null)
      setDecision('')
      setDecisionNote('')
      
      alert('Karar başarıyla kaydedildi.')
    } catch (error) {
      alert('Karar kaydetme sırasında hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openDecisionModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
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
      'ONAY': 'text-green-600 bg-green-50',
      'KOSULLU_ONAY': 'text-yellow-600 bg-yellow-50',
      'RET': 'text-red-600 bg-red-50'
    }
    return colors[decision] || 'text-gray-600 bg-gray-50'
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

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Başvuru İnceleme</h1>
        <p className="text-gray-600">
          Size atanan başvuruları inceleyin ve kararınızı verin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'PENDING').length}
              </p>
              <p className="text-gray-600">Bekleyen İnceleme</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'DECIDED').length}
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
                {assignments.filter(a => a.deadline && isOverdue(a.deadline)).length}
              </p>
              <p className="text-gray-600">Geciken</p>
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
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bekleyen İncelemeler ({assignments.filter(a => a.status === 'PENDING').length})
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'COMPLETED'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tamamlanan ({assignments.filter(a => a.status !== 'PENDING').length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'PENDING' ? 'Bekleyen inceleme bulunmuyor' : 'Tamamlanan inceleme bulunmuyor'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'PENDING' 
                  ? 'Size henüz atanmış başvuru bulunmamaktadır.' 
                  : 'Henüz tamamladığınız inceleme bulunmamaktadır.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {assignment.applicationNumber}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                          {getPriorityLabel(assignment.priority)}
                        </span>
                        {assignment.deadline && isOverdue(assignment.deadline) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-600 bg-red-50">
                            Süresi Geçmiş
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-medium text-gray-800 mb-2">
                        {assignment.title}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-2" />
                          {getApplicationTypeLabel(assignment.type)}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {assignment.applicantName}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Atanma: {new Date(assignment.assignedAt).toLocaleDateString('tr-TR')}
                        </div>
                        {assignment.deadline && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Son Tarih: {new Date(assignment.deadline).toLocaleDateString('tr-TR')}
                          </div>
                        )}
                      </div>

                      {assignment.status === 'DECIDED' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDecisionColor(assignment.decision!)}`}>
                              {getDecisionLabel(assignment.decision!)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(assignment.decidedAt!).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                          {assignment.decisionNote && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-700">
                                <MessageSquare className="w-4 h-4 inline mr-1" />
                                {assignment.decisionNote}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Link
                        href={`/basvuran/basvurular/${assignment.applicationId}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </Link>
                      
                      {assignment.status === 'PENDING' && (
                        <button
                          onClick={() => openDecisionModal(assignment)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Karar Ver
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

      {/* Decision Modal */}
      {showDecisionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Karar Ver - {selectedAssignment.applicationNumber}
              </h3>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedAssignment.title}</h4>
                <p className="text-sm text-gray-600">
                  Başvuru Sahibi: {selectedAssignment.applicantName}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kararınız *
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className={`ml-2 text-sm font-medium ${option.color}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="decisionNote" className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama {(decision === 'KOSULLU_ONAY' || decision === 'RET') && '*'}
                  </label>
                  <textarea
                    id="decisionNote"
                    rows={4}
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      decision === 'KOSULLU_ONAY' 
                        ? 'Koşullu onay için gerekli koşulları belirtiniz...'
                        : decision === 'RET'
                        ? 'Ret gerekçesini belirtiniz...'
                        : 'İsteğe bağlı açıklama...'
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
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </button>
              <button
                onClick={handleDecisionSubmit}
                disabled={!decision || isSubmitting || ((decision === 'KOSULLU_ONAY' || decision === 'RET') && !decisionNote.trim())}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Kararı Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}