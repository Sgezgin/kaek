'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

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
        // Başarılı giriş - cookie'ler backend tarafında set edilir
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo ve Başlık */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-full logo-gradient flex items-center justify-center mb-6">
            <div className="text-white font-bold text-2xl">e</div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Etik Kurul Sistemi
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
          </p>
        </div>

        {/* Giriş Formu */}
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresi
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input"
                  placeholder="ornek@ege.edu.tr"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="form-input pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="spinner mr-2" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full btn-secondary text-center block"
              >
                Yeni Hesap Oluştur
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Hesapları */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Demo Hesapları</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Admin:</span>
              <span className="text-gray-600">admin@demo.tr / 123456</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ofis:</span>
              <span className="text-gray-600">ofis@demo.tr / 123456</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Başkan:</span>
              <span className="text-gray-600">baskan@demo.tr / 123456</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Üye:</span>
              <span className="text-gray-600">uye@demo.tr / 123456</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Başvuran:</span>
              <span className="text-gray-600">basvuran@demo.tr / 123456</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 Ege Üniversitesi. Tüm hakları saklıdır.</p>
          <p className="mt-1">
            Bu sistem demo amaçlıdır ve gerçek veriler içermez.
          </p>
        </div>
      </div>
    </div>
  )
}