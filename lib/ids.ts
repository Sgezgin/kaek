// ID üretici fonksiyonları

let applicationSequence = 1;
let generalSequence = 1;

/**
 * Başvuru numarası üretir: KA-YYYY-#####
 */
export const generateApplicationId = (): string => {
  const year = new Date().getFullYear();
  const sequence = String(applicationSequence++).padStart(5, '0');
  return `KA-${year}-${sequence}`;
};

/**
 * Genel ID üretir (UUID benzeri)
 */
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Dosya ID üretir
 */
export const generateFileId = (): string => {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Oturum ID üretir
 */
export const generateSessionId = (): string => {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Form şema slug üretir
 */
export const generateFormSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Başvuru sıra numarasını sıfırla (test için)
 */
export const resetApplicationSequence = (start: number = 1): void => {
  applicationSequence = start;
};

/**
 * Güncel sıra numarasını al
 */
export const getCurrentApplicationSequence = (): number => {
  return applicationSequence;
};

/**
 * Sıra numarasını ayarla (veritabanından yükleme için)
 */
export const setApplicationSequence = (sequence: number): void => {
  applicationSequence = Math.max(sequence, applicationSequence);
};

/**
 * Başvuru numarasından yıl ve sıra çıkar
 */
export const parseApplicationId = (applicationId: string): { year: number; sequence: number } | null => {
  const match = applicationId.match(/^KA-(\d{4})-(\d{5})$/);
  if (!match) return null;
  
  return {
    year: parseInt(match[1], 10),
    sequence: parseInt(match[2], 10)
  };
};

/**
 * Başvuru numarasının geçerli olup olmadığını kontrol et
 */
export const isValidApplicationId = (applicationId: string): boolean => {
  return parseApplicationId(applicationId) !== null;
};