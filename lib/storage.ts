// Veri depolama katmanı - Node.js fs + localStorage fallback

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ARCHIVE_DIR = path.join(DATA_DIR, 'archive');
const FORM_VERSIONS_DIR = path.join(DATA_DIR, 'form-versions');

// Veri dosyaları
export const DATA_FILES = {
  USERS: 'users.json',
  SESSIONS: 'sessions.json',
  FORMS: 'forms.json',
  APPLICATIONS: 'applications.json',
  ANNOUNCEMENTS: 'announcements.json',
  AGENDAS: 'agendas.json',
  ASSIGNMENTS: 'assignments.json',
  PARAMETERS: 'parameters.json',
  DOCUMENT_TYPES: 'document-types.json',
  LOGS: 'logs.json',
  NOTIFICATIONS: 'notifications.json'
} as const;

/**
 * Veri dizinlerini oluştur
 */
export const ensureDataDirectories = async (): Promise<void> => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(ARCHIVE_DIR, { recursive: true });
    await fs.mkdir(FORM_VERSIONS_DIR, { recursive: true });
  } catch (error) {
    console.warn('Dizin oluşturma hatası:', error);
  }
};

/**
 * JSON dosyasından veri oku
 */
export const readDataFile = async <T>(filename: string): Promise<T[]> => {
  try {
    if (typeof window !== 'undefined') {
      // Browser environment - localStorage kullan
      const data = localStorage.getItem(`ege_ethics_${filename.replace('.json', '')}`);
      return data ? JSON.parse(data) : [];
    }
    
    // Server environment - fs kullan
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Dosya yoksa boş array döndür
    return [];
  }
};

/**
 * JSON dosyasına veri yaz
 */
