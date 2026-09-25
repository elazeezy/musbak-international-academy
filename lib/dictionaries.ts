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
      "17 live online courses in Quran memorization, Tajweed, Arabic, Islamic sciences and school subjects — for kids and adults, ages 4 and up.",
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
    sub: "A small, vetted team of Qur'an, Arabic and school-subject specialists — male and female tutors available.",
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
    disclaimer: "Sample messages — real parent reviews coming soon.",
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
    title: "تعلم القرآن الكريم أونلاين مع معلمين مجازين | أكاديمية مسباك",
    description:
      "حصص مباشرة عبر الإنترنت في القرآن الكريم والتجويد والتحفيظ واللغة العربية والمواد الدراسية للأطفال والكبار من سن 4 سنوات. معلمون مؤهلون، حصص فردية أو مجموعات صغيرة. احجز حصتك التجريبية عبر واتساب.",
  },
  seo: {
    catalogTitle: "جميع الدورات: القرآن والعربية والمواد الدراسية | أكاديمية مسباك",
    catalogH1: "استكشف دوراتنا",
    catalogSub:
      "17 دورة مباشرة عبر الإنترنت في تحفيظ القرآن والتجويد واللغة العربية والعلوم الشرعية والمواد الدراسية — للأطفال والكبار من سن 4 سنوات فما فوق.",
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
    why: "لماذا مسباك",
    pricing: "الأسعار",
    testimonials: "آراء الطلاب",
    faq: "الأسئلة الشائعة",
    cta: "احجز حصة تجريبية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLang: "تغيير اللغة",
  },
  wa: {
    general: "السلام عليكم، أود معرفة المزيد عن أكاديمية مسباك العالمية.",
    trial: "السلام عليكم، أود حجز حصة تجريبية مجانية.",
    pricing: "السلام عليكم، أود الاستفسار عن الأسعار والخطط في أكاديمية مسباك.",
    plan: (plan: string) =>
      `السلام عليكم، أنا مهتم بخطة ${plan}. أرجو مشاركة التفاصيل.`,
    enroll:
      "السلام عليكم، أريد أن أصبح طالبًا في أكاديمية مسباك العالمية. كيف أُسجّل؟",
    learn: (course: string) =>
      `السلام عليكم، أريد تعلم ${course} في أكاديمية مسباك. أرجو مشاركة المزيد.`,
    track: (track: string) =>
      `السلام عليكم، أنا مهتم بمسار ${track}. أرجو مشاركة التفاصيل.`,
  },
  hero: {
    badge: "التسجيل مفتوح · أطفال وكبار · من سن 4 سنوات",
    question1: "هل تريد تعلّم",
    questionAccent: "القرآن والعربية",
    question2: "أو التفوق دراسيًا؟",
    sub: "حصص مباشرة عبر الإنترنت مع معلمين مؤهلين للأطفال والكبار من سن 4 سنوات، فردية أو في مجموعات صغيرة، من أي مكان في العالم.",
    videoLabel: "شاهد ما تقدمه مسباك",
    videoCaption: "كل ما تحتاج معرفته عن الأكاديمية في أقل من دقيقة.",
    unmute: "اضغط لتشغيل الصوت",
    covered1: "أكاديمية مسباك العالمية",
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
    eyebrow: "عن مسباك",
    badge: "+500 حصة مُقدَّمة",
    title: "أكاديمية واحدة. عالمان من العلم.",
    p1: "أكاديمية مسباك العالمية مدرسة إلكترونية يتعلم فيها الأطفال والكبار القرآن والعربية والعلوم الشرعية إلى جانب المناهج الدراسية: مباشرةً وبأسلوب شخصي ومن راحة البيت.",
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
    eyebrow: "لماذا مسباك",
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
    sub: "فريق صغير منتقى من متخصصي القرآن والعربية والمواد الدراسية — معلمون ومعلمات متاحون.",
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
    disclaimer: "رسائل توضيحية — آراء حقيقية من أولياء الأمور قادمة قريبًا.",
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
          "مسباك يدير قرآن ابني وعربيته ورياضياته في مكان واحد. رسالة واتساب واحدة ويُرتَّب كل شيء.",
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
  footer: {
    about:
      "حصص مباشرة عبر الإنترنت في القرآن والعربية والعلوم الشرعية والمواد الدراسية للأطفال والكبار من سن 4 سنوات.",
    programs: "البرامج",
    academy: "الأكاديمية",
    contact: "تواصل معنا",
    rights: "أكاديمية مسباك العالمية. جميع الحقوق محفوظة.",
    whatsappLabel: "واتساب",
    follow: "تابعنا",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
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
      "17 cours en direct en ligne : mémorisation du Coran, Tajwid, arabe, sciences islamiques et matières scolaires — pour enfants et adultes, dès 4 ans.",
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
    sub: "Une petite équipe sélectionnée de spécialistes du Coran, de l'arabe et des matières scolaires — tuteurs et tutrices disponibles.",
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
    disclaimer: "Messages d’exemple — les avis réels de parents arrivent bientôt.",
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
