import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateRecord } from '@/lib/storage'
import { DATA_FILES } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session-token')?.value
    
    if (sessionToken) {
      // Oturumu pasif yap
      await updateRecord(DATA_FILES.SESSIONS, sessionToken, { active: false })
    }

    // Cookie'yi temizle
    cookies().delete('session-token')
    
    return NextResponse.json({
      success: true,
      message: 'Başarıyla çıkış yapıldı'
    })

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}