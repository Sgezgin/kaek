// Mock e-posta servisi - gerçek gönderim yapmaz, sadece loglama ve bildirim geçmişi

import { generateId } from './ids';
import { addRecord } from './storage';
import { DATA_FILES } from './storage';
import { Notification } from './schemas';

export interface EmailTemplate {
  subject: string;
  body: string;
}

// E-posta şablonları
export const EMAIL_TEMPLATES = {
  APPLICATION_SUBMITTED: {
    subject: 'Başvurunuz Alındı - {{applicationNumber}}',
    body: `
Sayın {{applicantName}},

{{applicationNumber}} numaralı başvurunuz {{submittedDate}} tarihinde sistemimize başarıyla kaydedilmiştir.

Başvuru Detayları:
- Başvuru No: {{applicationNumber}}
- Başvuru Türü: {{applicationType}}
- Gönderim Tarihi: {{submittedDate}}

Başvurunuz değerlendirme sürecine alınacak olup, gelişmeler hakkında bilgilendirileceksiniz.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  },
  
  APPLICATION_APPROVED_FOR_REVIEW: {
    subject: 'Başvurunuz Değerlendirme Sürecine Alındı - {{applicationNumber}}',
    body: `
Sayın {{applicantName}},

{{applicationNumber}} numaralı başvurunuzun ön kontrolü tamamlanmış ve değerlendirme sürecine alınmıştır.

Başvurunuz kurul üyelerine atanacak ve inceleme süreci başlayacaktır.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  },

  REVISION_REQUESTED: {
    subject: 'Başvurunuzda Düzeltme Gerekiyor - {{applicationNumber}}',
    body: `
Sayın {{applicantName}},

{{applicationNumber}} numaralı başvurunuzda aşağıdaki konularda düzeltme yapılması gerekmektedir:

{{revisionDetails}}

Lütfen gerekli düzeltmeleri yaparak başvurunuzu yeniden gönderin.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  },

  MEMBER_ASSIGNMENT: {
    subject: 'Yeni Başvuru Ataması - {{applicationNumber}}',
    body: `
Sayın {{memberName}},

{{applicationNumber}} numaralı başvuru incelemeniz için size atanmıştır.

Başvuru Detayları:
- Başvuru No: {{applicationNumber}}  
- Başvuru Türü: {{applicationType}}
- Başvuru Sahibi: {{applicantName}}
- Atama Tarihi: {{assignmentDate}}

Lütfen sisteme giriş yaparak başvuruyu inceleyin ve kararınızı bildirin.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  },

  DECISION_MADE: {
    subject: 'Başvuru Kararı - {{applicationNumber}}',
    body: `
Sayın {{applicantName}},

{{applicationNumber}} numaralı başvurunuz için karar verilmiştir.

Karar: {{decision}}
Karar Tarihi: {{decisionDate}}

{{decisionDetails}}

Detaylı bilgi için sisteme giriş yapabilirsiniz.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  },

  AGENDA_CLOSED: {
    subject: 'Gündem Kapatıldı - {{agendaDate}}',
    body: `
{{agendaDate}} tarihli kurul toplantısı gündemi kapatılmıştır.

Toplam {{itemCount}} başvuru değerlendirilmiştir.

Başvuru sahiplerine ayrı ayrı bilgilendirme gönderilecektir.

Saygılarımızla,
Ege Üniversitesi Klinik Araştırmalar Etik Kurulu
    `.trim()
  }
} as const;

/**
 * Template değişkenlerini değiştir
 */
const replaceTemplateVariables = (template: string, variables: Record<string, any>): string => {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), String(value || ''));
  });
  
  return result;
};

/**
 * E-posta gönder (mock)
 */
export const sendEmail = async (
  to: string | string[],
  templateKey: keyof typeof EMAIL_TEMPLATES,
  variables: Record<string, any> = {}
): Promise<void> => {
  const template = EMAIL_TEMPLATES[templateKey];
  const recipients = Array.isArray(to) ? to : [to];
  
  const subject = replaceTemplateVariables(template.subject, variables);
  const body = replaceTemplateVariables(template.body, variables);
  
  // Console'a yazdır (development için)
  console.log('📧 Mock Email Sent:');
  console.log('To:', recipients.join(', '));
  console.log('Subject:', subject);
  console.log('Body:', body);
  console.log('---');
  
  // Her alıcı için bildirim oluştur
  for (const recipient of recipients) {
    const notification: Notification = {
      id: generateId(),
      toUserId: recipient, // Bu gerçekte user ID olmalı, şimdilik email kullanıyoruz
      channel: 'EMAIL',
      subject,
      body,
      at: new Date().toISOString(),
      read: false,
      sent: true
    };
    
    await addRecord(DATA_FILES.NOTIFICATIONS, notification);
  }
};

/**
 * SMS gönder (mock)
 */
export const sendSMS = async (
  to: string | string[],
  message: string
): Promise<void> => {
  const recipients = Array.isArray(to) ? to : [to];
  
  console.log('📱 Mock SMS Sent:');
  console.log('To:', recipients.join(', '));
  console.log('Message:', message);
  console.log('---');
  
  // Her alıcı için bildirim oluştur
  for (const recipient of recipients) {
    const notification: Notification = {
      id: generateId(),
      toUserId: recipient,
      channel: 'SMS',
      subject: 'SMS Bildirimi',
      body: message,
      at: new Date().toISOString(),
      read: false,
      sent: true
    };
    
    await addRecord(DATA_FILES.NOTIFICATIONS, notification);
  }
};

/**
 * Sistem bildirimi oluştur
 */
export const createSystemNotification = async (
  userId: string,
  subject: string,
  body: string
): Promise<void> => {
  const notification: Notification = {
    id: generateId(),
    toUserId: userId,
    channel: 'SYSTEM',
    subject,
    body,
    at: new Date().toISOString(),
    read: false,
    sent: true
  };
  
  await addRecord(DATA_FILES.NOTIFICATIONS, notification);
};

/**
 * Başvuru durumu değişikliği bildirimi
 */
export const notifyApplicationStatusChange = async (
  applicationId: string,
  applicantEmail: string,
  applicantName: string,
  applicationNumber: string,
  oldStatus: string,
  newStatus: string,
  details?: string
): Promise<void> => {
  let templateKey: keyof typeof EMAIL_TEMPLATES;
  let variables: Record<string, any> = {
    applicantName,
    applicationNumber,
    applicationId
  };
  
  switch (newStatus) {
    case 'SUBMITTED':
      templateKey = 'APPLICATION_SUBMITTED';
      variables.submittedDate = new Date().toLocaleDateString('tr-TR');
      break;
      
    case 'IN_REVIEW':
      templateKey = 'APPLICATION_APPROVED_FOR_REVIEW';
      break;
      
    case 'NEEDS_REVISION':
      templateKey = 'REVISION_REQUESTED';
      variables.revisionDetails = details || 'Detaylar için sisteme giriş yapın.';
      break;
      
    case 'DECIDED':
      templateKey = 'DECISION_MADE';
      variables.decision = details || 'Karar verildi';
      variables.decisionDate = new Date().toLocaleDateString('tr-TR');
      variables.decisionDetails = 'Detaylar için sisteme giriş yapın.';
      break;
      
    default:
      // Genel bildirim gönder
      await createSystemNotification(
        applicantEmail, // Gerçekte user ID kullanılmalı
        `Başvuru Durumu Değişti - ${applicationNumber}`,
        `${applicationNumber} numaralı başvurunuzun durumu "${newStatus}" olarak güncellendi.`
      );
      return;
  }
  
  await sendEmail(applicantEmail, templateKey, variables);
};

/**
 * Kurul üyesi atama bildirimi
 */
export const notifyMemberAssignment = async (
  memberEmail: string,
  memberName: string,
  applicationNumber: string,
  applicationType: string,
  applicantName: string
): Promise<void> => {
  await sendEmail(memberEmail, 'MEMBER_ASSIGNMENT', {
    memberName,
    applicationNumber,
    applicationType,
    applicantName,
    assignmentDate: new Date().toLocaleDateString('tr-TR')
  });
};

/**
 * Gündem kapatma bildirimi
 */
export const notifyAgendaClosed = async (
  agendaDate: string,
  itemCount: number,
  recipients: string[]
): Promise<void> => {
  await sendEmail(recipients, 'AGENDA_CLOSED', {
    agendaDate,
    itemCount
  });
};

/**
 * Kullanıcıya ait okunmamış bildirimleri getir
 */
export const getUnreadNotifications = async (userId: string): Promise<Notification[]> => {
  const notifications = await readDataFile<Notification>(DATA_FILES.NOTIFICATIONS);
  return notifications.filter(n => n.toUserId === userId && !n.read);
};

/**
 * Bildirimi okundu olarak işaretle
 */
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const notifications = await readDataFile<Notification>(DATA_FILES.NOTIFICATIONS);
  const index = notifications.findIndex(n => n.id === notificationId);
  
  if (index !== -1) {
    notifications[index].read = true;
    await writeDataFile(DATA_FILES.NOTIFICATIONS, notifications);
  }
};

/**
 * Kullanıcının tüm bildirimlerini okundu olarak işaretle
 */
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  const notifications = await readDataFile<Notification>(DATA_FILES.NOTIFICATIONS);
  let hasChanges = false;
  
  notifications.forEach(notification => {
    if (notification.toUserId === userId && !notification.read) {
      notification.read = true;
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    await writeDataFile(DATA_FILES.NOTIFICATIONS, notifications);
  }
};