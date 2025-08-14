'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, UserCheck, Building2, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'Giriş başarısız')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-800 opacity-50"></div>
                
    
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo ve Başlık */}
          <div className="text-center">
            <div className="mx-auto h-32 w-32 relative mb-8">
              {/* Modern Logo Container */}
              <img
                src="/logo.png" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Etik Kurul Sistemi
            </h2>
            <p className="text-lg text-blue-100 font-medium">
              Ege Üniversitesi
            </p>
            <p className="text-sm text-blue-200 mt-1">
              Klinik Araştırmalar Etik Kurulu
            </p>
          </div>

          {/* Giriş Formu */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="ornek@ege.edu.tr"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Giriş yapılıyor...
                    </div>
                  ) : (
                    'Giriş Yap'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-transparent text-blue-200 font-medium">veya</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/register"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center block backdrop-blur-sm hover:backdrop-blur-md"
                >
                  Yeni Hesap Oluştur
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Hesapları */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              Demo Hesapları
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { role: 'Admin', email: 'admin@demo.tr', password: '123456', color: 'from-red-500 to-pink-500' },
                { role: 'Ofis', email: 'ofis@demo.tr', password: '123456', color: 'from-blue-500 to-cyan-500' },
                { role: 'Başkan', email: 'baskan@demo.tr', password: '123456', color: 'from-purple-500 to-indigo-500' },
                { role: 'Üye', email: 'uye@demo.tr', password: '123456', color: 'from-green-500 to-emerald-500' },
                { role: 'Başvuran', email: 'basvuran@demo.tr', password: '123456', color: 'from-orange-500 to-yellow-500' }
              ].map((account) => (
                <button
                  key={account.role}
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  className={`p-3 rounded-lg bg-gradient-to-r ${account.color} bg-opacity-20 border border-white/10 hover:border-white/30 transition-all duration-200 text-left group hover:bg-opacity-30`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-white text-sm">{account.role}</span>
                      <p className="text-xs text-blue-100 mt-1">{account.email}</p>
                    </div>
                    <div className="text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Tıkla
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-blue-200">
            <p>© 2024 Ege Üniversitesi. Tüm hakları saklıdır.</p>
            <p className="mt-1 opacity-75">
              Bu sistem demo amaçlıdır ve gerçek veriler içermez.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}