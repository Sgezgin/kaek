'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Check, 
  X,
  Search,
  Mail,
  Building2,
  Calendar,
  Lock,
  Unlock
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'BASKAN' | 'OFIS' | 'UYE' | 'BASVURAN'
  organization: string
  createdAt: string
  active: boolean
  lastLogin?: string
}

export default function RollerPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')

  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'BASVURAN' as User['role'],
    organization: '',
    active: true
  })

  useEffect(() => {
    // Mock data - genişletilmiş kullanıcı listesi
    setUsers([
      {
        id: 'admin-1',
        email: 'admin@demo.tr',
        name: 'Sistem Yöneticisi',
        role: 'ADMIN',
        organization: 'Ege Üniversitesi',
        createdAt: '2024-01-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-14T09:00:00Z'
      },
      {
        id: 'baskan-1',
        email: 'baskan@demo.tr',
        name: 'Prof. Dr. Kurul Başkanı',
        role: 'BASKAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi',
        createdAt: '2024-01-15T00:00:00Z',
        active: true,
        lastLogin: '2024-08-13T14:30:00Z'
      },
      {
        id: 'ofis-1',
        email: 'ofis@demo.tr',
        name: 'Ofis Personeli',
        role: 'OFIS',
        organization: 'Ege Üniversitesi Etik Kurul Sekreterliği',
        createdAt: '2024-01-20T00:00:00Z',
        active: true,
        lastLogin: '2024-08-14T08:15:00Z'
      },
      {
        id: 'uye-1',
        email: 'uye@demo.tr',
        name: 'Dr. Kurul Üyesi',
        role: 'UYE',
        organization: 'Ege Üniversitesi Tıp Fakültesi',
        createdAt: '2024-02-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-12T16:45:00Z'
      },
      {
        id: 'uye-2',
        email: 'elif.kaya@ege.edu.tr',
        name: 'Prof. Dr. Elif Kaya',
        role: 'UYE',
        organization: 'Ege Üniversitesi Onkoloji ABD',
        createdAt: '2024-02-05T00:00:00Z',
        active: true,
        lastLogin: '2024-08-11T10:20:00Z'
      },
      {
        id: 'uye-3',
        email: 'mehmet.ozkan@ege.edu.tr',
        name: 'Doç. Dr. Mehmet Özkan',
        role: 'UYE',
        organization: 'Ege Üniversitesi Kardiyoloji ABD',
        createdAt: '2024-02-10T00:00:00Z',
        active: true,
        lastLogin: '2024-08-13T11:30:00Z'
      },
      {
        id: 'basvuran-1',
        email: 'basvuran@demo.tr',
        name: 'Dr. Araştırmacı',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi',
        createdAt: '2024-03-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-10T15:45:00Z'
      },
      {
        id: 'basvuran-2',
        email: 'ahmet.yilmaz@ege.edu.tr',
        name: 'Dr. Ahmet Yılmaz',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Kardiyoloji ABD',
        createdAt: '2024-03-15T00:00:00Z',
        active: true,
        lastLogin: '2024-08-09T09:30:00Z'
      },
      {
        id: 'basvuran-3',
        email: 'can.yilmaz@ege.edu.tr',
        name: 'Dr. Can Yılmaz',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Çocuk Sağlığı ABD',
        createdAt: '2024-04-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-08T13:15:00Z'
      },
      {
        id: 'basvuran-4',
        email: 'ayse.demir@ege.edu.tr',
        name: 'Prof. Dr. Ayşe Demir',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Onkoloji ABD',
        createdAt: '2024-04-15T00:00:00Z',
        active: false,
        lastLogin: '2024-07-20T10:00:00Z'
      }
    ])
  }, [])

  const roles = [
    { value: 'ADMIN', label: 'Sistem Yöneticisi', color: 'text-red-600 bg-red-50' },
    { value: 'BASKAN', label: 'Kurul Başkanı', color: 'text-purple-600 bg-purple-50' },
    { value: 'OFIS', label: 'Ofis Personeli', color: 'text-blue-600 bg-blue-50' },
    { value: 'UYE', label: 'Kurul Üyesi', color: 'text-green-600 bg-green-50' },
    { value: 'BASVURAN', label: 'Başvuru Sahibi', color: 'text-yellow-600 bg-yellow-50' }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  const handleCreateUser = () => {
    setIsCreateMode(true)
    setIsEditMode(false)
    setSelectedUser(null)
    setNewUser({
      email: '',
      name: '',
      role: 'BASVURAN',
      organization: '',
      active: true
    })
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditMode(true)
    setIsCreateMode(false)
    setNewUser({
      email: user.email,
      name: user.name,
      role: user.role,
      organization: user.organization,
      active: user.active
    })
  }

  const handleSaveUser = () => {
    if (isCreateMode) {
      const newUserData: User = {
        id: `user-${Date.now()}`,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        organization: newUser.organization,
        active: newUser.active,
        createdAt: new Date().toISOString()
      }
      setUsers(prev => [...prev, newUserData])
      alert('Kullanıcı başarıyla oluşturuldu.')
    } else if (selectedUser) {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? {
              ...user,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
              organization: newUser.organization,
              active: newUser.active
            }
          : user
      ))
      alert('Kullanıcı başarıyla güncellendi.')
    }
    
    setIsCreateMode(false)
    setIsEditMode(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(user => user.id !== userToDelete.id))
      setUserToDelete(null)
      setShowDeleteModal(false)
      alert('Kullanıcı başarıyla silindi.')
    }
  }

  const handleToggleActive = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, active: !user.active }
        : user
    ))
  }

  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || role
  }

  const getRoleColor = (role: string) => {
    return roles.find(r => r.value === role)?.color || 'text-gray-600 bg-gray-50'
  }

  const getUsersCountByRole = (role: string) => {
    return users.filter(user => user.role === role && user.active).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kullanıcı ve Rol Yönetimi</h1>
            <p className="text-gray-600">
              Sistem kullanıcılarını ve rollerini yönetin.
            </p>
          </div>
          <button
            onClick={handleCreateUser}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kullanıcı
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {roles.map((role) => (
          <div key={role.value} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Shield className={`w-6 h-6 ${role.color.split(' ')[0]}`} />
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-900">
                  {getUsersCountByRole(role.value)}
                </p>
                <p className="text-xs text-gray-600">{role.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Tüm Roller</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kullanıcı Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Kullanıcılar ({filteredUsers.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Kullanıcı bulunamadı</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedUser?.id === user.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedUser(user)
                      setIsEditMode(false)
                      setIsCreateMode(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {user.name}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.organization}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            user.active 
                              ? 'text-green-700 bg-green-100'
                              : 'text-red-700 bg-red-100'
                          }`}>
                            {user.active ? 'Aktif' : 'Pasif'}
                          </span>
                          {user.lastLogin && (
                            <span className="text-xs text-gray-500">
                              Son giriş: {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleActive(user.id)
                          }}
                          className={`p-1 rounded ${
                            user.active 
                              ? 'text-red-600 hover:text-red-700'
                              : 'text-green-600 hover:text-green-700'
                          }`}
                          title={user.active ? 'Pasif yap' : 'Aktif yap'}
                        >
                          {user.active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditUser(user)
                          }}
                          className="p-1 text-blue-600 hover:text-blue-700"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteUser(user)
                          }}
                          className="p-1 text-red-600 hover:text-red-700"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Kullanıcı Detayı / Düzenleme */}
        <div className="lg:col-span-1">
          {(isCreateMode || isEditMode) ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {isCreateMode ? 'Yeni Kullanıcı' : 'Kullanıcı Düzenle'}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setIsCreateMode(false)
                        setIsEditMode(false)
                        setSelectedUser(null)
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. Ahmet Yılmaz"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ahmet.yilmaz@ege.edu.tr"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                  </label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as User['role'] }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Kurum/Birim *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    value={newUser.organization}
                    onChange={(e) => setNewUser(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ege Üniversitesi Tıp Fakültesi"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={newUser.active}
                    onChange={(e) => setNewUser(prev => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                    Aktif kullanıcı
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveUser}
                    disabled={!newUser.name || !newUser.email || !newUser.organization}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {isCreateMode ? 'Kullanıcı Oluştur' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>
              </div>
            </div>
          ) : selectedUser ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Detayları</h2>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Ad Soyad</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedUser.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">E-posta</label>
                  <div className="flex items-center mt-1">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Rol</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(selectedUser.role)}`}>
                    {getRoleLabel(selectedUser.role)}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Kurum/Birim</label>
                  <div className="flex items-center mt-1">
                    <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">{selectedUser.organization}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Durum</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    selectedUser.active 
                      ? 'text-green-700 bg-green-100'
                      : 'text-red-700 bg-red-100'
                  }`}>
                    {selectedUser.active ? 'Aktif' : 'Pasif'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Oluşturulma Tarihi</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {new Date(selectedUser.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                {selectedUser.lastLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Son Giriş</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedUser.lastLogin).toLocaleDateString('tr-TR')} {new Date(selectedUser.lastLogin).toLocaleTimeString('tr-TR')}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => handleEditUser(selectedUser)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleToggleActive(selectedUser.id)}
                    className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm font-medium ${
                      selectedUser.active
                        ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                    }`}
                  >
                    {selectedUser.active ? 'Pasif Yap' : 'Aktif Yap'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-64">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Kullanıcı Seçin</h3>
                <p className="text-gray-600 mb-4">
                  Detaylarını görmek için sol taraftan bir kullanıcı seçin.
                </p>
                <button
                  onClick={handleCreateUser}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Yeni Kullanıcı
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Kullanıcıyı Sil
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                <strong>{userToDelete.name}</strong> kullanıcısını silmek istediğinizden emin misiniz? 
                Bu işlem geri alınamaz.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}