export const writeDataFile = async <T>(filename: string, data: T[]): Promise<void> => {
  try {
    if (typeof window !== 'undefined') {
      // Browser environment - localStorage kullan
      localStorage.setItem(
        `ege_ethics_${filename.replace('.json', '')}`, 
        JSON.stringify(data, null, 2)
      );
      return;
    }
    
    // Server environment - fs kullan
    await ensureDataDirectories();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Veri yazma hatası (${filename}):`, error);
    throw error;
  }
};

/**
 * Tek bir kayıt ekle
 */
export const addRecord = async <T extends { id: string }>(
  filename: string, 
  record: T
): Promise<T> => {
  const data = await readDataFile<T>(filename);
  data.push(record);
  await writeDataFile(filename, data);
  return record;
};

/**
 * Kayıt güncelle
 */
export const updateRecord = async <T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> => {
  const data = await readDataFile<T>(filename);
  const index = data.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  data[index] = { ...data[index], ...updates };
  await writeDataFile(filename, data);
  return data[index];
};

/**
 * Kayıt sil
 */
export const deleteRecord = async <T extends { id: string }>(
  filename: string,
  id: string
): Promise<boolean> => {
  const data = await readDataFile<T>(filename);
  const index = data.findIndex(item => item.id === id);
  
  if (index === -1) return false;
  
  data.splice(index, 1);
  await writeDataFile(filename, data);
  return true;
};

/**
 * ID ile kayıt bul
 */
export const findById = async <T extends { id: string }>(
  filename: string,
  id: string
): Promise<T | null> => {
  const data = await readDataFile<T>(filename);
  return data.find(item => item.id === id) || null;
};

/**
 * Koşula göre kayıtları filtrele
 */
export const findWhere = async <T>(
  filename: string,
  predicate: (item: T) => boolean
): Promise<T[]> => {
  const data = await readDataFile<T>(filename);
  return data.filter(predicate);
};

/**
 * Kayıt sayısı
 */
export const countRecords = async (filename: string): Promise<number> => {
  const data = await readDataFile(filename);
  return data.length;
};

/**
 * Dosyayı arşivle
 */
export const archiveFile = async (filename: string): Promise<void> => {
  try {
    if (typeof window !== 'undefined') {
      // Browser environment - arşiv simulasyonu
      const data = localStorage.getItem(`ege_ethics_${filename.replace('.json', '')}`);
      if (data) {
        localStorage.setItem(
          `ege_ethics_archive_${filename.replace('.json', '')}_${Date.now()}`,
          data
        );
        localStorage.removeItem(`ege_ethics_${filename.replace('.json', '')}`);
      }
      return;
    }
    
    // Server environment
    const sourcePath = path.join(DATA_DIR, filename);
    const archivePath = path.join(ARCHIVE_DIR, `${Date.now()}_${filename}`);
    
    try {
      await fs.copyFile(sourcePath, archivePath);
      await fs.unlink(sourcePath);
    } catch (error) {
      // Dosya yoksa sessizce geç
      console.warn(`Arşivleme hatası: ${filename}`, error);
    }
  } catch (error) {
    console.error('Arşivleme hatası:', error);
  }
};

/**
 * Form versiyonu kaydet
 */
export const saveFormVersion = async (
  formId: string, 
  version: number, 
  formData: any
): Promise<void> => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `ege_ethics_form_version_${formId}_${version}`,
        JSON.stringify(formData, null, 2)
      );
      return;
    }
    
    const versionFile = `${formId}_v${version}.json`;
    const versionPath = path.join(FORM_VERSIONS_DIR, versionFile);
    await fs.writeFile(versionPath, JSON.stringify(formData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Form versiyonu kaydetme hatası:', error);
  }
};

/**
 * Form versiyonu oku
 */
export const readFormVersion = async (
  formId: string, 
  version: number
): Promise<any | null> => {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`ege_ethics_form_version_${formId}_${version}`);
      return data ? JSON.parse(data) : null;
    }
    
    const versionFile = `${formId}_v${version}.json`;
    const versionPath = path.join(FORM_VERSIONS_DIR, versionFile);
    const data = await fs.readFile(versionPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

/**
 * Demo veri oluştur ve sistem başlangıcında çalıştır
 */
export const createDemoData = async (): Promise<void> => {
  // Önce mevcut kullanıcıları kontrol et
  const existingUsers = await readDataFile(DATA_FILES.USERS);
  if (existingUsers.length > 0) {
    console.log('Demo veriler zaten mevcut, tekrar oluşturulmayacak');
    return;
  }

  console.log('Demo veriler oluşturuluyor...');

  const demoUsers = [
    {
      id: 'admin-1',
      email: 'admin@demo.tr',
      name: 'Sistem Yöneticisi',
      role: 'ADMIN',
      organization: 'Ege Üniversitesi',
      createdAt: new Date().toISOString(),
      active: true
    },
    {
      id: 'ofis-1',
      email: 'ofis@demo.tr',
      name: 'Ofis Personeli',
      role: 'OFIS',
      organization: 'Ege Üniversitesi',
      createdAt: new Date().toISOString(),
      active: true
    },
    {
      id: 'baskan-1',
      email: 'baskan@demo.tr',
      name: 'Prof. Dr. Kurul Başkanı',
      role: 'BASKAN',
      organization: 'Ege Üniversitesi',
      createdAt: new Date().toISOString(),
      active: true
    },
    {
      id: 'uye-1',
      email: 'uye@demo.tr',
      name: 'Dr. Kurul Üyesi',
      role: 'UYE',
      organization: 'Ege Üniversitesi',
      createdAt: new Date().toISOString(),
      active: true
    },
    {
      id: 'basvuran-1',
      email: 'basvuran@demo.tr',
      name: 'Dr. Araştırmacı',
      role: 'BASVURAN',
      organization: 'Ege Üniversitesi Tıp Fakültesi',
      createdAt: new Date().toISOString(),
      active: true
    }
  ];

  const demoParameters = {
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'],
    maxFileSizeMb: 10,
    kvkkText: 'Kişisel verilerinizin işlenmesi ve korunması hakkında bilgilendirme metni...',
    virtualPOS: { enabled: false },
    emailSettings: { enabled: true, fromAddress: 'etik-kurul@ege.edu.tr' },
    systemMaintenance: { enabled: false, message: '' }
  };

  const demoAnnouncements = [
    {
      id: 'ann-1',
      category: 'Genel',
      title: 'Sisteme Hoş Geldiniz',
      content: 'Ege Üniversitesi Klinik Araştırmalar Etik Kurulu sistemine hoş geldiniz.',
      audience: ['BASVURAN'],
      createdBy: 'ofis-1',
      createdAt: new Date().toISOString(),
      active: true,
      priority: 'HIGH'
    }
  ];

  // Dosyaları oluştur
  await writeDataFile(DATA_FILES.USERS, demoUsers);
  await writeDataFile(DATA_FILES.PARAMETERS, [demoParameters]);
  await writeDataFile(DATA_FILES.ANNOUNCEMENTS, demoAnnouncements);
  await writeDataFile(DATA_FILES.SESSIONS, []);
  await writeDataFile(DATA_FILES.FORMS, []);
  await writeDataFile(DATA_FILES.APPLICATIONS, []);
  await writeDataFile(DATA_FILES.AGENDAS, []);
  await writeDataFile(DATA_FILES.ASSIGNMENTS, []);
  await writeDataFile(DATA_FILES.DOCUMENT_TYPES, []);
  await writeDataFile(DATA_FILES.LOGS, []);
  await writeDataFile(DATA_FILES.NOTIFICATIONS, []);

  console.log('Demo veriler başarıyla oluşturuldu');
};

/**
 * Tüm verileri temizle (test için)
 */
export const clearAllData = async (): Promise<void> => {
  const files = Object.values(DATA_FILES);
  
  for (const file of files) {
    await writeDataFile(file, []);
  }
  
  if (typeof window !== 'undefined') {
    // Browser environment - localStorage temizle
    Object.keys(localStorage)
      .filter(key => key.startsWith('ege_ethics_'))
      .forEach(key => localStorage.removeItem(key));
  }
};

/**
 * Demo verilerin var olup olmadığını kontrol et ve yoksa oluştur
 */
export const initializeData = async (): Promise<void> => {
  try {
    await ensureDataDirectories();
    await createDemoData();
  } catch (error) {
    console.error('Veri başlatma hatası:', error);
  }
};