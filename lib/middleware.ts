import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasPageAccess } from '@/lib/rbac';
import { UserRole } from '@/lib/schemas';
import { readDataFile, initializeData } from '@/lib/storage';
import { DATA_FILES } from '@/lib/storage';

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
 * Oturum kontrolü
 */
async function validateSession(sessionToken?: string): Promise<{ userId: string; role: UserRole } | null> {
  if (!sessionToken) return null;
  
  try {
    // Demo verilerin mevcut olduğundan emin ol
    await initializeData();
    
    // Oturumları kontrol et
    const sessions = await readDataFile(DATA_FILES.SESSIONS);
    const session = sessions.find((s: any) => s.id === sessionToken && s.active);
    
    if (!session) return null;
    
    // Oturum süresi kontrolü
    if (new Date() > new Date(session.expiresAt)) {
      return null;
    }
    
    // Kullanıcı bilgilerini getir
    const users = await readDataFile(DATA_FILES.USERS);
    const user = users.find((u: any) => u.id === session.userId && u.active);
    
    if (!user) return null;
    
    return {
      userId: user.id,
      role: user.role
    };
  } catch (error) {
    console.error('Session validation error:', error);
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