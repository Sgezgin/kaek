import { redirect } from 'next/navigation'

// Ana sayfa - kullanıcıları giriş sayfasına yönlendir
export default function HomePage() {
  redirect('/login')
}