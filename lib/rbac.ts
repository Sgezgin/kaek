import { UserRole } from './schemas';

// Rol hiyerarşisi ve izinler
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 5,
  BASKAN: 4,
  OFIS: 3,
  UYE: 2,
  BASVURAN: 1
};

// Sayfa erişim izinleri
export const PAGE_PERMISSIONS: Record<string, UserRole[]> = {
  // Genel
  '/dashboard': ['ADMIN', 'BASKAN', 'OFIS', 'UYE', 'BASVURAN'],
  
  // Başvuran alanı
  '/basvuran': ['BASVURAN'],
  '/basvuran/duyurular': ['BASVURAN'],
  '/basvuran/profil': ['BASVURAN'],
  '/basvuran/basvurular': ['BASVURAN'],
  '/basvuran/basvurular/yeni': ['BASVURAN'],
  
  // Ofis alanı
  '/ofis': ['ADMIN', 'OFIS'],
  '/ofis/duyurular': ['ADMIN', 'OFIS'],
  '/ofis/parametreler': ['ADMIN', 'OFIS'],
  '/ofis/belge-tanimlari': ['ADMIN', 'OFIS'],
  '/ofis/basvurular': ['ADMIN', 'OFIS'],
  '/ofis/gundemler': ['ADMIN', 'OFIS'],
  '/ofis/atamalar': ['ADMIN', 'OFIS'],
  '/ofis/kosullu-uygun': ['ADMIN', 'OFIS'],
  
  // Üye alanı
  '/uye': ['ADMIN', 'BASKAN', 'UYE'],
  '/uye/inceleme': ['ADMIN', 'BASKAN', 'UYE'],
  
  // Başkan alanı
  '/baskan': ['ADMIN', 'BASKAN'],
  '/baskan/inceleme': ['ADMIN', 'BASKAN'],
  
  // Admin alanı
  '/admin': ['ADMIN'],
  '/admin/form-tanimlari': ['ADMIN'],
  '/admin/roller': ['ADMIN']
};

// İşlem izinleri
export const ACTION_PERMISSIONS = {
  // Başvuru işlemleri
  CREATE_APPLICATION: ['BASVURAN'],
  UPDATE_APPLICATION: ['BASVURAN'], // Sadece kendi başvuruları
  DELETE_APPLICATION: ['ADMIN'], // Sadece taslak durumda
  SUBMIT_APPLICATION: ['BASVURAN'],
  
  // Ofis işlemleri
  REVIEW_APPLICATION: ['ADMIN', 'OFIS'],
  APPROVE_APPLICATION_CHECK: ['ADMIN', 'OFIS'],
  REQUEST_REVISION: ['ADMIN', 'OFIS'],
  CREATE_AGENDA: ['ADMIN', 'OFIS'],
  ASSIGN_MEMBER: ['ADMIN', 'OFIS'],
  CLOSE_AGENDA: ['ADMIN', 'OFIS'],
  
  // Üye işlemleri
  REVIEW_ASSIGNED_APPLICATION: ['ADMIN', 'BASKAN', 'UYE'],
  MAKE_DECISION: ['ADMIN', 'BASKAN', 'UYE'],
  
  // Başkan işlemleri
  FINAL_APPROVAL: ['ADMIN', 'BASKAN'],
  SIGN_DECISION: ['ADMIN', 'BASKAN'],
  
  // Form yönetimi
  CREATE_FORM: ['ADMIN'],
  UPDATE_FORM: ['ADMIN'],
  ACTIVATE_FORM: ['ADMIN'],
  ARCHIVE_FORM: ['ADMIN'],
  
  // Duyuru yönetimi
  CREATE_ANNOUNCEMENT: ['ADMIN', 'OFIS'],
  UPDATE_ANNOUNCEMENT: ['ADMIN', 'OFIS'],
  DELETE_ANNOUNCEMENT: ['ADMIN'],
  
  // Sistem yönetimi
  MANAGE_USERS: ['ADMIN'],
  MANAGE_PARAMETERS: ['ADMIN', 'OFIS'],
  VIEW_LOGS: ['ADMIN', 'OFIS'],
  EXPORT_DATA: ['ADMIN']
} as const;

/**
 * Kullanıcının belirli bir sayfaya erişim izni var mı?
 */
