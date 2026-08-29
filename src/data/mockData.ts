import { Trace, TimeCapsule, NotificationItem } from '../types';

export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYc_AxroP9BQ7DmdWh2tQmhOSu84KhbGGQs94WhrTx3e03QPHPdhrPWCwIv6bCtQo3LVQ2dvoTOnt0juv7Oki7Xx7T-TMG510zJFML6KiJ58GGbVZfsnczR89E0THJeCSkRr62pJMJrJG9_g329kad8H-pEaETr9Lz9u0rTbqICuKplfq4DX9WPTcqQ4bh__ykbBcwjjRAbONmamcvIU_Zae3XxT34lFAFqkGErf8zeVqhFPCE659Ow';

export const MAP_PREVIEW_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd0Jhk2JSgm1MrNYF9szIi8SGL2tu1jRJ8qgJblWPWAMXsY61FH2DkYlZvJjzS1Ks_tGe6g3zqkTUnmxbHmolE4EAMWbVEdXSHem-0_NC4rJg8CaHiJV5e1Og2Xo4mt1Ww53En7V89zzrkhfGmE_ltT-3njsFhQuBlV-wo4cR84CruYWPIyVqFAK0vAGCIucEUxLY04ATxbkUBo87yVgM0qY8sdpueSv4uEFtSOrkjZlIucTaSz-_Ocw';

export const INITIAL_CAPSULES: TimeCapsule[] = [
  {
    id: 'cap-1',
    title: 'رسالة لأولادي',
    unlockYear: 2030,
    unlockDate: '2030-01-01',
    timeLeftStr: 'تفتح بعد ٦ سنوات',
    isUnlocked: false,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconType: 'purple',
    recipient: 'سارة وعمر',
    message: 'رسالة محفورة من الماضي إلى اليوم الذي تصبحون فيه شباباً يحققون أحلامهم، تذكروا دائماً الشغف والوفاء.',
    mediaType: 'audio',
    locationName: 'الرياض، وادي حنيفة',
    sender: 'خالد (الأب)',
    audioDuration: '02:45'
  },
  {
    id: 'cap-2',
    title: 'ذكرى التخرج',
    unlockYear: 2025,
    unlockDate: '2025-06-15',
    timeLeftStr: 'تفتح بعد سنة واحدة',
    isUnlocked: false,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconType: 'orange',
    recipient: 'نفسي المستقبلية',
    message: 'لحظة تسلم وثيقة التخرج من جامعة الملك سعود مع زملائي، كانت مشاعر الفرح لا توصف وتطلعاتنا نحو المستقبل بلا حدود.',
    mediaType: 'text',
    locationName: 'جامعة الملك سعود، الدرعية',
    sender: 'خالد'
  },
  {
    id: 'cap-3',
    title: 'أول مشروع تقني',
    unlockYear: 2027,
    unlockDate: '2027-11-20',
    timeLeftStr: 'تفتح بعد ٣ سنوات',
    isUnlocked: false,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconType: 'blue',
    recipient: 'فريق العمل',
    message: 'كواليس إطلاق أول منصة برمجية لنا من مقهى هادئ في التحلية، تحديات كثيرة وفخر عظيم بما بنيناه.',
    mediaType: 'audio',
    locationName: 'الرياض، شارع التحلية',
    sender: 'خالد'
  },
  {
    id: 'cap-4',
    title: 'رحلة جبال السودة',
    unlockYear: 2024,
    unlockDate: '2024-08-01',
    timeLeftStr: 'مفتوحة الآن!',
    isUnlocked: true,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    iconType: 'emerald',
    recipient: 'العائلة',
    message: 'تجمعنا في أعلى قمة بين الضباب ورائحة العرعر والقهوة السعودية، ذكرى لا تنسى أبداً.',
    mediaType: 'photo',
    locationName: 'أبها، السودة',
    sender: 'خالد'
  }
];

export const INITIAL_TRACES: Trace[] = [
  {
    id: 'trace-1',
    title: 'مكان العمل الأول',
    location: 'الرياض، العليا',
    city: 'الرياض',
    category: 'audio',
    timeAgo: 'نشط الآن',
    audioDuration: '01:34',
    snippet: 'كانت هذه أول مرة أدخل فيها إلى هذا المبنى بحقيبة مليئة بالطموح والأفكار...',
    author: 'خالد',
    authorAvatar: USER_AVATAR,
    likes: 42,
    coordinates: { x: 48, y: 42 },
    colorTheme: 'blue',
    tags: ['عمل', 'ذكريات', 'البدايات'],
    dateCreated: '2024-02-10'
  },
  {
    id: 'trace-2',
    title: 'أثر مرسوم في الرياض',
    location: 'الرياض، حي السفارات',
    city: 'الرياض',
    category: 'draw',
    timeAgo: 'قبل ساعتين',
    snippet: 'مخطط يدوي لحديقة الصخور والظلال في وقت الغروب.',
    author: 'ريم الشهري',
    likes: 18,
    coordinates: { x: 35, y: 55 },
    colorTheme: 'green',
    tags: ['فنون', 'حدائق'],
    dateCreated: '2024-05-18'
  },
  {
    id: 'trace-3',
    title: 'قصة صوتية في جدة',
    location: 'جدة، البلد التاريخية',
    city: 'جدة',
    category: 'audio',
    timeAgo: 'قبل ٤ ساعات',
    audioDuration: '03:12',
    snippet: 'صوت أمواج البحر والروشان الحجازي القديم في أزقة حارة المظلوم.',
    author: 'فيصل باحارث',
    likes: 67,
    coordinates: { x: 22, y: 70 },
    colorTheme: 'blue',
    tags: ['تراث', 'بحر'],
    dateCreated: '2024-05-18'
  },
  {
    id: 'trace-4',
    title: 'همسة في مدائن صالح',
    location: 'العلا، الحِجر',
    city: 'العلا',
    category: 'text',
    timeAgo: 'قبل يومين',
    snippet: 'هيبة المكان وحكايا التاريخ المنحوتة في الصخر تلامس الوجدان وتذكرنا بعظمة الأثر.',
    author: 'نورة المنصور',
    likes: 124,
    coordinates: { x: 18, y: 25 },
    colorTheme: 'orange',
    tags: ['العلا', 'تاريخ', 'تأمل'],
    dateCreated: '2024-05-16'
  },
  {
    id: 'trace-5',
    title: 'أثر شاطئ نصف القمر',
    location: 'الخبر، الشرقية',
    city: 'الخبر',
    category: 'audio',
    timeAgo: 'قبل ٣ أيام',
    audioDuration: '00:58',
    snippet: 'هدوء الخليج مع شروق الشمس وأصوات النوارس في الصباح الباكر.',
    author: 'سعود الدوسري',
    likes: 31,
    coordinates: { x: 78, y: 38 },
    colorTheme: 'blue',
    tags: ['طبيعة', 'بحر'],
    dateCreated: '2024-05-15'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'أثر جديد قريب منك',
    message: 'قام شخص ما بترك أثر صوتي على بعد 300 متر في حي العليا.',
    timeAgo: 'منذ 10 دقائق',
    type: 'trace',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'اقترب موعد كبسولة 2025',
    message: 'تبقى أقل من 300 يوم على فتح كبسولة "ذكرى التخرج".',
    timeAgo: 'منذ يومين',
    type: 'capsule',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'تفاعل جديد مع قصتك',
    message: 'أعجب 5 أشخاص بأثرك الصوتي "مكان العمل الأول".',
    timeAgo: 'منذ 4 ساعات',
    type: 'like',
    isRead: true
  }
];
