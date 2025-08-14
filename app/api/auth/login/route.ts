import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { readDataFile, addRecord, initializeData } from '@/lib/storage'
import { DATA_FILES } from '@/lib/storage'
import { User, Session } from '@/lib/schemas'
import { generateSessionId } from '@/lib/ids'

// Demo şifreler - gerçek uygulamada hash'lenmiş olmalı
const DEMO_PASSWORDS: Record<string, string> = {
  'admin@demo.tr': '123456',
  'ofis@demo.tr': '123456',
  'baskan@demo.tr': '123456',
  'uye@demo.tr': '123456',
  'basvuran@demo.tr': '123456'
}

export async function POST(request: NextRequest) {
  try {
    // Demo verilerin var olduğundan emin ol
    await initializeData();

    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre gereklidir' },
        { status: 400 }
      )
    }

    // Kullanıcıyı bul
    const users = await readDataFile<User>(DATA_FILES.USERS)
    console.log('Mevcut kullanıcılar:', users.map(u => ({ email: u.email, role: u.role })));
    console.log('Giriş denemesi:', email);
    
    const user = users.find(u => u.email === email && u.active)
    
    if (!user) {
      console.log('Kullanıcı bulunamadı:', email);
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı veya hesap aktif değil' },
        { status: 401 }
      )
    }

    // Şifre kontrolü (demo için basit kontrol)
    const correctPassword = DEMO_PASSWORDS[email]
    if (!correctPassword || password !== correctPassword) {
      console.log('Geçersiz şifre:', email, password);
      return NextResponse.json(
        { error: 'Geçersiz şifre' },
        { status: 401 }
      )
    }

    // Oturum oluştur
    const sessionId = generateSessionId()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 saat

    const session: Session = {
      id: sessionId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      active: true
    }

    await addRecord(DATA_FILES.SESSIONS, session)

    // Cookie ayarla
    const cookieStore = await cookies()
    cookieStore.set('session-token', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt
    })

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { ...userWithoutPassword } = user
    
    console.log('Başarılı giriş:', user.email, user.role);
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      session: {
        id: sessionId,
        expiresAt: expiresAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

// Mevcut oturumu kontrol et
export async function GET(request: NextRequest) {
  try {
    // Demo verilerin var olduğundan emin ol
    await initializeData();

    const sessionToken = request.cookies.get('session-token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      )
    }

    // Oturumu kontrol et
    const sessions = await readDataFile<Session>(DATA_FILES.SESSIONS)
    const session = sessions.find(s => s.id === sessionToken && s.active)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Geçersiz oturum' },
        { status: 401 }
      )
    }

    // Oturum süresi kontrol et
    if (new Date() > new Date(session.expiresAt)) {
      return NextResponse.json(
        { error: 'Oturum süresi dolmuş' },
        { status: 401 }
      )
    }

    // Kullanıcı bilgilerini getir
    const users = await readDataFile<User>(DATA_FILES.USERS)
    const user = users.find(u => u.id === session.userId && u.active)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user,
      session: {
        id: sessionToken,
        expiresAt: session.expiresAt
      }
    })

  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}