export const hasPageAccess = (userRole: UserRole, path: string): boolean => {
  // Exact match kontrol et
  const allowedRoles = PAGE_PERMISSIONS[path];
  if (allowedRoles) {
    return allowedRoles.includes(userRole);
  }
  
  // Partial match kontrol et (örn: /ofis/basvurular/123)
  const pathSegments = path.split('/').slice(0, -1).join('/');
  if (pathSegments && PAGE_PERMISSIONS[pathSegments]) {
    return PAGE_PERMISSIONS[pathSegments].includes(userRole);
  }
  
  // Parent path kontrol et
  const parentPath = path.split('/').slice(0, -1).join('/');
  if (parentPath && PAGE_PERMISSIONS[parentPath]) {
    return PAGE_PERMISSIONS[parentPath].includes(userRole);
  }
  
  return false;
};

/**
 * Kullanıcının belirli bir işlemi yapma izni var mı?
 */
export const hasActionPermission = (userRole: UserRole, action: keyof typeof ACTION_PERMISSIONS): boolean => {
  const allowedRoles = ACTION_PERMISSIONS[action];
  return allowedRoles.includes(userRole);
};

/**
 * Kullanıcının başka bir kullanıcının rolüne sahip olup olmadığını kontrol et
 */
export const hasRoleLevel = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

/**
 * Kullanıcının belirli bir başvuruyu görme/düzenleme izni var mı?
 */
export const canAccessApplication = (
  userRole: UserRole, 
  userId: string, 
  application: { applicantId: string; status: string }
): boolean => {
  // Admin her şeyi görebilir
  if (userRole === 'ADMIN') return true;
  
  // Ofis personeli tüm başvuruları görebilir
  if (userRole === 'OFIS') return true;
  
  // Başvuru sahibi sadece kendi başvurularını görebilir
  if (userRole === 'BASVURAN') {
    return application.applicantId === userId;
  }
  
  // Kurul üyeleri atanan başvuruları görebilir (bu kontrolü ayrıca assignment tablosundan yapmak gerekir)
  if (userRole === 'UYE' || userRole === 'BASKAN') {
    return ['IN_REVIEW', 'DECIDED'].includes(application.status);
  }
  
  return false;
};

/**
 * Menü öğelerini role göre filtrele
 */
export const getMenuItemsForRole = (userRole: UserRole) => {
  const allMenuItems = [
    {
      title: 'Ana Sayfa',
      href: '/dashboard',
      roles: ['ADMIN', 'BASKAN', 'OFIS', 'UYE', 'BASVURAN']
    },
    {
      title: 'Başvurularım',
      href: '/basvuran/basvurular',
      roles: ['BASVURAN']
    },
    {
      title: 'Yeni Başvuru',
      href: '/basvuran/basvurular/yeni',
      roles: ['BASVURAN']
    },
    {
      title: 'Duyurular',
      href: '/basvuran/duyurular',
      roles: ['BASVURAN']
    },
    {
      title: 'Profil',
      href: '/basvuran/profil',
      roles: ['BASVURAN']
    },
    {
      title: 'Başvuru Yönetimi',
      href: '/ofis/basvurular',
      roles: ['ADMIN', 'OFIS']
    },
    {
      title: 'Gündem Yönetimi',
      href: '/ofis/gundemler',
      roles: ['ADMIN', 'OFIS']
    },
    {
      title: 'Atama Yönetimi',
      href: '/ofis/atamalar',
      roles: ['ADMIN', 'OFIS']
    },
    {
      title: 'Duyuru Yönetimi',
      href: '/ofis/duyurular',
      roles: ['ADMIN', 'OFIS']
    },
    {
      title: 'İnceleme',
      href: '/uye/inceleme',
      roles: ['ADMIN', 'BASKAN', 'UYE']
    },
    {
      title: 'Başkan İnceleme',
      href: '/baskan/inceleme',
      roles: ['ADMIN', 'BASKAN']
    },
    {
      title: 'Form Tanımları',
      href: '/admin/form-tanimlari',
      roles: ['ADMIN']
    },
    {
      title: 'Sistem Parametreleri',
      href: '/ofis/parametreler',
      roles: ['ADMIN', 'OFIS']
    }
  ];
  
  return allMenuItems.filter(item => item.roles.includes(userRole));
};

/**
 * Rol etiketlerini Türkçe çevir
 */
export const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    ADMIN: 'Sistem Yöneticisi',
    BASKAN: 'Kurul Başkanı',
    OFIS: 'Ofis Personeli',
    UYE: 'Kurul Üyesi',
    BASVURAN: 'Başvuru Sahibi'
  };
  return labels[role];
};