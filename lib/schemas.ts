import { z } from 'zod'

// Kullanıcı Rolleri
export const UserRole = z.enum(['ADMIN', 'OFIS', 'UYE', 'BASKAN', 'BASVURAN'])
export type UserRole = z.infer<typeof UserRole>

// Başvuru Durumları
export const ApplicationStatus = z.enum([
  'DRAFT',
  'SUBMITTED', 
  'UNDER_CHECK',
  'NEEDS_REVISION',
  'IN_REVIEW',
  'DECIDED',
  'CLOSED'
])
export type ApplicationStatus = z.infer<typeof ApplicationStatus>

// Üye Kararları
export const MemberDecision = z.enum(['ONAY', 'KOSULLU_ONAY', 'RET'])
export type MemberDecision = z.infer<typeof MemberDecision>

// Uygunluk Durumları
export const ComplianceStatus = z.enum(['UYGUN', 'UYGUN_DEGIL', 'KOSULLU_UYGUN'])
export type ComplianceStatus = z.infer<typeof ComplianceStatus>

// Başvuru Türleri
export const ApplicationType = z.enum([
  'KLINIK_ARASTIRMA',
  'ILAC_ARASTIRMASI', 
  'TIBBI_CIHAZ',
  'ILAC_DISI',
  'BY_BE', // Biyoyararlanım/Biyoeşdeğerlik
  'DIGER'
])
export type ApplicationType = z.infer<typeof ApplicationType>

// Alan Türleri
export const FieldType = z.enum([
  'text',
  'textarea', 
  'number',
  'date',
  'select',
  'multiselect',
  'file',
  'checkbox',
  'kvkk-consent'
])
export type FieldType = z.infer<typeof FieldType>

// Form Alanı Şeması
export const FormFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: FieldType,
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  helpText: z.string().optional(),
  visibleForRoles: z.array(UserRole).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional()
  }).optional()
})
export type FormField = z.infer<typeof FormFieldSchema>

// Form Şeması
export const FormSchemaDefinition = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  version: z.number().default(1),
  fields: z.array(FormFieldSchema),
  active: z.boolean().default(false),
  archived: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string()
})
export type FormSchemaDefinition = z.infer<typeof FormSchemaDefinition>

// Kullanıcı Şeması
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRole,
  organization: z.string().optional(),
  phone: z.string().optional(),
  title: z.string().optional(),
  createdAt: z.string(),
  active: z.boolean().default(true)
})
export type User = z.infer<typeof UserSchema>

// Dosya Şeması
export const FileSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalName: z.string(),
  size: z.number(),
  mimeType: z.string(),
  uploadedAt: z.string(),
  isSecret: z.boolean().default(false)
})
export type FileInfo = z.infer<typeof FileSchema>

// Başvuru Şeması
export const ApplicationSchema = z.object({
  id: z.string(),
  applicationNumber: z.string(), // KA-YYYY-#####
  type: ApplicationType,
  applicantId: z.string(),
  status: ApplicationStatus,
  title: z.string().optional(),
  createdAt: z.string(),
  submittedAt: z.string().optional(),
  receivedAt: z.string().optional(),
  incomingDocNo: z.string().optional(),
  formSchema: z.string(), // form şema ID'si
  formVersion: z.number(),
  fields: z.record(z.any()), // form verisi
  files: z.array(FileSchema),
  kvkkApproved: z.boolean().default(false),
  eSignature: z.object({
    signed: z.boolean(),
    hash: z.string().optional(),
    signedAt: z.string().optional(),
    signerName: z.string().optional()
  }).optional(),
  revisions: z.array(z.object({
    id: z.string(),
    requestedAt: z.string(),
    requestedBy: z.string(),
    reason: z.string(),
    completedAt: z.string().optional(),
    oldFields: z.record(z.any()).optional(),
    newFields: z.record(z.any()).optional()
  })),
  history: z.array(z.object({
    action: z.string(),
    actorId: z.string(),
    actorRole: UserRole,
    at: z.string(),
    details: z.string().optional()
  }))
})
export type Application = z.infer<typeof ApplicationSchema>

// Gündem Şeması
export const AgendaSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  content: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED']),
  items: z.array(z.object({
    applicationId: z.string(),
    decision: ComplianceStatus.optional(),
    decisionNote: z.string().optional(),
    files: z.array(FileSchema).default([]),
    decidedAt: z.string().optional(),
    decidedBy: z.string().optional()
  })),
  createdAt: z.string(),
  createdBy: z.string(),
  closedAt: z.string().optional(),
  eSignature: z.object({
    signed: z.boolean(),
    hash: z.string().optional(),
    signedAt: z.string().optional(),
    signerName: z.string().optional()
  }).optional()
})
export type Agenda = z.infer<typeof AgendaSchema>

// Atama Şeması
export const AssignmentSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  memberId: z.string(),
  assignedAt: z.string(),
  assignedBy: z.string(),
  decision: MemberDecision.optional(),
  decisionNote: z.string().optional(),
  decidedAt: z.string().optional(),
  active: z.boolean().default(true)
})
export type Assignment = z.infer<typeof AssignmentSchema>

// Duyuru Şeması
export const AnnouncementSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  content: z.string(),
  audience: z.array(UserRole),
  createdBy: z.string(),
  createdAt: z.string(),
  active: z.boolean().default(true),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM')
})
export type Announcement = z.infer<typeof AnnouncementSchema>

// Belge Tipi Şeması
export const DocumentTypeSchema = z.object({
  id: z.string(),
  applicationType: ApplicationType,
  name: z.string(),
  required: z.boolean(),
  templateUrl: z.string().optional(),
  description: z.string().optional(),
  allowedFormats: z.array(z.string()),
  maxSizeMb: z.number().default(10)
})
export type DocumentType = z.infer<typeof DocumentTypeSchema>

// Sistem Parametreleri
export const ParametersSchema = z.object({
  allowedFileTypes: z.array(z.string()),
  maxFileSizeMb: z.number(),
  kvkkText: z.string(),
  virtualPOS: z.object({
    enabled: z.boolean()
  }),
  emailSettings: z.object({
    enabled: z.boolean(),
    fromAddress: z.string()
  }),
  systemMaintenance: z.object({
    enabled: z.boolean(),
    message: z.string()
  })
})
export type Parameters = z.infer<typeof ParametersSchema>

// Log Şeması
export const LogSchema = z.object({
  id: z.string(),
  actorId: z.string(),
  actorRole: UserRole,
  action: z.string(),
  entity: z.string(),
  entityId: z.string(),
  diff: z.record(z.any()).optional(),
  at: z.string(),
  ip: z.string().optional()
})
export type Log = z.infer<typeof LogSchema>

// Bildirim Şeması
export const NotificationSchema = z.object({
  id: z.string(),
  toUserId: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'SYSTEM']),
  subject: z.string(),
  body: z.string(),
  at: z.string(),
  read: z.boolean().default(false),
  sent: z.boolean().default(false)
})
export type Notification = z.infer<typeof NotificationSchema>

// Oturum Şeması
export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  expiresAt: z.string(),
  active: z.boolean().default(true)
})
export type Session = z.infer<typeof SessionSchema>