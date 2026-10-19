// Dictionaries and language metadata. Server-safe: no "use client", no React.
// lib/i18n.tsx (client) re-exports these for existing client components.

export type Lang = "en" | "ar" | "fr";

export const en = {
  dir: "ltr" as "ltr" | "rtl",
  meta: {
    title: "Online Quran Classes for Kids & Adults | Musbak Academy",
    description:
      "Live online Quran, Tajweed, Hifz, Arabic and school subject classes for kids and adults (ages 4+). Qualified tutors, 1-on-1 or small groups. Book a free trial on WhatsApp.",
  },
  seo: {
    catalogTitle:
      "All Courses: Quran, Arabic & School Subjects | Musbak Academy",
    catalogH1: "Explore our courses",
    catalogSub:
      "Explore 17 live online courses in Quran memorization, Tajweed, Arabic, Islamic sciences and school subjects for kids and adults, ages 4 and up.",
    home: "Home",
    courses: "Courses",
    backToCourses: "Back to all courses",
    trialNote: "Free trial class · No card required",
    notFoundTitle: "Page not found",
    notFoundBody:
      "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    notFoundCta: "Chat with us on WhatsApp",
  },
  nav: {
    programs: "Programs",
    how: "How it works",
    why: "Why Musbak",
    pricing: "Pricing",
    testimonials: "Reviews",
    faq: "FAQ",
    cta: "Book a Free Trial",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLang: "Switch language",
    signIn: "Sign in",
  },
  wa: {
    general:
      "Assalamu alaykum! I'd like to know more about Musbak International Academy.",
    trial: "Assalamu alaykum! I'd like to book a free trial class.",
    pricing:
      "Assalamu alaykum! I'd like to ask about pricing and plans at Musbak Academy.",
    plan: (plan: string) =>
      `Assalamu alaykum! I'm interested in the ${plan} plan. Please share the details.`,
    enroll:
      "Assalamu alaykum! I want to become a student at Musbak International Academy. How do I enroll?",
    learn: (course: string) =>
      `Assalamu alaykum! I want to learn ${course} at Musbak Academy. Please tell me more.`,
    track: (track: string) =>
      `Assalamu alaykum! I'm interested in the ${track} track. Please share the details.`,
  },
  hero: {
    badge: "Enrolment open · Kids & adults · Ages 4+",
    question1: "Do you want to learn the",
    questionAccent: "Qur'an, Arabic,",
    question2: "or excel in school?",
    sub: "Live online classes with qualified tutors for kids and adults, ages 4 and up. 1-on-1 or in small groups, from anywhere in the world.",
    videoLabel: "Watch what Musbak is all about",
    videoCaption: "Everything you need to know about the academy, in 2 minutes.",
    unmute: "Tap for sound",
    covered1: "Musbak International Academy",
    coveredAccent: "has you covered.",
    coursesLabel: "We offer these courses",
    selectPlaceholder: "Choose a course...",
    learn: "Learn",
    micro1Title: "Next lesson",
    micro1Detail: "Tajweed · Today, 17:00",
    micro2: "Progress report sent",
    cta1: "Book a Free Trial",
    cta2: "Become a Student",
    trust: [
      { k: "100+", v: "Students taught" },
      { k: "7+", v: "Countries reached" },
      { k: "EN·AR·FR", v: "Teaching languages" },
      { k: "$0", v: "Free trial, no card required" },
    ],
    stats: [
      { k: "15+", v: "Subjects taught" },
      { k: "4+", v: "From age 4 to adults" },
      { k: "1-on-1", v: "& small group classes" },
      { k: "100%", v: "Live, online, interactive" },
    ],
    courses: [
      {
        group: "Qur'an & Islamic Sciences",
        items: [
          "Qur'an Memorization (Hifz)",
          "Tajweed",
          "Tafsir",
          "Arabic Language",
          "Nahw",
          "Sarf",
          "Tawheed",
          "Fiqh",
          "Adab",
          "Seerah",
          "Islamic Studies",
        ],
      },
      {
        group: "Academic Subjects",
        items: [
          "English Language",
          "Mathematics",
          "Biology",
          "Chemistry",
          "Physics",
          "General School Curriculum",
        ],
      },
    ],
  },
  marquee: [
    "Qur'an Memorization",
    "Tajweed",
    "Tafsir",
    "Arabic Language",
    "Nahw",
    "Sarf",
    "Tawheed",
    "Fiqh",
    "Adab",
    "Seerah",
    "Islamic Studies",
    "English",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
  ],
  risk: {
    items: [
      "Free trial",
      "No payment details required",
      "Switch teachers anytime",
    ],
  },
  about: {
    eyebrow: "About Musbak",
    badge: "500+ classes delivered",
    title: "One academy. Two worlds of knowledge.",
    p1: "Musbak International Academy is an online school where children and adults learn the Qur'an, Arabic and Islamic sciences alongside the Western school curriculum: live, personal, and from the comfort of home.",
    p2: "Whether it's a 5-year-old starting Qaida, a teen preparing for exams, or an adult beginning their hifz journey, every student gets a plan, a tutor, and a schedule built around them.",
    points: [
      "Qualified & vetted tutors",
      "Personal learning plans",
      "Flexible, timezone-friendly schedules",
      "Progress reports for parents",
    ],
  },
  tracks: {
    eyebrow: "Programs",
    title: "Three tracks. One journey.",
    sub: "Pick a track, or mix them. Your plan is built around your goals.",
    startLabel: "Start this track",
    items: [
      {
        tag: "Track 01",
        title: "Qur'an Memorization (Hifz)",
        desc: "A structured memorization journey with daily revision, tajweed correction and retention tracking, from Juz 'Amma to the entire Qur'an.",
        chips: [
          "Personal hifz plan",
          "Tajweed & makharij",
          "Revision system",
          "Ijazah pathway",
        ],
      },
      {
        tag: "Track 02",
        title: "Arabic & Islamic Sciences",
        desc: "From your first Arabic letters to classical texts: a complete curriculum in language and sacred knowledge.",
        chips: [
          "Arabic Language",
          "Tajweed",
          "Tafsir",
          "Nahw",
          "Sarf",
          "Tawheed",
          "Fiqh",
          "Adab",
          "Seerah",
          "Islamic Studies",
        ],
      },
      {
        tag: "Track 03",
        title: "Academic & School Subjects",
        desc: "Live tutoring that supports schoolwork and exam prep, aligned with your child's curriculum.",
        chips: [
          "English Language",
          "Mathematics",
          "Biology",
          "Chemistry",
          "Physics",
          "Curriculum support",
        ],
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "From first message to first class, in a day.",
    steps: [
      {
        title: "Say salaam on WhatsApp",
        desc: "Tell us what you or your child would like to learn. We reply within hours.",
      },
      {
        title: "Free trial & assessment",
        desc: "Meet your tutor in a real class and get a friendly level assessment.",
      },
      {
        title: "Get your personal plan",
        desc: "Tutor, schedule and curriculum matched to your goals and time zone.",
      },
      {
        title: "Learn, track, grow",
        desc: "Live classes with progress tracking and regular feedback for you or your child.",
      },
    ],
  },
  hadith: {
    label: "The Prophet ﷺ said:",
    ar: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    en: "“Whoever travels a path seeking knowledge, Allah makes easy for him a path to Paradise.”",
    source: "Sahih Muslim",
  },
  why: {
    eyebrow: "Why Musbak",
    title: "Built for real families and real schedules.",
    features: [
      {
        title: "Qualified, vetted tutors",
        desc: "Every tutor is screened for knowledge, teaching skill and character. Many hold ijazah and university degrees.",
      },
      {
        title: "1-on-1 & small groups",
        desc: "Choose focused private classes or learn with a small, motivated group.",
      },
      {
        title: "Flexible scheduling",
        desc: "Morning or evening, weekday or weekend, classes fit your time zone and your life.",
      },
      {
        title: "Ages 4 to adult",
        desc: "Playful, patient teaching for kids; structured, goal-driven tracks for teens and adults.",
      },
      {
        title: "Parent progress reports",
        desc: "Regular updates on attendance, memorization and milestones, straight to your WhatsApp.",
      },
      {
        title: "Simple, safe tech",
        desc: "Classes on Zoom or Google Meet, everything else on WhatsApp. No complicated platforms.",
      },
    ],
  },
  tutors: {
    eyebrow: "Our tutors",
    title: "Learn with teachers who care.",
    sub: "A carefully selected team of Qur'an, Arabic and school-subject specialists, with male and female tutors available.",
    items: [
      { name: "Ustadha Khadija", role: "Qur'an & Tajweed" },
      { name: "Ustadh Yusuf", role: "Hifz & Qira'at" },
      { name: "Ustadha Maryam", role: "Arabic & Islamic Studies" },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple plans, honest pricing.",
    sub: "Every plan starts with a free trial class. Final pricing depends on subjects and frequency. Message us and we'll build your plan.",
    plans: [
      {
        name: "Group Classes",
        price: "From $15",
        per: "/month",
        desc: "Learn with a small group of motivated students.",
        features: [
          "Small groups (max 6)",
          "Live interactive classes",
          "Weekly schedule",
          "Class recordings access",
        ],
        cta: "Ask about Group",
        popular: false,
        badge: "",
      },
      {
        name: "1-on-1 Classes",
        price: "From $40",
        per: "/month",
        desc: "A private tutor, fully focused on you or your child.",
        features: [
          "Private tutor",
          "Fully flexible schedule",
          "Personal curriculum",
          "Monthly progress report",
        ],
        cta: "Ask about 1-on-1",
        popular: true,
        badge: "Most popular",
      },
      {
        name: "Family & Hifz Intensive",
        price: "Custom",
        per: "",
        desc: "Bundles for siblings, intensive hifz and multi-subject plans.",
        features: [
          "Multi-student discounts",
          "Intensive hifz options",
          "Mix any subjects",
          "Priority tutor matching",
        ],
        cta: "Build my plan",
        popular: false,
        badge: "",
      },
    ],
    note: "Starting prices shown. Your exact quote depends on your plan. Chat with us on WhatsApp.",
    payments: "Payments: bank transfer · Paystack · Flutterwave · international cards",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Loved by students and parents.",
    disclaimer: "Sample messages. Parent reviews will be added when they are available.",
    items: [
      {
        quote:
          "My 7-year-old went from struggling with the alphabet to reading Surah Al-Mulk on her own in four months. The teacher's patience is unreal.",
        name: "Umm Maryam",
        role: "Parent · United Kingdom",
      },
      {
        quote:
          "I started hifz at 34 thinking it was too late. My tutor built a plan around my job and I've completed five ajza'. Alhamdulillah.",
        name: "Abu Bakr",
        role: "Hifz student · Nigeria",
      },
      {
        quote:
          "Musbak handles my son's Qur'an, Arabic and maths in one place. One WhatsApp message and everything is sorted.",
        name: "Fatima",
        role: "Parent · Canada",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What ages do you teach?",
        a: "From 4 years old to adults. Kids get playful, patient teachers; teens and adults get structured, goal-based tracks.",
      },
      {
        q: "How do the online classes work?",
        a: "Classes are live on Zoom or Google Meet. After you book on WhatsApp, we send you a link. Just click and join. No special software needed.",
      },
      {
        q: "Is the trial class really free?",
        a: "Yes. One full trial class with a real tutor, plus a level assessment. No payment, no commitment.",
      },
      {
        q: "Can I combine Qur'an with school subjects?",
        a: "Absolutely. Many students mix tracks, like hifz twice a week plus maths tutoring, for example. We build one schedule around you.",
      },
      {
        q: "Which languages do you teach in?",
        a: "Our tutors teach in both English and Arabic. Tell us your preference when you message us.",
      },
      {
        q: "How do payments work?",
        a: "We accept bank transfer, Paystack, Flutterwave and international cards. Payment details are shared once your plan is confirmed on WhatsApp.",
      },
    ],
  },
  cta: {
    title: "Your first class is on us.",
    sub: "Message us on WhatsApp today: meet a tutor, try a real class, and see the Musbak difference for yourself.",
    button: "Book a Free Trial",
    secondary: "See pricing",
    small: "Free trial · No commitment · Kids & adults",
  },
  landing: {
   hero: {
  kicker: "WELCOME TO MUSBAK ACADEMY",
  line1: "Where your",
  line2: "knowledge journey begins.",
  mobileLine2: "knowledge",
  mobileLine3: "journey begins.",
  seeInAction: "See Musbak in Action",
  sub: "Qur'an, Arabic, Islamic Sciences and Academic Excellence, taught personally wherever you are.",
  primary: "Explore the Academy",
  secondary: "Book a Free Trial",
  scroll: "Scroll",
},
    paths: {
      title: "Two paths. One foundation.",
      note: "Rooted in Qur'an and character, each path strengthens the other.",
      divine: {
        label: "Divine Knowledge",
        items: ["Qur'an", "Hifz", "Tajweed", "Arabic", "Islamic Sciences"],
      },
      academic: {
        label: "Academic Excellence",
        items: ["English", "Mathematics", "Biology", "Chemistry", "Physics", "School Support"],
      },
    },
    journey: {
      title: "The Musbak journey.",
      steps: [
        { num: "01", title: "Discover", desc: "Assessment and goals." },
        { num: "02", title: "Begin", desc: "Tutor + personal learning plan." },
        { num: "03", title: "Build", desc: "Lessons + practice + revision." },
        { num: "04", title: "Progress", desc: "Feedback + milestones." },
        { num: "05", title: "Master", desc: "Confidence + independence + achievement." },
      ],
    },
    proof: {
      title: "Don't just take our word for it.",
      sub: "See learning in action.",
      captions: [
        "Qur'an reading, live",
        "Hifz session",
        "One-on-one tutoring",
        "Arabic immersion",
        "Academic support",
        "Teacher feedback",
      ],
    },
    quran: {
      verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      verseRef: "Qur'an 20:114",
      title: "The Qur'an, at the heart of it all.",
      sub: "Learn step by step, at your pace, from first letters to full memorization with teachers who love what they teach.",
      items: [
        { name: "Qur'an Reading", desc: "From the alphabet to fluent recitation." },
        { name: "Tajweed", desc: "The rules of beautiful, correct recitation." },
        { name: "Hifz", desc: "Structured memorization that lasts." },
        { name: "Revision", desc: "Keep what you have, strengthen the weak points." },
        { name: "Ijazah Pathway", desc: "Recite to a certified chain of transmission." },
      ],
    },
    curriculum: {
      title: "Explore the curriculum.",
      sub: "Every subject follows a clear path, from first steps to mastery.",
      paths: [
        { label: "Qur'an", steps: ["Reading", "Tajweed", "Hifz", "Revision", "Ijazah"] },
        { label: "Arabic", steps: ["Foundation", "Nahw", "Sarf", "Classical Arabic"] },
        { label: "Islamic Sciences", steps: ["Foundations", "Aqeedah", "Fiqh", "Seerah"] },
        { label: "Academic Subjects", steps: ["Primary", "Secondary", "Exam Preparation"] },
      ],
    },
    teachers: {
      title: "Our team of qualified tutors.",
      sub: "Meet our dedicated team of tutors, committed to providing quality education in Islamic studies, Qur'anic studies, Arabic language, and other academic subjects.",
      items: [
        {
          name: "Ustadh Luqman",
          gender: "male",
          creds: "PhD in View",
        },
        {
          name: "Ustadha Muhsinah",
          gender: "female",
          creds: "B.A. in Arabic Language",
        },
        {
          name: "Ustadh Badirudeen",
          gender: "male",
          creds: "M.A. in Shariah Law",
        },
        {
          name: "Ustadh Abdulmumin",
          gender: "male",
          creds: "Holder of an Ijazah in Qur'an Memorisation",
        },
        {
          name: "Ustadh Sideeq",
          gender: "male",
          creds:
            "Holder of an Ijazah in the Seven Qira'at (Qur'anic Recitation Traditions)",
        },
        {
          name: "Ustadha Aminah",
          gender: "female",
          creds: "",
        },
        {
          name: "Ustadh Abdullateef",
          gender: "male",
          creds: "B.Sc. Degree Holder",
        },
        {
          name: "Ustadh Abdulmujeeb",
          gender: "male",
          creds: "B.A. in Combined Law",
        },
      ],
    },
    globe: {
      title: "Knowledge has no timezone.",
      sub: "Students join us from around the world and receive the same care from the same teachers, across time zones.",
      regions: ["United Kingdom", "Nigeria", "Saudi Arabia", "United States", "France", "United Arab Emirates"],
    },
    portal: {
      title: "Your learning. One place.",
      sub: "Students, parents and teachers can all follow lessons, progress and feedback.",
      badge: "Coming soon",
      tabs: [
        { label: "Student Portal", points: ["Qur'an progress", "Upcoming lessons", "Attendance", "Academic progress", "Milestones"] },
        { label: "Parent Portal", points: ["Your child's progress", "Teacher notes", "Schedule & billing", "Milestones reached"] },
        { label: "Teacher Portal", points: ["Today's classes", "Student feedback", "Progress reports", "Lesson plans"] },
      ],
    },
    why: {
      title: "Why families choose Musbak.",
      items: [
        { title: "Qualified tutors", desc: "Screened for knowledge, teaching skill and character. Many hold ijazah and university degrees." },
        { title: "Personal learning plans", desc: "Every student starts with a plan built around their level, goals and pace." },
        { title: "Flexible schedules", desc: "Choose morning, evening or weekend classes that fit your family." },
        { title: "Progress tracking", desc: "You always know where your child stands and what comes next." },
        { title: "1-on-1 & small groups", desc: "Choose focused private classes or a small, motivated group." },
        { title: "Global accessibility", desc: "Wherever you live, a qualified teacher meets you online." },
      ],
    },
    cta: {
      title: "Your first step starts here.",
      sub: "Meet a tutor. Experience a real class. Begin your learning journey.",
      primary: "Book a Free Trial",
      secondary: "Explore Programs",
    },
  },
  footer: {
    about:
      "Live online classes in Qur'an, Arabic, Islamic sciences and school subjects for kids and adults, ages 4 and up.",
    programs: "Programs",
    academy: "Academy",
    contact: "Contact",
    rights: "Musbak International Academy. All rights reserved.",
    whatsappLabel: "WhatsApp",
    follow: "Follow us",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    admissions: "Admissions",
    teachers: "Teachers",
    portals: "Portals",
    studentPortal: "Student Portal",
    parentPortal: "Parent Portal",
    teacherPortal: "Teacher Portal",
  },
  float: "Chat on WhatsApp",
  floatTooltip: "Questions? Chat with us",
  floatDismiss: "Dismiss",
  barDismiss: "Dismiss offer bar",
};

export type Dict = typeof en;

export const ar: Dict = {
  dir: "rtl" as const,
  meta: {
    title: "تعلم القرآن الكريم أونلاين مع معلمين مجازين | أكاديمية مسباق",
    description:
      "حصص مباشرة عبر الإنترنت في القرآن الكريم والتجويد والتحفيظ واللغة العربية والمواد الدراسية للأطفال والكبار من سن 4 سنوات. معلمون مؤهلون، حصص فردية أو مجموعات صغيرة. احجز حصتك التجريبية عبر واتساب.",
  },
  seo: {
    catalogTitle: "جميع الدورات: القرآن والعربية والمواد الدراسية | أكاديمية مسباق",
    catalogH1: "استكشف دوراتنا",
    catalogSub:
      "اكتشف 17 دورة مباشرة عبر الإنترنت في تحفيظ القرآن والتجويد واللغة العربية والعلوم الشرعية والمواد الدراسية، للأطفال والكبار من سن 4 سنوات فما فوق.",
    home: "الرئيسية",
    courses: "الدورات",
    backToCourses: "العودة إلى كل الدورات",
    trialNote: "حصة تجريبية مجانية · بدون بطاقة",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لنعِدك إلى المسار الصحيح.",
    notFoundCta: "تحدث معنا على واتساب",
  },
  nav: {
    programs: "البرامج",
    how: "كيف تبدأ",
    why: "لماذا مسباق",
    pricing: "الأسعار",
    testimonials: "آراء الطلاب",
    faq: "الأسئلة الشائعة",
    cta: "احجز حصة تجريبية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLang: "تغيير اللغة",
    signIn: "تسجيل الدخول",
  },
  wa: {
    general: "السلام عليكم، أود معرفة المزيد عن أكاديمية مسباق العالمية.",
    trial: "السلام عليكم، أود حجز حصة تجريبية مجانية.",
    pricing: "السلام عليكم، أود الاستفسار عن الأسعار والخطط في أكاديمية مسباق.",
    plan: (plan: string) =>
      `السلام عليكم، أنا مهتم بخطة ${plan}. أرجو مشاركة التفاصيل.`,
    enroll:
      "السلام عليكم، أريد أن أصبح طالبًا في أكاديمية مسباق العالمية. كيف أُسجّل؟",
    learn: (course: string) =>
      `السلام عليكم، أريد تعلم ${course} في أكاديمية مسباق. أرجو مشاركة المزيد.`,
    track: (track: string) =>
      `السلام عليكم، أنا مهتم بمسار ${track}. أرجو مشاركة التفاصيل.`,
  },
  hero: {
    badge: "التسجيل مفتوح · أطفال وكبار · من سن 4 سنوات",
    question1: "هل تريد تعلّم",
    questionAccent: "القرآن والعربية",
    question2: "أو التفوق دراسيًا؟",
    sub: "حصص مباشرة عبر الإنترنت مع معلمين مؤهلين للأطفال والكبار من سن 4 سنوات، فردية أو في مجموعات صغيرة، من أي مكان في العالم.",
    videoLabel: "شاهد ما تقدمه مسباق",
    videoCaption: "كل ما تحتاج معرفته عن الأكاديمية في أقل من دقيقة.",
    unmute: "اضغط لتشغيل الصوت",
    covered1: "أكاديمية مسباق العالمية",
    coveredAccent: "معك.",
    coursesLabel: "نقدم هذه الدورات",
    selectPlaceholder: "اختر دورة...",
    learn: "تعلّم",
    micro1Title: "الحصة القادمة",
    micro1Detail: "التجويد · اليوم، 17:00",
    micro2: "تم إرسال تقرير التقدم",
    cta1: "احجز حصة تجريبية",
    cta2: "كن طالبًا",
    trust: [
      { k: "+100", v: "طالب ندرّسهم" },
      { k: "+7", v: "دولة حول العالم" },
      { k: "EN·AR·FR", v: "لغات التدريس" },
      { k: "$0", v: "تجربة مجانية بلا بطاقة" },
    ],
    stats: [
      { k: "+15", v: "مادة دراسية" },
      { k: "+4", v: "سنوات، حتى الكبار" },
      { k: "فردية", v: "ومجموعات صغيرة" },
      { k: "100%", v: "تعليم مباشر تفاعلي" },
    ],
    courses: [
      {
        group: "القرآن والعلوم الشرعية",
        items: [
          "تحفيظ القرآن",
          "التجويد",
          "التفسير",
          "اللغة العربية",
          "النحو",
          "الصرف",
          "التوحيد",
          "الفقه",
          "الأدب",
          "السيرة",
          "الدراسات الإسلامية",
        ],
      },
      {
        group: "المواد الدراسية",
        items: [
          "اللغة الإنجليزية",
          "الرياضيات",
          "الأحياء",
          "الكيمياء",
          "الفيزياء",
          "المنهج الدراسي العام",
        ],
      },
    ],
  },
  marquee: [
    "تحفيظ القرآن",
    "التجويد",
    "التفسير",
    "اللغة العربية",
    "النحو",
    "الصرف",
    "التوحيد",
    "الفقه",
    "الأدب",
    "السيرة",
    "الدراسات الإسلامية",
    "الإنجليزية",
    "الرياضيات",
    "الأحياء",
    "الكيمياء",
    "الفيزياء",
  ],
  risk: {
    items: ["حصة تجريبية", "بدون بيانات دفع", "بدّل المعلم في أي وقت"],
  },
  about: {
    eyebrow: "عن مسباق",
    badge: "+500 حصة مُقدَّمة",
    title: "أكاديمية واحدة. عالمان من العلم.",
    p1: "أكاديمية مسباق العالمية مدرسة إلكترونية يتعلم فيها الأطفال والكبار القرآن والعربية والعلوم الشرعية إلى جانب المناهج الدراسية: مباشرةً وبأسلوب شخصي ومن راحة البيت.",
    p2: "سواء كان طفلًا في الخامسة يبدأ القاعدة، أو مراهقًا يستعد للامتحانات، أو بالغًا يبدأ رحلة الحفظ، لكل طالب خطة ومعلم وجدول مصمم حوله.",
    points: [
      "معلمون مؤهلون ومنتقون",
      "خطط تعلم شخصية",
      "جداول مرنة تناسب منطقتك الزمنية",
      "تقارير متابعة لأولياء الأمور",
    ],
  },
  tracks: {
    eyebrow: "البرامج",
    title: "ثلاثة مسارات. رحلة واحدة.",
    sub: "اختر مسارًا أو اجمع بينها. خطة التعلم تُبنى حول أهدافك.",
    startLabel: "ابدأ هذا المسار",
    items: [
      {
        tag: "المسار ٠١",
        title: "تحفيظ القرآن الكريم",
        desc: "رحلة حفظ منظمة مع مراجعة يومية وتصحيح للتجويد ومتابعة للإتقان، من جزء عمّ إلى ختم القرآن كاملًا.",
        chips: [
          "خطة حفظ شخصية",
          "التجويد والمخارج",
          "نظام مراجعة",
          "مسار الإجازة",
        ],
      },
      {
        tag: "المسار ٠٢",
        title: "العربية والعلوم الشرعية",
        desc: "من أول الحروف العربية إلى النصوص الأصيلة: منهج متكامل في اللغة والعلوم الشرعية.",
        chips: [
          "اللغة العربية",
          "التجويد",
          "التفسير",
          "النحو",
          "الصرف",
          "التوحيد",
          "الفقه",
          "الأدب",
          "السيرة",
          "الدراسات الإسلامية",
        ],
      },
      {
        tag: "المسار ٠٣",
        title: "المواد الدراسية والأكاديمية",
        desc: "دعم مباشر للواجبات والاستعداد للامتحانات وفق منهج مدرسة طفلك.",
        chips: [
          "اللغة الإنجليزية",
          "الرياضيات",
          "الأحياء",
          "الكيمياء",
          "الفيزياء",
          "دعم المنهج الدراسي",
        ],
      },
    ],
  },
  how: {
    eyebrow: "كيف تبدأ",
    title: "من أول رسالة إلى أول حصة في يوم واحد.",
    steps: [
      {
        title: "راسلنا على واتساب",
        desc: "أخبرنا ماذا تريد أن تتعلم أنت أو طفلك، وسنرد خلال ساعات.",
      },
      {
        title: "حصة تجريبية وتقييم",
        desc: "قابل معلمك في حصة حقيقية واحصل على تقييم ودود لمستواك.",
      },
      {
        title: "استلم خطتك الشخصية",
        desc: "نطابق لك المعلم والجدول والمنهج حسب أهدافك ومنطقتك الزمنية.",
      },
      {
        title: "تعلم وتقدَّم",
        desc: "حصص مباشرة مع متابعة للتقدم وتقارير منتظمة لك أو لطفلك.",
      },
    ],
  },
  hadith: {
    label: "قال رسول الله ﷺ:",
    ar: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    en: "",
    source: "رواه مسلم",
  },
  why: {
    eyebrow: "لماذا مسباق",
    title: "صُممت للعائلات والجداول الحقيقية.",
    features: [
      {
        title: "معلمون مؤهلون",
        desc: "ننتقي معلمينا بعناية من حيث العلم ومهارة التدريس والخلق، وكثير منهم حاصلون على الإجازة وشهادات جامعية.",
      },
      {
        title: "فردية ومجموعات صغيرة",
        desc: "اختر حصصًا خاصة مركزة أو تعلم مع مجموعة صغيرة متحمسة.",
      },
      {
        title: "جداول مرنة",
        desc: "صباحًا أو مساءً، في الأسبوع أو العطلة، الحصص تناسب منطقتك الزمنية وحياتك.",
      },
      {
        title: "من 4 سنوات إلى الكبار",
        desc: "تعليم ممتع وصبور للأطفال، ومسارات منظمة هادفة للمراهقين والكبار.",
      },
      {
        title: "تقارير لأولياء الأمور",
        desc: "تحديثات منتظمة عن الحضور والحفظ والإنجازات، مباشرة إلى واتساب.",
      },
      {
        title: "تقنية بسيطة وآمنة",
        desc: "الحصص عبر Zoom أو Google Meet، وكل شيء آخر عبر واتساب. بلا منصات معقدة.",
      },
    ],
  },
  tutors: {
    eyebrow: "معلمونا",
    title: "تعلم مع معلمين يهتمون بك.",
    sub: "فريق مختار بعناية من متخصصي القرآن والعربية والمواد الدراسية، ويضم معلمين ومعلمات.",
    items: [
      { name: "أ. خديجة", role: "القرآن والتجويد" },
      { name: "أ. يوسف", role: "التحفيظ والقراءات" },
      { name: "أ. مريم", role: "العربية والعلوم الشرعية" },
    ],
  },
  pricing: {
    eyebrow: "الأسعار",
    title: "خطط بسيطة وأسعار واضحة.",
    sub: "كل خطة تبدأ بحصة تجريبية مجانية. السعر النهائي يعتمد على المواد وعدد الحصص. راسلنا ونبني لك خطتك.",
    plans: [
      {
        name: "المجموعات",
        price: "ابتداءً من $15",
        per: "/شهريًا",
        desc: "تعلم مع مجموعة صغيرة من الطلاب المتحمسين.",
        features: [
          "مجموعات صغيرة (6 كحد أقصى)",
          "حصص مباشرة تفاعلية",
          "جدول أسبوعي",
          "الوصول إلى التسجيلات",
        ],
        cta: "اسأل عن المجموعات",
        popular: false,
        badge: "",
      },
      {
        name: "حصص فردية",
        price: "ابتداءً من $40",
        per: "/شهريًا",
        desc: "معلم خاص يركز عليك أو على طفلك بالكامل.",
        features: [
          "معلم خاص",
          "جدول مرن بالكامل",
          "منهج شخصي",
          "تقرير تقدم شهري",
        ],
        cta: "اسأل عن الحصص الفردية",
        popular: true,
        badge: "الأكثر طلبًا",
      },
      {
        name: "العائلة والحفظ المكثف",
        price: "حسب الخطة",
        per: "",
        desc: "باقات للإخوة والحفظ المكثف والخطط متعددة المواد.",
        features: [
          "خصومات للإخوة",
          "خيارات حفظ مكثفة",
          "اجمع أي مواد",
          "أولوية في اختيار المعلم",
        ],
        cta: "ابنِ خطتي",
        popular: false,
        badge: "",
      },
    ],
    note: "الأسعار المعروضة أسعار ابتدائية استرشادية. تواصل معنا على واتساب لمعرفة خطتك بالضبط.",
    payments: "الدفع: تحويل بنكي · Paystack · Flutterwave · بطاقات دولية",
  },
  testimonials: {
    eyebrow: "آراء الطلاب",
    title: "محبة من الطلاب وأولياء الأمور.",
    disclaimer: "هذه رسائل توضيحية. سنضيف آراء أولياء الأمور عند توفرها.",
    items: [
      {
        quote:
          "ابنتي ذات السبع سنوات انتقلت من التعثر في الحروف إلى قراءة سورة الملك وحدها في أربعة أشهر. صبر المعلمة لا يوصف.",
        name: "أم مريم",
        role: "ولية أمر · بريطانيا",
      },
      {
        quote:
          "بدأت الحفظ في الرابعة والثلاثين وظننت أن الوقت فات. بنى لي معلمي خطة حول عملي وأتممت خمسة أجزاء، الحمد لله.",
        name: "أبو بكر",
        role: "طالب حفظ · نيجيريا",
      },
      {
        quote:
          "مسباق يدير قرآن ابني وعربيته ورياضياته في مكان واحد. رسالة واتساب واحدة ويُرتَّب كل شيء.",
        name: "فاطمة",
        role: "ولية أمر · كندا",
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "أسئلة وأجوبة.",
    items: [
      {
        q: "ما الأعمار التي تدرّسونها؟",
        a: "من سن 4 سنوات إلى الكبار. للأطفال معلمون صبورون وأسلوب ممتع، وللمراهقين والكبار مسارات منظمة هادفة.",
      },
      {
        q: "كيف تجري الحصص عبر الإنترنت؟",
        a: "الحصص مباشرة عبر Zoom أو Google Meet. بعد الحجز عبر واتساب نرسل لك رابطًا، اضغط وانضم، دون برامج خاصة.",
      },
      {
        q: "هل الحصة التجريبية مجانية فعلًا؟",
        a: "نعم، حصة كاملة مع معلم حقيقي وتقييم للمستوى، دون دفع ودون التزام.",
      },
      {
        q: "هل يمكن الجمع بين القرآن والمواد الدراسية؟",
        a: "بالتأكيد. كثير من الطلاب يجمعون بين المسارات، كالحفظ مرتين أسبوعيًا مع دروس الرياضيات. نبني جدولًا واحدًا يناسبك.",
      },
      {
        q: "بأي لغة تتم الدراسة؟",
        a: "يدرّس معلمونا بالعربية والإنجليزية. أخبرنا بتفضيلك عند مراسلتنا.",
      },
      {
        q: "كيف تتم المدفوعات؟",
        a: "نقبل التحويل البنكي وPaystack وFlutterwave والبطاقات الدولية. تُرسل تفاصيل الدفع بعد تأكيد خطتك على واتساب.",
      },
    ],
  },
  cta: {
    title: "حصتك الأولى علينا.",
    sub: "راسلنا على واتساب اليوم: قابل معلمًا، جرّب حصة حقيقية، واكتشف الفرق بنفسك.",
    button: "احجز حصة تجريبية",
    secondary: "اطّلع على الأسعار",
    small: "حصة مجانية · بلا التزام · أطفال وكبار",
  },
  landing: {
   hero: {
  kicker: "مرحبًا بكم في أكاديمية مسباق",
  line1: "حيث تبدأ",
  line2: "رحلتك مع العلم.",
  mobileLine2: "رحلتك مع",
  mobileLine3: "العلم.",
  seeInAction: "شاهد مسباق في الواقع",
  sub: "القرآن والعربية والعلوم الشرعية والتميز الأكاديمي، بتعليم شخصي أينما كنت.",
  primary: "استكشف الأكاديمية",
  secondary: "احجز درسًا تجريبيًا مجانيًا",
  scroll: "مرّر",
},
    paths: {
      title: "طريقان. أساس واحد.",
      note: "يرتكز الطريقان على القرآن والخُلق، ويقوّي كل منهما الآخر.",
      divine: {
        label: "العلوم الشرعية",
        items: ["القرآن", "الحفظ", "التجويد", "العربية", "العلوم الإسلامية"],
      },
      academic: {
        label: "التميز الأكاديمي",
        items: ["الإنجليزية", "الرياضيات", "الأحياء", "الكيمياء", "الفيزياء", "الدعم المدرسي"],
      },
    },
    journey: {
      title: "رحلتك مع مسباق.",
      steps: [
        { num: "01", title: "الاكتشاف", desc: "التقييم وتحديد الأهداف." },
        { num: "02", title: "البداية", desc: "معلم وخطة تعلم شخصية." },
        { num: "03", title: "البناء", desc: "حصص وممارسة ومراجعة." },
        { num: "04", title: "التقدم", desc: "ملاحظات ومراحل محققة." },
        { num: "05", title: "الإتقان", desc: "ثقة واستقلالية وإنجاز." },
      ],
    },
    proof: {
      title: "لا تكتفِ بكلامنا.",
      sub: "شاهد التعلم على أرض الواقع.",
      captions: [
        "قراءة القرآن مباشرة",
        "حلقة تحفيظ",
        "تدريس فردي",
        "انغماس في العربية",
        "دعم أكاديمي",
        "ملاحظات المعلم",
      ],
    },
    quran: {
      verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      verseRef: "طه ١١٤",
      title: "القرآن في قلب كل شيء.",
      sub: "تعلّم خطوة بخطوة وعلى إيقاعك، من الحروف الأولى إلى ختم الحفظ، مع معلمين يحبون ما يعلّمون.",
      items: [
        { name: "قراءة القرآن", desc: "من الحروف إلى التلاوة المتقنة." },
        { name: "التجويد", desc: "أحكام التلاوة الصحيحة الجميلة." },
        { name: "الحفظ", desc: "حفظ منهجي يبقى ولا يتسرب." },
        { name: "المراجعة", desc: "تثبيت المحفوظ وتقوية مواضع الضعف." },
        { name: "مسار الإجازة", desc: "اعرض على معلم متصل السند." },
      ],
    },
    curriculum: {
      title: "استكشف المنهج.",
      sub: "لكل مادة طريق واضح يبدأ بالخطوات الأولى ويقود إلى الإتقان.",
      paths: [
        { label: "القرآن", steps: ["القراءة", "التجويد", "الحفظ", "المراجعة", "الإجازة"] },
        { label: "العربية", steps: ["التأسيس", "النحو", "الصرف", "الفصحى الكلاسيكية"] },
        { label: "العلوم الإسلامية", steps: ["التأسيس", "العقيدة", "الفقه", "السيرة"] },
        { label: "المواد الدراسية", steps: ["الابتدائي", "المتوسط والثانوي", "التحضير للامتحانات"] },
      ],
    },
    teachers: {
      title: "فريقنا من المعلمين المؤهلين.",
      sub: "تعرف على فريقنا المتفاني من المعلمين، الملتزمين بتقديم تعليم عالي الجودة في العلوم الإسلامية والدراسات القرآنية واللغة العربية والمواد الأكاديمية الأخرى.",
      items: [
        {
          name: "أ. لقمان",
          gender: "male",
          creds: "دكتوراه (قيد الإنجاز)",
        },
        {
          name: "أ. محسنة",
          gender: "female",
          creds: "بكالوريوس في اللغة العربية",
        },
        {
          name: "أ. بدر الدين",
          gender: "male",
          creds: "ماجستير في الشريعة",
        },
        {
          name: "أ. عبد المؤمن",
          gender: "male",
          creds: "حاصل على إجازة في حفظ القرآن",
        },
        {
          name: "أ. صديق",
          gender: "male",
          creds: "حاصل على إجازة في القراءات السبع",
        },
        {
          name: "أ. آمنة",
          gender: "female",
          creds: "",
        },
        {
          name: "أ. عبد اللطيف",
          gender: "male",
          creds: "حاصل على بكالوريوس العلوم",
        },
        {
          name: "أ. عبد المجيب",
          gender: "male",
          creds: "بكالوريوس في القانون المشترك",
        },
      ],
    },
    globe: {
      title: "للعلم لا توجد مناطق زمنية.",
      sub: "ينضم إلينا طلاب من أنحاء العالم ويحظون بالاهتمام نفسه من المعلمين أنفسهم في مختلف المناطق الزمنية.",
      regions: ["المملكة المتحدة", "نيجيريا", "السعودية", "الولايات المتحدة", "فرنسا", "الإمارات"],
    },
    portal: {
      title: "تعلمك. مكان واحد.",
      sub: "يمكن للطلاب وأولياء الأمور والمعلمين متابعة التقدم والحصص والملاحظات.",
      badge: "قريبًا",
      tabs: [
        { label: "بوابة الطالب", points: ["تقدم القرآن", "الحصص القادمة", "الحضور", "التقدم الأكاديمي", "الإنجازات"] },
        { label: "بوابة ولي الأمر", points: ["تقدم ابنك", "ملاحظات المعلم", "الجدول والفواتير", "المراحل المحققة"] },
        { label: "بوابة المعلم", points: ["حصص اليوم", "ملاحظات الطلاب", "تقارير التقدم", "خطط الدروس"] },
      ],
    },
    why: {
      title: "لماذا تختار العائلات مسباق.",
      items: [
        { title: "معلمون مؤهلون", desc: "نختار المعلمين لعلمهم ومهارتهم في التدريس وخُلقهم. ويحمل كثير منهم الإجازة وشهادات جامعية." },
        { title: "خطط تعلم شخصية", desc: "كل طالب يبدأ بخطة مبنية على مستواه وأهدافه وإيقاعه." },
        { title: "جداول مرنة", desc: "اختر حصصًا صباحية أو مسائية أو في نهاية الأسبوع بما يناسب عائلتك." },
        { title: "متابعة التقدم", desc: "تعرف دائمًا أين وصل ابنك وما الخطوة التالية." },
        { title: "فردية ومجموعات صغيرة", desc: "اختر حصصًا خاصة مركزة أو مجموعة صغيرة متحمسة." },
        { title: "وصول عالمي", desc: "أينما كنت، معلم مؤهل يلقاك عبر الإنترنت." },
      ],
    },
    cta: {
      title: "خطوتك الأولى تبدأ هنا.",
      sub: "قابل معلمًا. جرّب حصة حقيقية. ابدأ رحلة تعلمك.",
      primary: "احجز حصة تجريبية",
      secondary: "استكشف البرامج",
    },
  },
  footer: {
    about:
      "حصص مباشرة عبر الإنترنت في القرآن والعربية والعلوم الشرعية والمواد الدراسية للأطفال والكبار من سن 4 سنوات.",
    programs: "البرامج",
    academy: "الأكاديمية",
    contact: "تواصل معنا",
    rights: "أكاديمية مسباق العالمية. جميع الحقوق محفوظة.",
    whatsappLabel: "واتساب",
    follow: "تابعنا",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    admissions: "التسجيل",
    teachers: "المعلمون",
    portals: "البوابات",
    studentPortal: "بوابة الطالب",
    parentPortal: "بوابة ولي الأمر",
    teacherPortal: "بوابة المعلم",
  },
  float: "تواصل عبر واتساب",
  floatTooltip: "لديك سؤال؟ تحدث معنا",
  floatDismiss: "إغلاق",
  barDismiss: "إغلاق شريط العرض",
};

export const fr: Dict = {
  dir: "ltr",
  meta: {
    title: "Cours de Coran en ligne pour enfants et adultes | Académie Musbak",
    description:
      "Cours en direct du Coran, Tajwid, Hifz, arabe et matières scolaires pour enfants et adultes (dès 4 ans). Tuteurs qualifiés, en particulier ou en petits groupes. Réservez un essai gratuit sur WhatsApp.",
  },
  seo: {
    catalogTitle:
      "Tous les cours : Coran, arabe et matières scolaires | Académie Musbak",
    catalogH1: "Découvrez nos cours",
    catalogSub:
      "Découvrez 17 cours en ligne en direct : mémorisation du Coran, Tajwid, arabe, sciences islamiques et matières scolaires, pour enfants et adultes dès 4 ans.",
    home: "Accueil",
    courses: "Cours",
    backToCourses: "Retour à tous les cours",
    trialNote: "Cours d’essai gratuit · Sans carte",
    notFoundTitle: "Page introuvable",
    notFoundBody:
      "La page que vous cherchez n’existe pas ou a été déplacée. Remettons-nous sur le bon chemin.",
    notFoundCta: "Discutez avec nous sur WhatsApp",
  },
  nav: {
    programs: "Programmes",
    how: "Comment ça marche",
    why: "Pourquoi Musbak",
    pricing: "Tarifs",
    testimonials: "Témoignages",
    faq: "FAQ",
    cta: "Réserver un essai gratuit",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLang: "Changer de langue",
    signIn: "Connexion",
  },
  wa: {
    general:
      "Assalamu alaykum ! J’aimerais en savoir plus sur Musbak International Academy.",
    trial: "Assalamu alaykum ! J’aimerais réserver un cours d’essai gratuit.",
    pricing:
      "Assalamu alaykum ! J’aimerais me renseigner sur les tarifs et les formules de Musbak Academy.",
    plan: (plan: string) =>
      `Assalamu alaykum ! La formule ${plan} m’intéresse. Merci de m’envoyer les détails.`,
    enroll:
      "Assalamu alaykum ! Je veux devenir étudiant à Musbak International Academy. Comment m’inscrire ?",
    learn: (course: string) =>
      `Assalamu alaykum ! Je veux apprendre ${course} à Musbak Academy. Merci de m’en dire plus.`,
    track: (track: string) =>
      `Assalamu alaykum ! Le parcours « ${track} » m’intéresse. Merci de m’envoyer les détails.`,
  },
  hero: {
    badge: "Inscriptions ouvertes · Enfants & adultes · Dès 4 ans",
    question1: "Voulez-vous apprendre le",
    questionAccent: "Coran, l’arabe,",
    question2: "ou exceller à l’école ?",
    sub: "Des cours en ligne en direct avec des tuteurs qualifiés, pour enfants et adultes dès 4 ans, en particulier ou en petits groupes, où que vous soyez.",
    videoLabel: "Découvrez Musbak en vidéo",
    videoCaption: "Tout ce qu’il faut savoir sur l’académie, en 2 minutes.",
    unmute: "Appuyez pour le son",
    covered1: "Musbak International Academy",
    coveredAccent: "est là pour vous.",
    coursesLabel: "Nous proposons ces cours",
    selectPlaceholder: "Choisissez un cours...",
    learn: "Apprendre",
    micro1Title: "Prochain cours",
    micro1Detail: "Tajwid · Aujourd’hui, 17h00",
    micro2: "Rapport de progrès envoyé",
    cta1: "Réserver un essai gratuit",
    cta2: "Devenir étudiant",
    trust: [
      { k: "100+", v: "Élèves accompagnés" },
      { k: "7+", v: "Pays couverts" },
      { k: "EN·AR·FR", v: "Langues d’enseignement" },
      { k: "0 $", v: "Essai gratuit, sans carte" },
    ],
    stats: [
      { k: "15+", v: "Matières enseignées" },
      { k: "4+", v: "De 4 ans aux adultes" },
      { k: "1-on-1", v: "& petits groupes" },
      { k: "100%", v: "En direct et interactif" },
    ],
    courses: [
      {
        group: "Coran & sciences islamiques",
        items: [
          "Mémorisation du Coran (Hifz)",
          "Tajwid",
          "Tafsir",
          "Langue arabe",
          "Nahw",
          "Sarf",
          "Tawhid",
          "Fiqh",
          "Adab",
          "Sira",
          "Études islamiques",
        ],
      },
      {
        group: "Matières scolaires",
        items: [
          "Anglais",
          "Mathématiques",
          "Biologie",
          "Chimie",
          "Physique",
          "Programme scolaire général",
        ],
      },
    ],
  },
  marquee: [
    "Mémorisation du Coran",
    "Tajwid",
    "Tafsir",
    "Langue arabe",
    "Nahw",
    "Sarf",
    "Tawhid",
    "Fiqh",
    "Adab",
    "Sira",
    "Études islamiques",
    "Anglais",
    "Mathématiques",
    "Biologie",
    "Chimie",
    "Physique",
  ],
  risk: {
    items: [
      "Essai gratuit",
      "Aucune coordonnée bancaire requise",
      "Changez de tuteur à tout moment",
    ],
  },
  about: {
    eyebrow: "À propos de Musbak",
    badge: "500+ cours dispensés",
    title: "Une académie. Deux mondes de savoir.",
    p1: "Musbak International Academy est une école en ligne où enfants et adultes apprennent le Coran, l’arabe et les sciences islamiques aux côtés du programme scolaire occidental : en direct, en toute proximité, depuis le confort de la maison.",
    p2: "Qu’il s’agisse d’un enfant de 5 ans qui débute la Qaida, d’un adolescent qui prépare ses examens ou d’un adulte qui commence son hifz, chaque élève a un plan, un tuteur et un emploi du temps conçus pour lui.",
    points: [
      "Tuteurs qualifiés et sélectionnés",
      "Plans d’apprentissage personnalisés",
      "Horaires flexibles, adaptés à votre fuseau",
      "Rapports de progrès pour les parents",
    ],
  },
  tracks: {
    eyebrow: "Programmes",
    title: "Trois parcours. Un seul voyage.",
    sub: "Choisissez un parcours, ou combinez-les. Votre plan est construit autour de vos objectifs.",
    startLabel: "Commencer ce parcours",
    items: [
      {
        tag: "Parcours 01",
        title: "Mémorisation du Coran (Hifz)",
        desc: "Un parcours de mémorisation structuré avec révision quotidienne, correction du tajwid et suivi de la rétention, du Juz ‘Amma au Coran entier.",
        chips: [
          "Plan de hifz personnel",
          "Tajwid & makharij",
          "Système de révision",
          "Voie de l’ijazah",
        ],
      },
      {
        tag: "Parcours 02",
        title: "Arabe & Sciences islamiques",
        desc: "De vos premières lettres arabes aux textes classiques : un cursus complet de langue et de savoir sacré.",
        chips: [
          "Langue arabe",
          "Tajwid",
          "Tafsir",
          "Nahw",
          "Sarf",
          "Tawhid",
          "Fiqh",
          "Adab",
          "Sira",
          "Études islamiques",
        ],
      },
      {
        tag: "Parcours 03",
        title: "Matières scolaires & académiques",
        desc: "Un soutien scolaire en direct pour les devoirs et la préparation aux examens, aligné sur le programme de votre enfant.",
        chips: [
          "Anglais",
          "Mathématiques",
          "Biologie",
          "Chimie",
          "Physique",
          "Soutien scolaire",
        ],
      },
    ],
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "Du premier message au premier cours, en un jour.",
    steps: [
      {
        title: "Dites salam sur WhatsApp",
        desc: "Dites-nous ce que vous ou votre enfant souhaitez apprendre. Nous répondons en quelques heures.",
      },
      {
        title: "Essai gratuit & évaluation",
        desc: "Rencontrez votre tuteur dans un vrai cours et recevez une bienveillante évaluation de niveau.",
      },
      {
        title: "Recevez votre plan personnel",
        desc: "Tuteur, horaires et programme adaptés à vos objectifs et à votre fuseau horaire.",
      },
      {
        title: "Apprenez et progressez",
        desc: "Des cours en direct avec suivi des progrès et retours réguliers pour vous ou votre enfant.",
      },
    ],
  },
  hadith: {
    label: "Le Prophète ﷺ a dit :",
    ar: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    en: "« Celui qui emprunte un chemin à la recherche du savoir, Allah lui facilite un chemin vers le Paradis. »",
    source: "Sahih Muslim",
  },
  why: {
    eyebrow: "Pourquoi Musbak",
    title: "Pensé pour les vraies familles et les vrais emplois du temps.",
    features: [
      {
        title: "Tuteurs qualifiés et vérifiés",
        desc: "Chaque tuteur est sélectionné pour son savoir, sa pédagogie et son caractère. Beaucoup détiennent une ijazah et des diplômes universitaires.",
      },
      {
        title: "Individuel & petits groupes",
        desc: "Choisissez des cours privés ciblés ou apprenez au sein d’un petit groupe motivé.",
      },
      {
        title: "Horaires flexibles",
        desc: "Matin ou soir, semaine ou week-end, les cours s’adaptent à votre fuseau horaire et à votre vie.",
      },
      {
        title: "De 4 ans à l’âge adulte",
        desc: "Un enseignement ludique et patient pour les enfants ; des parcours structurés et orientés objectifs pour les ados et les adultes.",
      },
      {
        title: "Rapports pour les parents",
        desc: "Des nouvelles régulières sur l’assiduité, la mémorisation et les étapes clés, directement sur votre WhatsApp.",
      },
      {
        title: "Technologie simple et sûre",
        desc: "Les cours sur Zoom ou Google Meet, tout le reste sur WhatsApp. Aucune plateforme compliquée.",
      },
    ],
  },
  tutors: {
    eyebrow: "Nos tuteurs",
    title: "Apprenez avec des professeurs qui se soucient de vous.",
    sub: "Une équipe soigneusement sélectionnée de spécialistes du Coran, de l’arabe et des matières scolaires, avec des tuteurs et tutrices.",
    items: [
      { name: "Oust. Khadija", role: "Coran & Tajwid" },
      { name: "Oust. Youssouf", role: "Hifz & Qiraat" },
      { name: "Oust. Maryam", role: "Arabe & sciences islamiques" },
    ],
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Des formules simples, des prix honnêtes.",
    sub: "Chaque formule commence par un cours d’essai gratuit. Le tarif final dépend des matières et de la fréquence. Écrivez-nous et nous construirons votre plan.",
    plans: [
      {
        name: "Cours en groupe",
        price: "Dès 15 $",
        per: "/mois",
        desc: "Apprenez avec un petit groupe d’élèves motivés.",
        features: [
          "Petits groupes (6 max)",
          "Cours en direct interactifs",
          "Horaire hebdomadaire",
          "Accès aux enregistrements",
        ],
        cta: "Demander le groupe",
        popular: false,
        badge: "",
      },
      {
        name: "Cours particuliers",
        price: "Dès 40 $",
        per: "/mois",
        desc: "Un tuteur privé, entièrement concentré sur vous ou votre enfant.",
        features: [
          "Tuteur privé",
          "Horaires entièrement flexibles",
          "Programme personnalisé",
          "Rapport mensuel de progrès",
        ],
        cta: "Demander le particulier",
        popular: true,
        badge: "Le plus demandé",
      },
      {
        name: "Famille & Hifz intensif",
        price: "Sur mesure",
        per: "",
        desc: "Formules pour fratries, hifz intensif et plans multi-matières.",
        features: [
          "Réductions multi-élèves",
          "Options de hifz intensif",
          "Combinez toutes les matières",
          "Attribution prioritaire du tuteur",
        ],
        cta: "Créer mon plan",
        popular: false,
        badge: "",
      },
    ],
    note: "Prix de départ affichés. Votre devis exact dépend de votre formule. Discutons-en sur WhatsApp.",
    payments:
      "Paiements : virement bancaire · Paystack · Flutterwave · cartes internationales",
  },
  testimonials: {
    eyebrow: "Témoignages",
    title: "Adoré par les élèves et les parents.",
    disclaimer: "Messages d’exemple. Les avis de parents seront ajoutés lorsqu’ils seront disponibles.",
    items: [
      {
        quote:
          "Ma fille de 7 ans est passée des difficultés avec l’alphabet à la lecture de Sourate Al-Mulk toute seule en quatre mois. La patience de l’enseignante est incroyable.",
        name: "Umm Maryam",
        role: "Parent · Royaume-Uni",
      },
      {
        quote:
          "J’ai commencé le hifz à 34 ans en pensant qu’il était trop tard. Mon tuteur a construit un plan autour de mon travail et j’ai terminé cinq juz’. Alhamdulillah.",
        name: "Abu Bakr",
        role: "Étudiant en hifz · Nigéria",
      },
      {
        quote:
          "Musbak gère le Coran, l’arabe et les maths de mon fils en un seul endroit. Un message WhatsApp et tout est réglé.",
        name: "Fatima",
        role: "Parent · Canada",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Vos questions, nos réponses.",
    items: [
      {
        q: "Quels âges enseignez-vous ?",
        a: "De 4 ans à l’âge adulte. Les enfants ont des enseignants patients et ludiques ; les ados et adultes ont des parcours structurés et orientés objectifs.",
      },
      {
        q: "Comment se déroulent les cours en ligne ?",
        a: "Les cours sont en direct sur Zoom ou Google Meet. Après votre réservation sur WhatsApp, nous vous envoyons un lien : cliquez et rejoignez. Aucun logiciel particulier requis.",
      },
      {
        q: "Le cours d’essai est-il vraiment gratuit ?",
        a: "Oui : un cours complet avec un vrai tuteur, plus une évaluation de niveau. Aucun paiement, aucun engagement.",
      },
      {
        q: "Puis-je combiner Coran et matières scolaires ?",
        a: "Absolument. Beaucoup d’élèves combinent les parcours, par exemple hifz deux fois par semaine plus soutien en maths, par exemple. Nous construisons un seul emploi du temps autour de vous.",
      },
      {
        q: "Dans quelles langues enseignez-vous ?",
        a: "Nos tuteurs enseignent en anglais et en arabe. Indiquez votre préférence dans votre message.",
      },
      {
        q: "Comment fonctionnent les paiements ?",
        a: "Nous acceptons les virements bancaires, Paystack, Flutterwave et les cartes internationales. Les détails de paiement sont communiqués une fois votre formule confirmée sur WhatsApp.",
      },
    ],
  },
  cta: {
    title: "Votre premier cours est offert.",
    sub: "Écrivez-nous sur WhatsApp aujourd’hui : rencontrez un tuteur, essayez un vrai cours, et découvrez la différence Musbak.",
    button: "Réserver un essai gratuit",
    secondary: "Voir les tarifs",
    small: "Essai gratuit · Sans engagement · Enfants & adultes",
  },
  landing: {
  hero: {
  kicker: "BIENVENUE À L’ACADÉMIE MUSBAK",
  line1: "Là où commence",
  line2: "votre parcours de connaissance.",
  mobileLine2: "votre parcours de",
  mobileLine3: "connaissance.",
  seeInAction: "Voir Musbak en action",
  sub: "Coran, arabe, sciences islamiques et excellence académique, avec un enseignement personnel où que vous soyez.",
  primary: "Découvrir l’Académie",
  secondary: "Réserver un essai gratuit",
  scroll: "Défiler",
},
    paths: {
      title: "Deux voies. Une même fondation.",
      note: "Enracinées dans le Coran et le caractère, les deux voies se renforcent mutuellement.",
      divine: {
        label: "Savoir divin",
        items: ["Coran", "Hifz", "Tajwid", "Arabe", "Sciences islamiques"],
      },
      academic: {
        label: "Excellence académique",
        items: ["Anglais", "Mathématiques", "Biologie", "Chimie", "Physique", "Soutien scolaire"],
      },
    },
    journey: {
      title: "Le parcours Musbak.",
      steps: [
        { num: "01", title: "Découvrir", desc: "Évaluation et objectifs." },
        { num: "02", title: "Commencer", desc: "Tuteur + plan d'apprentissage personnel." },
        { num: "03", title: "Construire", desc: "Leçons + pratique + révisions." },
        { num: "04", title: "Progresser", desc: "Retours + jalons." },
        { num: "05", title: "Maîtriser", desc: "Confiance + autonomie + réussite." },
      ],
    },
    proof: {
      title: "Ne nous croyez pas sur parole.",
      sub: "Voyez l'apprentissage en action.",
      captions: [
        "Lecture du Coran, en direct",
        "Session de hifz",
        "Cours particulier",
        "Immersion en arabe",
        "Soutien académique",
        "Retours du professeur",
      ],
    },
    quran: {
      verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      verseRef: "Coran 20:114",
      title: "Le Coran au cœur de tout.",
      sub: "Progressez pas à pas, à votre rythme, des premières lettres à la mémorisation complète avec des professeurs passionnés.",
      items: [
        { name: "Lecture du Coran", desc: "De l'alphabet à la récitation fluide." },
        { name: "Tajwid", desc: "Les règles d'une récitation correcte et belle." },
        { name: "Hifz", desc: "Une mémorisation structurée qui dure." },
        { name: "Révision", desc: "Consolider l'acquis, renforcer les points faibles." },
        { name: "Parcours Ijazah", desc: "Réciter devant une chaîne de transmission certifiée." },
      ],
    },
    curriculum: {
      title: "Explorez le programme.",
      sub: "Chaque matière suit un parcours clair, des premiers pas jusqu’à la maîtrise.",
      paths: [
        { label: "Coran", steps: ["Lecture", "Tajwid", "Hifz", "Révision", "Ijazah"] },
        { label: "Arabe", steps: ["Fondation", "Nahw", "Sarf", "Arabe classique"] },
        { label: "Sciences islamiques", steps: ["Fondations", "Aqida", "Fiqh", "Sira"] },
        { label: "Matières scolaires", steps: ["Primaire", "Secondaire", "Préparation aux examens"] },
      ],
    },
    teachers: {
      title: "Notre équipe de tuteurs qualifiés.",
      sub: "Découvrez notre équipe dévouée de tuteurs, engagés à offrir un enseignement de qualité en sciences islamiques, études coraniques, langue arabe et autres matières académiques.",
      items: [
        {
          name: "Oust. Luqman",
          gender: "male",
          creds: "Doctorat en cours",
        },
        {
          name: "Oust. Muhsinah",
          gender: "female",
          creds: "Licence en langue arabe",
        },
        {
          name: "Oust. Badirudeen",
          gender: "male",
          creds: "Master en droit de la Charia",
        },
        {
          name: "Oust. Abdulmumin",
          gender: "male",
          creds: "Titulaire d'une Ijazah en mémorisation du Coran",
        },
        {
          name: "Oust. Sideeq",
          gender: "male",
          creds: "Titulaire d'une Ijazah dans les sept Qiraat",
        },
        {
          name: "Oust. Aminah",
          gender: "female",
          creds: "",
        },
        {
          name: "Oust. Abdullateef",
          gender: "male",
          creds: "Titulaire d'une Licence en sciences (B.Sc.)",
        },
        {
          name: "Oust. Abdulmujeeb",
          gender: "male",
          creds: "Licence en droit combiné",
        },
      ],
    },
    globe: {
      title: "Le savoir n'a pas de fuseau horaire.",
      sub: "Des élèves nous rejoignent du monde entier et bénéficient de la même attention et des mêmes professeurs, quel que soit leur fuseau horaire.",
      regions: ["Royaume-Uni", "Nigéria", "Arabie Saoudite", "États-Unis", "France", "Émirats arabes unis"],
    },
    portal: {
      title: "Votre apprentissage. Un seul endroit.",
      sub: "Élèves, parents et professeurs peuvent suivre les cours, les progrès et les retours.",
      badge: "Bientôt disponible",
      tabs: [
        { label: "Portail élève", points: ["Progression en Coran", "Prochains cours", "Assiduité", "Progrès académiques", "Étapes clés"] },
        { label: "Portail parent", points: ["Progrès de votre enfant", "Notes des professeurs", "Horaires & facturation", "Étapes atteintes"] },
        { label: "Portail professeur", points: ["Cours du jour", "Retours des élèves", "Rapports de progression", "Plans de leçons"] },
      ],
    },
    why: {
      title: "Pourquoi les familles choisissent Musbak.",
      items: [
        { title: "Tuteurs qualifiés", desc: "Sélectionnés pour leur savoir, leur pédagogie et leur caractère. Beaucoup détiennent une ijazah et des diplômes universitaires." },
        { title: "Plans d'apprentissage personnels", desc: "Chaque élève commence avec un plan construit autour de son niveau, ses objectifs et son rythme." },
        { title: "Horaires flexibles", desc: "Choisissez des cours le matin, le soir ou le week-end, selon les besoins de votre famille." },
        { title: "Suivi des progrès", desc: "Vous savez toujours où en est votre enfant et quelle est la prochaine étape." },
        { title: "Individuel & petits groupes", desc: "Choisissez des cours privés ciblés ou un petit groupe motivé." },
        { title: "Accessibilité mondiale", desc: "Où que vous viviez, un professeur qualifié vous rencontre en ligne." },
      ],
    },
    cta: {
      title: "Votre premier pas commence ici.",
      sub: "Rencontrez un tuteur. Vivez un vrai cours. Commencez votre parcours.",
      primary: "Réserver un essai gratuit",
      secondary: "Explorer les programmes",
    },
  },
  footer: {
    about:
      "Cours en ligne en direct : Coran, arabe, sciences islamiques et matières scolaires pour enfants et adultes, dès 4 ans.",
    programs: "Programmes",
    academy: "Académie",
    contact: "Contact",
    rights: "Musbak International Academy. Tous droits réservés.",
    whatsappLabel: "WhatsApp",
    follow: "Suivez-nous",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
    admissions: "Admissions",
    teachers: "Professeurs",
    portals: "Portails",
    studentPortal: "Portail élève",
    parentPortal: "Portail parent",
    teacherPortal: "Portail professeur",
  },
  float: "Discuter sur WhatsApp",
  floatTooltip: "Des questions ? Discutez avec nous",
  floatDismiss: "Fermer",
  barDismiss: "Fermer la barre d’offre",
};

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
];

/* Stable course IDs in the same order as the hero.courses items in each dict,
   so a selection survives language switches. */
export const COURSE_IDS = [
  "quran-memorization",
  "tajweed",
  "tafsir",
  "arabic-language",
  "nahw",
  "sarf",
  "tawheed",
  "fiqh",
  "adab",
  "seerah",
  "islamic-studies",
  "english-language",
  "mathematics",
  "biology",
  "chemistry",
  "physics",
  "school-curriculum",
] as const;

export type CourseId = (typeof COURSE_IDS)[number];

export const LANGS: Lang[] = ["en", "ar", "fr"];

export function isLang(value: string): value is Lang {
  return value === "en" || value === "ar" || value === "fr";
}

export const dictionaries: Record<Lang, Dict> = { en, ar, fr };

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang];
}
