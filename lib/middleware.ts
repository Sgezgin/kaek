import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasPageAccess } from './lib/rbac';
import { UserRole } from './lib/schemas';

// Korumalı rotalar
const PROTECTED_ROUTES = [
  '/dashboard',
  '/basvuran',
  '/ofis', 
  '/uye',
  '/baskan',
  '/admin'
];

// Herkese açık rotalar
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/api/auth'
];

/**
 * Oturum kontrolü (mock)
 */
async function validateSession(sessionToken?: string): Promise<{ userId: string; role: UserRole } | null> {
  if (!sessionToken) return null;
  
  try {
    // Gerçek uygulamada bu JWT decode veya veritabanı sorgusu olurdu
    // Mock için basit bir kontrol yapıyoruz
    const mockSessions: Record<string, { userId: string; role: UserRole }> = {
      'admin-session': { userId: 'admin-1', role: 'ADMIN' },
      'ofis-session': { userId: 'ofis-1', role: 'OFIS' },
      'baskan-session': { userId: 'baskan-1', role: 'BASKAN' },
      'uye-session': { userId: 'uye-1', role: 'UYE' },
      'basvuran-session': { userId: 'basvuran-1', role: 'BASVURAN' }
    };
    
    return mockSessions[sessionToken] || null;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // API rotalarını middleware'den geçirme
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Statik dosyaları geçir
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/icons/')) {
    return NextResponse.next();
  }
  
  // Herkese açık rotalara erişim serbest
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }
  
  // Oturum token'ı al
  const sessionToken = request.cookies.get('session-token')?.value;
  
  // Oturum kontrolü yap
  const session = await validateSession(sessionToken);
  
  // Oturum yoksa giriş sayfasına yönlendir
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Korumalı rotalar için yetki kontrolü
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    // Sayfa erişim yetkisi kontrol et
    const hasAccess = hasPageAccess(session.role, pathname);
    
    if (!hasAccess) {
      // Yetkisiz erişim - dashboard'a yönlendir
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Başarılı - istekleri devam ettir
  const response = NextResponse.next();
  
  // Kullanıcı bilgilerini header'a ekle (opsiyonel)
  response.headers.set('x-user-id', session.userId);
  response.headers.set('x-user-role', session.role);
  
  return response;
}

export const config = {
  /*
   * Middleware'in çalışacağı rotalar
   * API rotaları ve statik dosyalar hariç tüm rotalar
   */
  matcher: [
    /*
     * Aşağıdakileri hariç tut:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};