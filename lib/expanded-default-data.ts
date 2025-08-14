// lib/expanded-default-data.ts
// Genişletilmiş default veriler - tüm modüller için kapsamlı örnek veriler

export const expandedDefaultData = {
    // Kullanıcılar
    users: [
      {
        id: 'admin-1',
        email: 'admin@demo.tr',
        name: 'Sistem Yöneticisi',
        role: 'ADMIN',
        organization: 'Ege Üniversitesi Bilgi İşlem Daire Başkanlığı',
        createdAt: '2024-01-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-14T09:00:00Z'
      },
      {
        id: 'baskan-1',
        email: 'baskan@demo.tr',
        name: 'Prof. Dr. Mehmet Kürşat Özkan',
        role: 'BASKAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi Dekan Yardımcısı',
        createdAt: '2024-01-15T00:00:00Z',
        active: true,
        lastLogin: '2024-08-13T14:30:00Z'
      },
      {
        id: 'ofis-1',
        email: 'ofis@demo.tr',
        name: 'Ayşe Güven',
        role: 'OFIS',
        organization: 'Ege Üniversitesi Etik Kurul Sekreterliği',
        createdAt: '2024-01-20T00:00:00Z',
        active: true,
        lastLogin: '2024-08-14T08:15:00Z'
      },
      {
        id: 'uye-1',
        email: 'uye@demo.tr',
        name: 'Prof. Dr. Elif Kaya',
        role: 'UYE',
        organization: 'Ege Üniversitesi Tıp Fakültesi Onkoloji ABD',
        createdAt: '2024-02-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-12T16:45:00Z'
      },
      {
        id: 'uye-2',
        email: 'mehmet.ozkan@ege.edu.tr',
        name: 'Doç. Dr. Mehmet Özkan',
        role: 'UYE',
        organization: 'Ege Üniversitesi Tıp Fakültesi Kardiyoloji ABD',
        createdAt: '2024-02-05T00:00:00Z',
        active: true,
        lastLogin: '2024-08-11T10:20:00Z'
      },
      {
        id: 'uye-3',
        email: 'zeynep.acar@ege.edu.tr',
        name: 'Doç. Dr. Zeynep Acar',
        role: 'UYE',
        organization: 'Ege Üniversitesi Tıp Fakültesi Göğüs Hastalıkları ABD',
        createdAt: '2024-02-10T00:00:00Z',
        active: true,
        lastLogin: '2024-08-13T11:30:00Z'
      },
      {
        id: 'uye-4',
        email: 'ali.demir@ege.edu.tr',
        name: 'Prof. Dr. Ali Demir',
        role: 'UYE',
        organization: 'Ege Üniversitesi Eczacılık Fakültesi',
        createdAt: '2024-02-15T00:00:00Z',
        active: true,
        lastLogin: '2024-08-10T14:20:00Z'
      },
      {
        id: 'basvuran-1',
        email: 'basvuran@demo.tr',
        name: 'Dr. Ahmet Yılmaz',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi Kardiyoloji ABD',
        createdAt: '2024-03-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-10T15:45:00Z'
      },
      {
        id: 'basvuran-2',
        email: 'can.yilmaz@ege.edu.tr',
        name: 'Dr. Can Yılmaz',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi Çocuk Sağlığı ve Hastalıkları ABD',
        createdAt: '2024-03-15T00:00:00Z',
        active: true,
        lastLogin: '2024-08-09T09:30:00Z'
      },
      {
        id: 'basvuran-3',
        email: 'ayse.demir@ege.edu.tr',
        name: 'Prof. Dr. Ayşe Demir',
        role: 'BASVURAN',
        organization: 'Ege Üniversitesi Tıp Fakültesi Onkoloji ABD',
        createdAt: '2024-04-01T00:00:00Z',
        active: true,
        lastLogin: '2024-08-08T13:15:00Z'
      }
    ],
  
    // Başvurular
    applications: [
      {
        id: 'app-1',
        applicationNumber: 'KA-2024-00001',
        type: 'KLINIK_ARASTIRMA',
        title: 'Kardiyovasküler Hastalıklarda Yeni Tedavi Yaklaşımlarının Etkinliği',
        applicantId: 'basvuran-1',
        status: 'IN_REVIEW',
        formSchema: 'klinik-arastirma',
        formVersion: 1,
        createdAt: '2024-08-01T10:00:00Z',
        submittedAt: '2024-08-01T15:30:00Z',
        receivedAt: '2024-08-02T09:00:00Z',
        incomingDocNo: 'EK-2024-001',
        fields: {
          research_title: 'Kardiyovasküler Hastalıklarda Yeni Tedavi Yaklaşımlarının Etkinliği',
          research_type: 'Müdahaleli',
          research_summary: 'Bu çalışma, kardiyovasküler hastalıklarda yeni geliştirilmiş tedavi protokollerinin etkinliğini değerlendirmeyi amaçlamaktadır.',
          participant_count: 150,
          study_duration: '24 ay',
          primary_endpoint: 'Kardiyovasküler olayların azalma oranı',
          secondary_endpoints: 'Yaşam kalitesi, hastane yatış süreleri',
          inclusion_criteria: 'Koroner arter hastalığı tanısı almış, 18-75 yaş arası hastalar',
          exclusion_criteria: 'Malignite öyküsü, böbrek yetmezliği',
          methodology: 'Randomize kontrollü çift kör çalışma'
        },
        files: [
          { name: 'protokol-v1.pdf', type: 'application/pdf', size: 2456789, uploadedAt: '2024-08-01T14:00:00Z' },
          { name: 'bilgilendirme-formu.pdf', type: 'application/pdf', size: 456123, uploadedAt: '2024-08-01T14:15:00Z' },
          { name: 'istatistik-plan.pdf', type: 'application/pdf', size: 789456, uploadedAt: '2024-08-01T14:30:00Z' }
        ],
        kvkkApproved: true,
        revisions: [],
        history: [
          {
            action: 'CREATED',
            actorId: 'basvuran-1',
            actorRole: 'BASVURAN',
            at: '2024-08-01T10:00:00Z',
            details: 'Başvuru oluşturuldu'
          },
          {
            action: 'SUBMITTED',
            actorId: 'basvuran-1',
            actorRole: 'BASVURAN',
            at: '2024-08-01T15:30:00Z',
            details: 'Başvuru gönderildi'
          },
          {
            action: 'RECEIVED',
            actorId: 'ofis-1',
            actorRole: 'OFIS',
            at: '2024-08-02T09:00:00Z',
            details: 'Başvuru teslim alındı'
          }
        ]
      },
      {
        id: 'app-2',
        applicationNumber: 'KA-2024-00002',
        type: 'ILAC_ARASTIRMASI',
        title: 'Yeni Onkoloji İlacının Faz II Klinik Çalışması',
        applicantId: 'basvuran-3',
        status: 'UNDER_CHECK',
        formSchema: 'ilac-arastirmasi',
        formVersion: 1,
        createdAt: '2024-08-05T14:00:00Z',
        submittedAt: '2024-08-05T16:45:00Z',
        receivedAt: '2024-08-06T10:30:00Z',
        incomingDocNo: 'EK-2024-002',
        fields: {
          drug_name: 'EGE-ONK-2024',
          active_ingredient: 'Novel kinase inhibitor',
          phase: 'Faz II',
          indication: 'Metastatik kolorektal kanser',
          sponsor: 'Ege Pharma Ltd.',
          investigator: 'Prof. Dr. Ayşe Demir',
          participant_count: 80,
          study_design: 'Açık etiketli, tek kollu çalışma'
        },
        files: [
          { name: 'ilac-protokol.pdf', type: 'application/pdf', size: 3456789, uploadedAt: '2024-08-05T16:00:00Z' },
          { name: 'investigator-brochure.pdf', type: 'application/pdf', size: 5678901, uploadedAt: '2024-08-05T16:15:00Z' }
        ],
        kvkkApproved: true,
        revisions: [],
        history: []
      },
      {
        id: 'app-3',
        applicationNumber: 'KA-2024-00003',
        type: 'TIBBI_CIHAZ',
        title: 'Yeni Kardiyak Monitör Cihazının Güvenlik ve Etkinlik Değerlendirmesi',
        applicantId: 'basvuran-1',
        status: 'NEEDS_REVISION',
        formSchema: 'tibbi-cihaz',
        formVersion: 1,
        createdAt: '2024-07-28T11:00:00Z',
        submittedAt: '2024-07-28T17:20:00Z',
        receivedAt: '2024-07-29T09:15:00Z',
        incomingDocNo: 'EK-2024-003',
        fields: {
          device_name: 'CardioMax Pro',
          device_type: 'Sürekli kardiyak monitör',
          manufacturer: 'MedTech Solutions',
          ce_marking: 'Evet',
          study_objective: 'Cihazın güvenliği ve etkinliğinin değerlendirilmesi'
        },
        files: [],
        kvkkApproved: true,
        revisions: [
          {
            id: 'rev-1',
            requestedAt: '2024-08-01T10:00:00Z',
            requestedBy: 'ofis-1',
            reason: 'CE işareti belgesi eksik, cihaz kullanım kılavuzu gerekli',
            completed: false
          }
        ],
        history: []
      }
    ],
  
    // Form şemaları
    forms: [
      {
        id: 'form-1',
        slug: 'klinik-arastirma',
        title: 'Klinik Araştırma Başvuru Formu',
        description: 'Klinik araştırma başvuruları için standart form',
        version: 1,
        active: true,
        archived: false,
        createdAt: '2024-08-01T10:00:00Z',
        updatedAt: '2024-08-01T10:00:00Z',
        createdBy: 'admin-1',
        fields: [
          {
            key: 'research_title',
            label: 'Araştırma Başlığı',
            type: 'text',
            required: true,
            helpText: 'Araştırmanın tam başlığını giriniz'
          },
          {
            key: 'research_type',
            label: 'Araştırma Türü',
            type: 'select',
            required: true,
            options: ['Gözlemsel', 'Müdahaleli', 'Tanımlayıcı']
          },
          {
            key: 'research_summary',
            label: 'Araştırma Özeti',
            type: 'textarea',
            required: true,
            helpText: 'Araştırmanın kısa özetini yazınız (maksimum 500 kelime)'
          },
          {
            key: 'participant_count',
            label: 'Katılımcı Sayısı',
            type: 'number',
            required: true,
            validation: { min: 1, max: 10000 }
          },
          {
            key: 'study_duration',
            label: 'Çalışma Süresi',
            type: 'text',
            required: true,
            helpText: 'Örn: 12 ay, 24 ay'
          },
          {
            key: 'primary_endpoint',
            label: 'Birincil Sonlanım Noktası',
            type: 'textarea',
            required: true
          },
          {
            key: 'secondary_endpoints',
            label: 'İkincil Sonlanım Noktaları',
            type: 'textarea',
            required: false
          },
          {
            key: 'inclusion_criteria',
            label: 'Dahil Etme Kriterleri',
            type: 'textarea',
            required: true
          },
          {
            key: 'exclusion_criteria',
            label: 'Dışlama Kriterleri',
            type: 'textarea',
            required: true
          },
          {
            key: 'methodology',
            label: 'Metodoloji',
            type: 'textarea',
            required: true
          },
          {
            key: 'informed_consent',
            label: 'Aydınlatılmış Onam Formu',
            type: 'file',
            required: true,
            helpText: 'PDF formatında yükleyiniz'
          },
          {
            key: 'protocol_document',
            label: 'Araştırma Protokolü',
            type: 'file',
            required: true,
            helpText: 'Detaylı araştırma protokolü (PDF)'
          },
          {
            key: 'statistical_plan',
            label: 'İstatistiksel Analiz Planı',
            type: 'file',
            required: true
          },
          {
            key: 'kvkk_approval',
            label: 'KVKK Onayı',
            type: 'kvkk-consent',
            required: true
          }
        ]
      },
      {
        id: 'form-2',
        slug: 'ilac-arastirmasi',
        title: 'İlaç Araştırması Başvuru Formu',
        description: 'İlaç araştırmaları için özel form',
        version: 2,
        active: true,
        archived: false,
        createdAt: '2024-07-15T14:30:00Z',
        updatedAt: '2024-08-05T09:15:00Z',
        createdBy: 'admin-1',
        fields: [
          {
            key: 'drug_name',
            label: 'İlaç Adı',
            type: 'text',
            required: true
          },
          {
            key: 'active_ingredient',
            label: 'Etken Madde',
            type: 'text',
            required: true
          },
          {
            key: 'phase',
            label: 'Faz',
            type: 'select',
            required: true,
            options: ['Faz I', 'Faz II', 'Faz III', 'Faz IV']
          },
          {
            key: 'indication',
            label: 'Endikasyon',
            type: 'textarea',
            required: true
          },
          {
            key: 'sponsor',
            label: 'Sponsor',
            type: 'text',
            required: true
          },
          {
            key: 'investigator',
            label: 'Sorumlu Araştırıcı',
            type: 'text',
            required: true
          },
          {
            key: 'participant_count',
            label: 'Hasta Sayısı',
            type: 'number',
            required: true
          },
          {
            key: 'study_design',
            label: 'Çalışma Dizaynı',
            type: 'textarea',
            required: true
          }
        ]
      }
    ],
  
    // Gündemler
    agendas: [
      {
        id: 'agenda-1',
        date: '2024-08-20T14:00:00Z',
        title: 'Ağustos 2024 Etik Kurul Toplantısı',
        content: 'Aylık rutin etik kurul toplantısı',
        status: 'OPEN',
        items: [
          {
            applicationId: 'app-1',
            decision: undefined,
            decisionNote: '',
            files: []
          },
          {
            applicationId: 'app-2',
            decision: undefined,
            decisionNote: '',
            files: []
          }
        ],
        createdAt: '2024-08-10T10:00:00Z',
        createdBy: 'ofis-1'
      },
      {
        id: 'agenda-2',
        date: '2024-07-16T14:00:00Z',
        title: 'Temmuz 2024 Etik Kurul Toplantısı',
        content: 'Aylık rutin etik kurul toplantısı',
        status: 'CLOSED',
        items: [
          {
            applicationId: 'app-3',
            decision: 'KOSULLU_UYGUN',
            decisionNote: 'CE işareti belgesi ve cihaz kullanım kılavuzu sunulması koşuluyla',
            files: [],
            decidedAt: '2024-07-16T16:30:00Z',
            decidedBy: 'baskan-1'
          }
        ],
        createdAt: '2024-07-10T10:00:00Z',
        createdBy: 'ofis-1',
        closedAt: '2024-07-16T17:00:00Z',
        eSignature: {
          signed: true,
          hash: 'SHA256-FAKE-HASH-12345',
          signedAt: '2024-07-17T09:00:00Z',
          signerName: 'Prof. Dr. Mehmet Kürşat Özkan'
        }
      }
    ],
  
    // Atamalar
    assignments: [
      {
        id: 'assign-1',
        applicationId: 'app-1',
        memberId: 'uye-1',
        assignedAt: '2024-08-05T10:00:00Z',
        assignedBy: 'ofis-1',
        decision: 'ONAY',
        decisionNote: 'Araştırma protokolü uygun, metodoloji yeterli',
        decidedAt: '2024-08-08T14:30:00Z',
        active: true
      },
      {
        id: 'assign-2',
        applicationId: 'app-1',
        memberId: 'uye-2',
        assignedAt: '2024-08-05T10:00:00Z',
        assignedBy: 'ofis-1',
        decision: 'KOSULLU_ONAY',
        decisionNote: 'İstatistiksel güç analizi güçlendirilmeli',
        decidedAt: '2024-08-09T11:15:00Z',
        active: true
      },
      {
        id: 'assign-3',
        applicationId: 'app-1',
        memberId: 'uye-3',
        assignedAt: '2024-08-05T10:00:00Z',
        assignedBy: 'ofis-1',
        decision: 'ONAY',
        decidedAt: '2024-08-07T16:45:00Z',
        active: true
      },
      {
        id: 'assign-4',
        applicationId: 'app-2',
        memberId: 'uye-1',
        assignedAt: '2024-08-07T14:00:00Z',
        assignedBy: 'ofis-1',
        active: true
      },
      {
        id: 'assign-5',
        applicationId: 'app-2',
        memberId: 'uye-4',
        assignedAt: '2024-08-07T14:00:00Z',
        assignedBy: 'ofis-1',
        active: true
      }
    ],
  
    // Duyurular
    announcements: [
      {
        id: 'ann-1',
        category: 'Sistem',
        title: 'Etik Kurul Sistemine Hoş Geldiniz',
        content: 'Ege Üniversitesi Klinik Araştırmalar Etik Kurulu dijital sistemi aktif edilmiştir. Tüm başvurularınızı bu sistem üzerinden yapabilirsiniz.',
        audience: ['BASVURAN'],
        createdBy: 'admin-1',
        createdAt: '2024-08-01T00:00:00Z',
        active: true,
        priority: 'HIGH'
      },
      {
        id: 'ann-2',
        category: 'Toplantı',
        title: 'Ağustos 2024 Etik Kurul Toplantısı',
        content: 'Ağustos ayı etik kurul toplantısı 20 Ağustos 2024 Salı günü saat 14:00\'te yapılacaktır. Gündem için lütfen sistemdeki gündem bölümünü kontrol ediniz.',
        audience: ['UYE', 'BASKAN', 'OFIS'],
        createdBy: 'ofis-1',
        createdAt: '2024-08-13T16:00:00Z',
        active: true,
        priority: 'MEDIUM'
      },
      {
        id: 'ann-3',
        category: 'Bilgilendirme',
        title: 'Yeni Form Şablonları Eklendi',
        content: 'Biyoyararlanım/Biyoeşdeğerlik araştırmaları için yeni form şablonları sisteme eklenmiştir. Başvuru yaparken lütfen doğru form tipini seçiniz.',
        audience: ['BASVURAN'],
        createdBy: 'ofis-1',
        createdAt: '2024-08-12T11:30:00Z',
        active: true,
        priority: 'LOW'
      },
      {
        id: 'ann-4',
        category: 'Değişiklik',
        title: 'KVKK Bilgilendirme Metni Güncellendi',
        content: 'Kişisel verilerin korunması hakkında bilgilendirme metni güncel mevzuata uygun olarak güncellenmiştir.',
        audience: ['BASVURAN', 'OFIS'],
        createdBy: 'admin-1',
        createdAt: '2024-08-10T09:00:00Z',
        active: true,
        priority: 'MEDIUM'
      }
    ],
  
    // Sistem parametreleri
    parameters: {
      allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'txt'],
      maxFileSizeMb: 15,
      kvkkText: `
  KIŞISEL VERİLERİN KORUNMASI HAKKINDA BİLGİLENDİRME
  
  Ege Üniversitesi Klinik Araştırmalar Etik Kurulu olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesine ilişkin aşağıdaki bilgileri paylaşıyoruz:
  
  1. VERİ SORUMLUSU
  Veri Sorumlusu: Ege Üniversitesi
  Adres: Bornova/İzmir
  İletişim: etikkurul@ege.edu.tr
  
  2. KİŞİSEL VERİLERİN İŞLENME AMACI
  Kişisel verileriniz;
  - Etik kurul başvurularınızın değerlendirilmesi
  - Yasal yükümlülüklerimizin yerine getirilmesi
  - İletişim ve bilgilendirme süreçlerinin yürütülmesi
  amaçlarıyla işlenmektedir.
  
  3. VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ
  Verileriniz, başvuru formları aracılığıyla toplanmakta ve KVKK'nın 5. maddesinin (c) ve (e) bentleri uyarınca işlenmektedir.
  
  4. HAKLARINIZ
  KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar hakkında detaylı bilgi için web sitemizi ziyaret edebilirsiniz.
  
  Bu bilgilendirmeyi okuduğumu ve anladığımı beyan ederim.
      `,
      virtualPOS: { 
        enabled: false,
        provider: 'demo',
        merchantId: 'DEMO123',
        testMode: true
      },
      emailSettings: { 
        enabled: true, 
        fromAddress: 'etik-kurul@ege.edu.tr',
        smtpHost: 'mail.ege.edu.tr',
        smtpPort: 587,
        useSSL: true
      },
      systemMaintenance: { 
        enabled: false, 
        message: '',
        scheduledStart: null,
        scheduledEnd: null
      },
      applicationNumberPrefix: 'KA',
      applicationNumberYear: '2024',
      applicationNumberCounter: 3,
      meetingFrequency: 'MONTHLY',
      meetingDay: 'TUESDAY',
      meetingTime: '14:00',
      reminderDays: [7, 3, 1],
      autoAssignmentEnabled: false,
      multipleAssignmentAllowed: true,
      maxAssignmentsPerMember: 5,
      revisionDeadlineDays: 30,
      finalDecisionDeadlineDays: 15
    },
  
    // Belge türleri
    documentTypes: [
      {
        id: 'doc-1',
        applicationType: 'KLINIK_ARASTIRMA',
        name: 'Araştırma Protokolü',
        required: true,
        templateUrl: null,
        description: 'Detaylı araştırma protokolü belgesi'
      },
      {
        id: 'doc-2',
        applicationType: 'KLINIK_ARASTIRMA',
        name: 'Aydınlatılmış Onam Formu',
        required: true,
        templateUrl: '/templates/aydinlatilmis-onam-formu.pdf',
        description: 'Hasta bilgilendirme ve onam formu'
      },
      {
        id: 'doc-3',
        applicationType: 'KLINIK_ARASTIRMA',
        name: 'İstatistiksel Analiz Planı',
        required: true,
        templateUrl: null,
        description: 'Detaylı istatistiksel analiz planı'
      },
      {
        id: 'doc-4',
        applicationType: 'ILAC_ARASTIRMASI',
        name: 'Investigator Brochure',
        required: true,
        templateUrl: null,
        description: 'İlaç hakkında araştırıcı bilgilendirme broşürü'
      },
      {
        id: 'doc-5',
        applicationType: 'ILAC_ARASTIRMASI',
        name: 'Protokol Özeti',
        required: true,
        templateUrl: '/templates/protokol-ozeti.pdf',
        description: 'İlaç çalışması protokol özeti'
      },
      {
        id: 'doc-6',
        applicationType: 'TIBBI_CIHAZ',
        name: 'CE İşareti Belgesi',
        required: true,
        templateUrl: null,
        description: 'Cihazın CE işareti belgesi'
      },
      {
        id: 'doc-7',
        applicationType: 'TIBBI_CIHAZ',
        name: 'Cihaz Kullanım Kılavuzu',
        required: true,
        templateUrl: null,
        description: 'Tıbbi cihaz kullanım kılavuzu ve teknik özellikler'
      },
      {
        id: 'doc-8',
        applicationType: 'BY_BE',
        name: 'Referans Ürün Bilgileri',
        required: true,
        templateUrl: null,
        description: 'Referans ürün teknik bilgileri ve analiz sertifikası'
      },
      {
        id: 'doc-9',
        applicationType: 'BY_BE',
        name: 'Test Ürünü Bilgileri',
        required: true,
        templateUrl: null,
        description: 'Test ürünü teknik bilgileri ve analiz sertifikası'
      }
    ],
  
    // Loglar
    logs: [
      {
        id: 'log-1',
        actorId: 'basvuran-1',
        actorRole: 'BASVURAN',
        action: 'CREATE_APPLICATION',
        entity: 'APPLICATION',
        entityId: 'app-1',
        at: '2024-08-01T10:00:00Z',
        diff: {
          added: { status: 'DRAFT', title: 'Kardiyovasküler Hastalıklarda Yeni Tedavi Yaklaşımlarının Etkinliği' }
        }
      },
      {
        id: 'log-2',
        actorId: 'basvuran-1',
        actorRole: 'BASVURAN',
        action: 'SUBMIT_APPLICATION',
        entity: 'APPLICATION',
        entityId: 'app-1',
        at: '2024-08-01T15:30:00Z',
        diff: {
          changed: { status: { from: 'DRAFT', to: 'SUBMITTED' } }
        }
      },
      {
        id: 'log-3',
        actorId: 'ofis-1',
        actorRole: 'OFIS',
        action: 'RECEIVE_APPLICATION',
        entity: 'APPLICATION',
        entityId: 'app-1',
        at: '2024-08-02T09:00:00Z',
        diff: {
          changed: { status: { from: 'SUBMITTED', to: 'UNDER_CHECK' } },
          added: { receivedAt: '2024-08-02T09:00:00Z', incomingDocNo: 'EK-2024-001' }
        }
      },
      {
        id: 'log-4',
        actorId: 'ofis-1',
        actorRole: 'OFIS',
        action: 'ASSIGN_MEMBER',
        entity: 'ASSIGNMENT',
        entityId: 'assign-1',
        at: '2024-08-05T10:00:00Z',
        diff: {
          added: { applicationId: 'app-1', memberId: 'uye-1' }
        }
      },
      {
        id: 'log-5',
        actorId: 'uye-1',
        actorRole: 'UYE',
        action: 'MAKE_DECISION',
        entity: 'ASSIGNMENT',
        entityId: 'assign-1',
        at: '2024-08-08T14:30:00Z',
        diff: {
          added: { decision: 'ONAY', decisionNote: 'Araştırma protokolü uygun, metodoloji yeterli' }
        }
      },
      {
        id: 'log-6',
        actorId: 'admin-1',
        actorRole: 'ADMIN',
        action: 'CREATE_FORM',
        entity: 'FORM',
        entityId: 'form-1',
        at: '2024-08-01T10:00:00Z',
        diff: {
          added: { slug: 'klinik-arastirma', title: 'Klinik Araştırma Başvuru Formu' }
        }
      }
    ],
  
    // Bildirimler
    notifications: [
      {
        id: 'notif-1',
        toUserId: 'basvuran-1',
        channel: 'EMAIL',
        subject: 'Başvurunuz Teslim Alındı',
        body: 'KA-2024-00001 numaralı başvurunuz etik kurul sekreterliği tarafından teslim alınmıştır.',
        at: '2024-08-02T09:15:00Z'
      },
      {
        id: 'notif-2',
        toUserId: 'uye-1',
        channel: 'EMAIL',
        subject: 'Yeni Başvuru Ataması',
        body: 'Size KA-2024-00001 numaralı başvuru inceleme için atanmıştır.',
        at: '2024-08-05T10:15:00Z'
      },
      {
        id: 'notif-3',
        toUserId: 'uye-2',
        channel: 'EMAIL',
        subject: 'Yeni Başvuru Ataması',
        body: 'Size KA-2024-00001 numaralı başvuru inceleme için atanmıştır.',
        at: '2024-08-05T10:15:00Z'
      },
      {
        id: 'notif-4',
        toUserId: 'baskan-1',
        channel: 'EMAIL',
        subject: 'Nihai Karar Bekleyen Başvuru',
        body: 'KA-2024-00001 numaralı başvuru için tüm üye kararları alınmış, nihai kararınız beklenmektedir.',
        at: '2024-08-09T16:00:00Z'
      },
      {
        id: 'notif-5',
        toUserId: 'basvuran-3',
        channel: 'EMAIL',
        subject: 'Başvuru Revizyon Talebi',
        body: 'KA-2024-00003 numaralı başvurunuz için revizyon talep edilmiştir. Lütfen sisteme giriş yaparak detayları inceleyin.',
        at: '2024-08-01T11:00:00Z'
      }
    ],
  
    // Koşullu uygun kayıtları
    conditionalApprovals: [
      {
        id: 'ca-1',
        applicationId: 'app-3',
        applicationNumber: 'KA-2024-00003',
        title: 'Yeni Kardiyak Monitör Cihazının Güvenlik ve Etkinlik Değerlendirmesi',
        type: 'TIBBI_CIHAZ',
        applicantName: 'Dr. Ahmet Yılmaz',
        organization: 'Ege Üniversitesi Kardiyoloji ABD',
        decisionDate: '2024-07-16T16:30:00Z',
        deadline: '2024-08-30T23:59:59Z',
        status: 'PENDING_UPDATE',
        conditions: [
          'CE işareti belgesinin sunulması',
          'Cihaz kullanım kılavuzunun eklenmesi',
          'Güvenlik risklerinin detaylandırılması'
        ],
        requiredDocuments: [
          'CE işareti belgesi',
          'Cihaz kullanım kılavuzu (Türkçe)',
          'Risk analizi raporu'
        ],
        updates: [],
        priority: 'MEDIUM'
      }
    ],
  
    // Oturumlar (sessions)
    sessions: [
      {
        id: 'session-1',
        userId: 'admin-1',
        token: 'mock-session-token-admin',
        createdAt: '2024-08-14T09:00:00Z',
        expiresAt: '2024-08-14T17:00:00Z',
        active: true
      }
    ],
  
    // Ek form şemaları
    additionalForms: [
      {
        id: 'form-3',
        slug: 'tibbi-cihaz',
        title: 'Tıbbi Cihaz Araştırması Başvuru Formu',
        description: 'Tıbbi cihaz araştırmaları için özel form',
        version: 1,
        active: true,
        archived: false,
        createdAt: '2024-06-20T16:45:00Z',
        updatedAt: '2024-06-20T16:45:00Z',
        createdBy: 'admin-1',
        fields: [
          {
            key: 'device_name',
            label: 'Cihaz Adı',
            type: 'text',
            required: true
          },
          {
            key: 'device_type',
            label: 'Cihaz Türü',
            type: 'select',
            required: true,
            options: ['Tanı cihazı', 'Tedavi cihazı', 'Monitörleme cihazı', 'Implant', 'Diğer']
          },
          {
            key: 'manufacturer',
            label: 'Üretici Firma',
            type: 'text',
            required: true
          },
          {
            key: 'ce_marking',
            label: 'CE İşareti',
            type: 'select',
            required: true,
            options: ['Evet', 'Hayır', 'Başvuru aşamasında']
          },
          {
            key: 'risk_class',
            label: 'Risk Sınıfı',
            type: 'select',
            required: true,
            options: ['Sınıf I', 'Sınıf IIa', 'Sınıf IIb', 'Sınıf III']
          },
          {
            key: 'study_objective',
            label: 'Çalışma Amacı',
            type: 'textarea',
            required: true
          },
          {
            key: 'participant_count',
            label: 'Katılımcı Sayısı',
            type: 'number',
            required: true
          },
          {
            key: 'study_duration',
            label: 'Çalışma Süresi',
            type: 'text',
            required: true
          },
          {
            key: 'primary_safety_endpoint',
            label: 'Birincil Güvenlik Sonlanım Noktası',
            type: 'textarea',
            required: true
          },
          {
            key: 'primary_efficacy_endpoint',
            label: 'Birincil Etkinlik Sonlanım Noktası',
            type: 'textarea',
            required: true
          }
        ]
      },
      {
        id: 'form-4',
        slug: 'by-be',
        title: 'Biyoyararlanım/Biyoeşdeğerlik Çalışması Formu',
        description: 'BY/BE çalışmaları için özel form',
        version: 1,
        active: true,
        archived: false,
        createdAt: '2024-06-25T10:30:00Z',
        updatedAt: '2024-06-25T10:30:00Z',
        createdBy: 'admin-1',
        fields: [
          {
            key: 'reference_product',
            label: 'Referans Ürün',
            type: 'text',
            required: true,
            helpText: 'Referans olarak kullanılacak ürünün tam adı'
          },
          {
            key: 'test_product',
            label: 'Test Ürünü',
            type: 'text',
            required: true,
            helpText: 'Test edilecek ürünün tam adı'
          },
          {
            key: 'active_substance',
            label: 'Etken Madde',
            type: 'text',
            required: true
          },
          {
            key: 'dosage_form',
            label: 'Dozaj Formu',
            type: 'select',
            required: true,
            options: ['Tablet', 'Kapsül', 'Enjeksiyon', 'Krem', 'Jel', 'Solüsyon', 'Diğer']
          },
          {
            key: 'strength',
            label: 'Güç/Dozaj',
            type: 'text',
            required: true
          },
          {
            key: 'study_design',
            label: 'Çalışma Dizaynı',
            type: 'select',
            required: true,
            options: ['Çapraz (crossover)', 'Paralel grup', 'Tek doz', 'Çoklu doz']
          },
          {
            key: 'volunteer_count',
            label: 'Gönüllü Sayısı',
            type: 'number',
            required: true,
            validation: { min: 12, max: 200 }
          },
          {
            key: 'washout_period',
            label: 'Washout Periyodu',
            type: 'text',
            required: false,
            helpText: 'Çapraz çalışmalarda gerekli'
          },
          {
            key: 'analytical_method',
            label: 'Analitik Yöntem',
            type: 'textarea',
            required: true,
            helpText: 'Kullanılacak analitik yöntemin detayları'
          },
          {
            key: 'pharmacokinetic_parameters',
            label: 'Farmakokinetik Parametreler',
            type: 'multiselect',
            required: true,
            options: ['Cmax', 'Tmax', 'AUC0-t', 'AUC0-∞', 'T1/2', 'Kel', 'Diğer']
          }
        ]
      }
    ],
  
    // İstatistiksel veriler (dashboard için)
    statistics: {
      monthlyApplications: [
        { month: 'Ocak', count: 12 },
        { month: 'Şubat', count: 18 },
        { month: 'Mart', count: 15 },
        { month: 'Nisan', count: 22 },
        { month: 'Mayıs', count: 19 },
        { month: 'Haziran', count: 25 },
        { month: 'Temmuz', count: 28 },
        { month: 'Ağustos', count: 14 }
      ],
      applicationsByType: [
        { type: 'Klinik Araştırma', count: 89, percentage: 45 },
        { type: 'İlaç Araştırması', count: 67, percentage: 34 },
        { type: 'Tıbbi Cihaz', count: 28, percentage: 14 },
        { type: 'BY/BE', count: 10, percentage: 5 },
        { type: 'Diğer', count: 4, percentage: 2 }
      ],
      applicationsByStatus: [
        { status: 'Taslak', count: 5 },
        { status: 'Gönderilmiş', count: 8 },
        { status: 'İnceleme Altında', count: 12 },
        { status: 'Revizyon Gerekli', count: 4 },
        { status: 'Karar Verilmiş', count: 156 },
        { status: 'Tamamlanmış', count: 142 }
      ],
      memberWorkload: [
        { memberId: 'uye-1', memberName: 'Prof. Dr. Elif Kaya', activeAssignments: 8, completedThisMonth: 12 },
        { memberId: 'uye-2', memberName: 'Doç. Dr. Mehmet Özkan', activeAssignments: 6, completedThisMonth: 10 },
        { memberId: 'uye-3', memberName: 'Doç. Dr. Zeynep Acar', activeAssignments: 7, completedThisMonth: 11 },
        { memberId: 'uye-4', memberName: 'Prof. Dr. Ali Demir', activeAssignments: 5, completedThisMonth: 8 }
      ],
      averageReviewTime: {
        office: 3.2, // gün
        members: 8.5, // gün
        chairman: 2.1, // gün
        total: 13.8 // gün
      },
      approvalRates: {
        approved: 68,
        conditionallyApproved: 24,
        rejected: 8
      }
    }
  }
  
  // Utility function to initialize data
  export const initializeExpandedData = async () => {
    try {
      // Her veri tipini ayrı ayrı storage'a yaz
      const dataEntries = Object.entries(expandedDefaultData)
      
      for (const [key, value] of dataEntries) {
        const filename = `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}.json`
        
        // writeDataFile fonksiyonunu kullan (lib/storage.ts'den)
        if (typeof window !== 'undefined') {
          // Browser environment
          localStorage.setItem(
            `ege_ethics_${key}`, 
            JSON.stringify(value, null, 2)
          )
        } else {
          // Server environment - bu durumda fs kullanılacak
          console.log(`Writing ${filename} with ${Array.isArray(value) ? value.length : 1} records`)
        }
      }
      
      console.log('Genişletilmiş demo veriler başarıyla yüklendi')
    } catch (error) {
      console.error('Genişletilmiş veri yükleme hatası:', error)
    }
  }
  
  // Default export
  export default expandedDefaultData