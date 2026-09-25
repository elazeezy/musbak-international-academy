import {
  COURSE_IDS,
  getDictionary,
  type CourseId,
  type Lang,
} from "./dictionaries";

type CourseCopy = {
  metaTitle: Record<Lang, string>;
  description: Record<Lang, string>;
};

/* Names and group labels come from the dictionaries (hero.courses), keeping a
   single source of truth. Copy below is written per course per language —
   what the student learns, who it's for, and the class format. */
const COURSES: Record<CourseId, CourseCopy> = {
  "quran-memorization": {
    metaTitle: {
      en: "Quran Memorization (Hifz) Online — Memorize with a Personal Plan | Musbak Academy",
      ar: "تحفيظ القرآن الكريم أونلاين — احفظ بخطة شخصية | أكاديمية مسباك",
      fr: "Mémorisation du Coran (Hifz) en ligne — avec un plan personnel | Académie Musbak",
    },
    description: {
      en: "A structured memorization program for kids, teens and adults, from your first surah to a complete hifz. Your tutor builds a personal plan around your pace and schedule, corrects tajweed as you memorize, and runs a daily revision cycle so what you learn stays with you. Parents receive regular progress reports, and serious students can work toward an ijazah with a connected chain of transmission. Classes are live, one-on-one or in small groups, at times that fit your time zone.",
      ar: "برنامج حفظ منظّم للأطفال والمراهقين والكبار، من أول سورة إلى ختم القرآن كاملًا. يبني معلمك خطة شخصية تناسب سرعتك وجدولك، ويصحح لك التجويد أثناء الحفظ، ويعمل بنظام مراجعة يومي يجعل ما تحفظه راسخًا. يصل أولياء الأمور تقارير متابعة منتظمة، ويمكن للطلاب الجادين السعي نحو الإجازة بالسند المتصل. حصص مباشرة فردية أو في مجموعات صغيرة في أوقات تناسب منطقتك الزمنية.",
      fr: "Un programme de mémorisation structuré pour enfants, ados et adultes, de votre première sourate au Coran entier. Votre tuteur construit un plan personnel adapté à votre rythme et à votre emploi du temps, corrige votre tajwid pendant la mémorisation et applique un cycle de révision quotidien pour ancrer durablement votre hifz. Les parents reçoivent des rapports réguliers, et les élèves assidus peuvent viser une ijazah à chaîne connectée. Cours en direct, en particulier ou en petits groupes, aux horaires de votre fuseau.",
    },
  },
  tajweed: {
    metaTitle: {
      en: "Tajweed Online — Recite the Quran Correctly & Beautifully | Musbak Academy",
      ar: "التجويد أونلاين — اتلو القرآن بإتقان وجمال | أكاديمية مسباك",
      fr: "Tajwid en ligne — réciter le Coran avec précision et beauté | Académie Musbak",
    },
    description: {
      en: "Learn to recite the Quran the way it was revealed. This course takes you from the correct articulation points (makharij) of every Arabic letter to the rules of noon sakin, meem sakin, madd, waqf and ibtida — applied directly to your recitation, not just theory. Suitable for complete beginners who want to stop reciting with mistakes, and for hifz students who want their memorization checked against the rules. Live correction in every class, one-on-one or in a small group.",
      ar: "تعلم تلاوة القرآن كما أُنزل. تأخذك هذه الدورة من مخارج الحروف العربية إلى أحكام النون الساكنة والميم الساكنة والمد والوقف والابتداء، مطبَّقة مباشرة على تلاوتك لا كمجرد نظرية. تناسب المبتدئين تمامًا الذين يريدون التخلص من أخطاء التلاوة، وطلاب الحفظ الذين يريدون مراجعة محفوظهم وفق الأحكام. تصحيح مباشر في كل حصة، فردية أو ضمن مجموعة صغيرة.",
      fr: "Apprenez à réciter le Coran tel qu'il a été révélé. Ce cours part des points d'articulation (makharij) de chaque lettre arabe jusqu'aux règles de la noun sakinah, de la madd et des arrêts (waqf) — appliquées directement à votre récitation, pas seulement en théorie. Idéal pour les débutants qui veulent corriger leurs erreurs de récitation et pour les élèves en hifz qui veulent vérifier leur mémorisation. Correction en direct à chaque cours, en particulier ou en petit groupe.",
    },
  },
  tafsir: {
    metaTitle: {
      en: "Tafsir Online — Understand the Meaning of Every Verse | Musbak Academy",
      ar: "التفسير أونلاين — افهم معاني الآيات والتدبر | أكاديمية مسباك",
      fr: "Tafsir en ligne — comprendre le sens de chaque verset | Académie Musbak",
    },
    description: {
      en: "Move beyond translation to genuine understanding. In this course you study selected surahs verse by verse: their occasions of revelation, linguistic treasures, core themes and the lessons scholars have drawn from them for fourteen centuries. Classes are discussion-based, so you can ask the questions you've always had. Open to adults and teens with basic reading ability in Arabic or a translation; no prior Islamic studies background is required.",
      ar: "تجاوز الترجمة إلى الفهم الحقيقي. في هذه الدورة تدرس سورًا مختارة آيةً آية: أسباب النزول ودقائق اللغة والمعاني الكبرى والدروس التي استخلصها العلماء عبر أربعة عشر قرنًا. الحصص قائمة على النقاش المفتوح لتطرح ما يدور في ذهنك من أسئلة. مفتوحة للكبار والمراهقين ممن يستطيعون القراءة بالعربية أو الترجمة، دون الحاجة إلى خلفية سابقة في الدراسات الإسلامية.",
      fr: "Allez au-delà de la traduction vers une compréhension véritable. Dans ce cours, vous étudiez des sourates verset par verset : leurs circonstances de révélation, leurs richesses linguistiques, leurs thèmes essentiels et les leçons qu'en tirent les savants depuis quatorze siècles. Les cours sont fondés sur la discussion, pour poser toutes vos questions. Ouvert aux adultes et ados sachant lire l'arabe ou une traduction ; aucun prérequis en études islamiques.",
    },
  },
  "arabic-language": {
    metaTitle: {
      en: "Arabic Language Online — Read, Write & Speak from Scratch | Musbak Academy",
      ar: "اللغة العربية أونلاين — اقرأ واكتب وتحدث من الصفر | أكاديمية مسباك",
      fr: "Arabe en ligne — lire, écrire et parler depuis zéro | Académie Musbak",
    },
    description: {
      en: "From the alphabet to real conversation and reading classical texts — a complete Modern Standard Arabic track taught live by patient tutors. Kids start with playful recognition and writing drills; adults move through grammar-in-context, guided reading and structured speaking practice. By the end of the foundational levels you can hold a simple conversation, write a short paragraph and begin reading unvoweled text — the gateway to understanding the Quran in its own language.",
      ar: "من الحروف الهجائية إلى المحادثة الحقيقية وقراءة النصوص الأصيلة — مسار متكامل في اللغة العربية الفصحى يقدمه معلمون صبورون مباشرة. يبدأ الأطفال بالتعرف الممتع على الحروف والكتابة، بينما ينتقل الكبار عبر القواعد في سياق الاستعمال والقراءة الموجهة والتدريب المنظم على المحادثة. بنهاية المستويات التأسيسية تستطيع إجراء محادثة بسيطة وكتابة فقرة قصيرة وبدء قراءة النص غير المشكول — بوابة الفهم المباشر للقرآن.",
      fr: "De l'alphabet à la vraie conversation et à la lecture de textes classiques : un parcours complet d'arabe standard moderne, en direct, avec des tuteurs patients. Les enfants commencent par la reconnaissance ludique des lettres et l'écriture ; les adultes progressent grâce à la grammaire en contexte, la lecture guidée et des exercices de conversation structurés. À la fin des niveaux fondamentaux, vous tenez une conversation simple, écrivez un court paragraphe et commencez à lire un texte sans voyelles — la porte de la compréhension du Coran dans sa propre langue.",
    },
  },
  nahw: {
    metaTitle: {
      en: "Arabic Grammar (Nahw) Online — Master It Sentence by Sentence | Musbak Academy",
      ar: "النحو العربي أونلاين — أتقنه جملة جملة | أكاديمية مسباك",
      fr: "Grammaire arabe (Nahw) en ligne — maîtriser phrase par phrase | Académie Musbak",
    },
    description: {
      en: "Nahw — Arabic syntax — is what turns dictionary knowledge into real understanding. This course builds you from the parts of speech and the nominal and verbal sentence to the precise parsing (i'rab) of Quranic and classical sentences. Every rule is taught through examples you analyze yourself, so grammar becomes something you use, not something you memorize. Best for students who can already read Arabic and want to finally understand what they read.",
      ar: "النحو هو ما يحول معرفتك بالمفردات إلى فهم حقيقي. تبني لك هذه الدورة أساسك من أقسام الكلام والجملة الاسمية والفعلية إلى الإعراب الدقيق لجمل قرآنية ونصوص أصيلة. كل قاعدة تُدرَّب عليها من خلال أمثلة تحللها بنفسك، فتصبح القواعد أداة تستعملها لا معلومات تحفظها. الأنسب للطلاب الذين يقرؤون العربية فعلًا ويريدون فهم ما يقرؤون أخيرًا.",
      fr: "Le nahw — la syntaxe arabe — transforme vos connaissances de vocabulaire en compréhension réelle. Ce cours construit vos bases, des catégories de mots et des phrases nominales et verbales jusqu'à l'analyse grammaticale (i'rab) de phrases coraniques et classiques. Chaque règle s'apprend à travers des exemples que vous analysez vous-même : la grammaire devient un outil, non un souvenir. Idéal pour les élèves lisant déjà l'arabe qui veulent enfin comprendre ce qu'ils lisent.",
    },
  },
  sarf: {
    metaTitle: {
      en: "Arabic Morphology (Sarf) Online — Unlock Word Patterns & Roots | Musbak Academy",
      ar: "الصرف العربي أونلاين — افتح أسرار الجذور والأوزان | أكاديمية مسباك",
      fr: "Morphologie arabe (Sarf) en ligne — déverrouiller racines et schémas | Académie Musbak",
    },
    description: {
      en: "Sarf is the science of how Arabic words are built from roots — and the fastest way to multiply your vocabulary. Learn the ten verb forms, how one root unfolds into dozens of related words, and how to recognize the pattern of an unfamiliar word on sight. Vocabulary that took others years to accumulate starts unlocking naturally when you read. Designed for students of Arabic and Quran who want to stop translating every single word.",
      ar: "الصرف علم بناء الكلمات العربية من جذورها — وأسرع طريق لمضاعفة مفرداتك. تعلم الأوزان العشرة للأفعال، وكيف يتفرع الجذر الواحد إلى عشرات الكلمات المتصلة، وكيف تتعرف على نمط الكلمة غير المألوفة من نظرة واحدة. مفردات كان يستغرق جمعها سنوات تبدأ بالانفتاح تلقائيًا أثناء القراءة. صُممت لطلاب العربية والقرآن الذين يريدون التحرر من ترجمة كل كلمة.",
      fr: "Le sarf est la science de la construction des mots arabes à partir des racines — et le moyen le plus rapide de multiplier votre vocabulaire. Apprenez les dix formes verbales, comment une racine déploie des dizaines de mots apparentés, et comment reconnaître au premier regard le schéma d'un mot inconnu. Le vocabulaire que d'autres accumulent en années se débloque naturellement à la lecture. Conçu pour les élèves en arabe et en Coran qui veulent cesser de traduire chaque mot.",
    },
  },
  tawheed: {
    metaTitle: {
      en: "Tawheed Online — Build Sound Islamic Belief on Authentic Knowledge | Musbak Academy",
      ar: "التوحيد أونلاين — ابنِ عقيدة سليمة على علم صحيح | أكاديمية مسباك",
      fr: "Tawhid en ligne — bâtir une croyance authentique sur le savoir | Académie Musbak",
    },
    description: {
      en: "Study the foundations of Islamic belief as taught in the Quran and the Prophet's Sunnah and explained by the early generations. Topics include the names and attributes of Allah, the pillars of iman, shirk and its dangers, and what every Muslim must know about worship. Classes are clear and evidence-based, taught from classical texts like Thalathat al-Usul with a contemporary explanation. Suitable for teens and adults at any level, in English or Arabic.",
      ar: "ادرس أسس العقيدة الإسلامية كما وردت في القرآن والسنة وبيانها عند السلف. تشمل الموضوعات أسماء الله وصفاته وأركان الإيمان والشرك وأخطاره وما يجب على كل مسلم معرفته في العبادة. حصص واضحة مبنية على الدليل، تُدرَّس من متون أصيلة كثلاثة الأصول بشرح معاصر ميسر. تناسب المراهقين والكبار بأي مستوى، بالعربية أو الإنجليزية.",
      fr: "Étudiez les fondements de la croyance islamique tels qu'enseignés par le Coran, la Sunna du Prophète et expliqués par les premières générations. Au programme : les noms et attributs d'Allah, les piliers de la foi, le shirk et ses dangers, et ce que tout musulman doit savoir du culte. Des cours clairs et fondés sur les preuves, tirés de textes classiques comme Thalathat al-Usul avec une explication contemporaine. Convient aux ados et adultes de tout niveau, en anglais ou en arabe.",
    },
  },
  fiqh: {
    metaTitle: {
      en: "Fiqh Online — Practical Rulings for Daily Worship | Musbak Academy",
      ar: "الفقه أونلاين — أحكام عملية لعبادتك اليومية | أكاديمية مسباك",
      fr: "Fiqh en ligne — les règles pratiques du culte quotidien | Académie Musbak",
    },
    description: {
      en: "Practical Islamic jurisprudence for real life: purification, prayer, fasting, zakat and Hajj, taught step by step with the evidence behind each ruling. Beyond the how, you learn the why — so your worship is confident, not merely copied. The course follows a mainstream madhhab with respect for scholarly differences, and leaves room for your questions, including the situations modern Muslims actually face. For adults and teens; no prerequisites.",
      ar: "فقه إسلامي عملي للحياة الواقعية: الطهارة والصلاة والصيام والزكاة والحج، يُدرَّس خطوة بخطوة مع بيان الدليل على كل حكم. وليس كيفية العبادة فحسب بل لماذا — لتكون عبادتك واثقة لا منقولة بالتقليد. تتبع الدورة مذهبًا معتبرًا مع احترام خلاف العلماء، وتترك مساحة لأسئلتك بما فيها الواقعات المعاصرة التي يواجهها المسلمون اليوم. للكبار والمراهقين دون متطلبات سابقة.",
      fr: "Le fiqh pratique pour la vie réelle : purification, prière, jeûne, zakat et pèlerinage, enseignés pas à pas avec la preuve de chaque règle. Au-delà du comment, vous apprenez le pourquoi — pour un culte assuré, pas simplement imité. Le cours suit un madhhab reconnu dans le respect des divergences savantes, avec une vraie place pour vos questions, y compris les situations que vivent les musulmans d'aujourd'hui. Pour adultes et ados, sans prérequis.",
    },
  },
  adab: {
    metaTitle: {
      en: "Islamic Manners (Adab) Online — Grow Beautiful Character | Musbak Academy",
      ar: "الأدب الإسلامي أونلاين — اكتسب خلقًا كريمًا | أكاديمية مسباك",
      fr: "Adab en ligne — développer le beau caractère | Académie Musbak",
    },
    description: {
      en: "Islamic manners for children and adults: respect for parents and teachers, honesty in speech, cleanliness, the etiquette of eating, visiting and the masjid, and controlling anger — taught through the stories of the Prophet and his companions rather than lectures alone. For kids, classes are story-based and interactive; for adults, each manner is linked to the spiritual wisdom behind it. Small habits, taught consistently, become character.",
      ar: "آداب إسلامية للأطفال والكبار: بر الوالدين واحترام المعلمين، والصدق في القول، ونظافة البدن والثياب، وآداب الطعام والزيارة والمسجد، وضبط الغضب — تُدرَّس عبر قصص النبي ﷺ وأصحابه لا بالمواعظ وحدها. حصص الأطفال قائمة على القصة والتفاعل، وحصص الكبار تربط كل خلق بالحكمة الروحية وراءه. عادات صغيرة تُرسَّخ بثبات فتصير خُلقًا راسخًا.",
      fr: "Les bonnes manières islamiques pour enfants et adultes : respect des parents et des enseignants, honnêteté dans la parole, propreté, étiquette du repas, de la visite et de la mosquée, maîtrise de la colère — enseignées à travers les histoires du Prophète et de ses compagnons, pas seulement par des conseils. Pour les enfants, des cours interactifs fondés sur le récit ; pour les adultes, chaque manière est reliée à sa sagesse spirituelle. De petites habitudes, enseignées avec constance, deviennent du caractère.",
    },
  },
  seerah: {
    metaTitle: {
      en: "Seerah Online — Journey Through the Prophet's Life ﷺ | Musbak Academy",
      ar: "السيرة النبوية أونلاين — رحلة عبر حياة النبي ﷺ | أكاديمية مسباك",
      fr: "Sira en ligne — la vie du Prophète ﷺ | Académie Musbak",
    },
    description: {
      en: "A guided journey through the life of the Prophet Muhammad ﷺ, from his birth in Makkah to the liberation of the city and the spread of the message. You study the major events with their lessons — patience in hardship, wisdom in leadership, mercy in victory — and understand the revelation in its historical context. Storytelling-driven for younger students, source-based discussion for older ones. A course that builds love for the Prophet ﷺ and practical lessons for your own life.",
      ar: "رحلة موجّهة عبر حياة النبي محمد ﷺ، من مولده في مكة إلى فتحها وانتشار الرسالة. تدرس الأحداث الكبرى بعبرها — الصبر على الأذى والحكمة في القيادة والرحمة عند النصر — وتفهم النزول القرآني في سياقه التاريخي. سرد قصصي ممتع للطلاب الأصغر، ونقاش موثق بالمصادر للأكبر. دورة تغرس محبة النبي ﷺ ودروسًا عملية لحياتك.",
      fr: "Un voyage guidé à travers la vie du Prophète Muhammad ﷺ, de sa naissance à La Mecque à la libération de la ville et à la diffusion du message. Vous étudiez les grands événements et leurs leçons — patience dans l'épreuve, sagesse dans le leadership, miséricorde dans la victoire — et comprenez la révélation dans son contexte historique. Récit pour les plus jeunes, discussion fondée sur les sources pour les plus grands. Un cours qui cultive l'amour du Prophète ﷺ et des leçons pratiques pour votre vie.",
    },
  },
  "islamic-studies": {
    metaTitle: {
      en: "Islamic Studies Online — A Complete Foundation in One Course | Musbak Academy",
      ar: "الدراسات الإسلامية أونلاين — أساس متكامل في دورة واحدة | أكاديمية مسباك",
      fr: "Études islamiques en ligne — une base complète en un cours | Académie Musbak",
    },
    description: {
      en: "One structured program covering what a Muslim needs to know: aqeedah, the pillars of Islam, the fiqh of worship, seerah, essential hadith and daily adhkar. Designed for new Muslims, for Muslim children growing up in non-Muslim-majority countries, and for anyone who wants to fill the gaps in their foundational knowledge. Taught step by step with revision and short quizzes, in English or Arabic, at your own pace.",
      ar: "برنامج واحد منظم يغطي ما يحتاج المسلم معرفته: العقيدة وأركان الإسلام وفقه العبادة والسيرة والأحاديث الأساسية والأذكار اليومية. مصمم للمسلمين الجدد، ولأبناء المسلمين في البلاد غير الإسلامية، ولمن يريد سد الثغرات في معرفته التأسيسية. يُدرَّس خطوة بخطوة مع مراجعة واختبارات قصيرة، بالعربية أو الإنجليزية، وعلى وتيرتك.",
      fr: "Un programme structuré couvrant ce qu'un musulman doit savoir : la aqeedah, les piliers de l'islam, le fiqh du culte, la sira, les hadiths essentiels et les invocations quotidiennes. Conçu pour les nouveaux musulmans, pour les enfants de familles musulmanes élevés hors des pays à majorité musulmane, et pour quiconque veut combler ses lacunes fondamentales. Enseigné pas à pas avec révisions et quiz, en anglais ou en arabe, à votre rythme.",
    },
  },
  "english-language": {
    metaTitle: {
      en: "English Classes Online — Speak & Write with Confidence | Musbak Academy",
      ar: "اللغة الإنجليزية أونلاين — تحدث واكتب بثقة | أكاديمية مسباك",
      fr: "Cours d'anglais en ligne — parler et écrire en confiance | Académie Musbak",
    },
    description: {
      en: "Live English tutoring for school-age children and adults: phonics and reading fluency for the youngest, grammar and composition for teens preparing exams, and conversation practice for adults. Lessons are built around your goals — school curriculum support, IELTS preparation or workplace confidence — with regular assessment and feedback. Taught by patient, qualified tutors in one-on-one or small-group classes.",
      ar: "دروس إنجليزية مباشرة لأطفال المدارس والكبار: الصوتيات وطلاقة القراءة للأصغر سنًا، والقواعد والتعبير للمراهقين المستعدين للامتحانات، وتدريب المحادثة للكبار. تُبنى الدروس حول أهدافك — دعم منهج المدرسة أو الاستعداد لآيلتس أو ثقة العمل — مع تقييم وتغذية راجعة منتظمة. معلمون صبورون مؤهلون في حصص فردية أو مجموعات صغيرة.",
      fr: "Cours d'anglais en direct pour les écoliers et les adultes : phonétique et fluidité de lecture pour les plus jeunes, grammaire et expression pour les ados en préparation d'examens, et pratique de la conversation pour les adultes. Les leçons sont construites autour de vos objectifs — soutien scolaire, préparation IELTS ou confiance professionnelle — avec évaluations et retours réguliers. Tuteurs patients et qualifiés, en particulier ou en petits groupes.",
    },
  },
  mathematics: {
    metaTitle: {
      en: "Mathematics Tutoring Online — From the Basics to Calculus | Musbak Academy",
      ar: "الرياضيات أونلاين — من الأساسيات إلى التفاضل | أكاديمية مسباك",
      fr: "Maths en ligne — des bases au calcul différentiel | Académie Musbak",
    },
    description: {
      en: "Mathematics tutoring that finds the gap and fixes it. From primary-school arithmetic and times tables through algebra, geometry and trigonometry to exam-level calculus and statistics, tutors diagnose exactly where understanding breaks down and rebuild it step by step. Homework help, exam preparation and enrichment for fast learners. Aligned with your school's curriculum — British, American, IB, Nigerian and more — in one-on-one or small-group classes.",
      ar: "دروس رياضيات تكتشف فجوة الفهم وتعالجها. من حساب المرحلة الابتدائية وجداول الضرب إلى الجبر والهندسة والمثلثات وصولًا إلى التفاضل والتكامل والإحصاء للامتحانات. يشخّص المعلمون بدقة حيث ينكسر الفهم ويعيدون بناءه خطوة بخطوة: واجبات، واستعداد للامتحانات، وإثراء للمتفوقين. بما يوافق منهج مدرستك — بريطاني أو أمريكي أو IB أو نيجيري وغيرها — في حصص فردية أو مجموعات صغيرة.",
      fr: "Un soutien en maths qui repère le manque et le comble. De l'arithmétique du primaire et des tables de multiplication jusqu'à l'algèbre, la géométrie, la trigonométrie, le calcul différentiel et les statistiques du niveau examen : les tuteurs diagnostiquent précisément où la compréhension se brise et la reconstruisent pas à pas. Aide aux devoirs, préparation aux examens et enrichissement pour les élèves rapides. Aligné sur le programme de votre école — britannique, américain, IB, nigérian et plus — en particulier ou en petits groupes.",
    },
  },
  biology: {
    metaTitle: {
      en: "Biology Tutoring Online — Understand Living Systems & Score Higher | Musbak Academy",
      ar: "الأحياء أونلاين — افهم الكائنات الحية وارتقِ في درجاتك | أكاديمية مسباك",
      fr: "Biologie en ligne — comprendre le vivant et réussir | Académie Musbak",
    },
    description: {
      en: "Biology tutoring aligned to your exam board: cell biology, human physiology, genetics and evolution, ecology and exam technique. Tutors use diagrams, past-paper questions and step-by-step explanations to turn memorized facts into understood systems — the difference between a student who crams and one who scores. For middle-school, GCSE/IGCSE, WAEC and A-level students, with regular progress checks and parent reports.",
      ar: "دروس أحياء بما يوافق لوحة امتحاناتك: علم الخلية وفيسيولوجيا الإنسان والوراثة والتطور وعلم البيئة وأسلوب الإجابة. يستخدم المعلمون الرسوم التوضيحية وأسئلة الامتحانات السابقة والشرح المتدرج لتحويل الحفظ إلى فهم حقيقي للأنظمة الحية — وهذا الفرق بين طالب يحفظ وآخر يتفوق. لطلاب المرحلة المتوسطة وGCSE/IGCSE وWAEC والمستوى المتقدم، مع تقييمات دورية وتقارير لأولياء الأمور.",
      fr: "Soutien en biologie aligné sur votre examen : biologie cellulaire, physiologie humaine, génétique et évolution, écologie et technique d'examen. Les tuteurs utilisent schémas, annales et explications pas à pas pour transformer des faits mémorisés en systèmes compris — la différence entre un élève qui bachote et celui qui réussit. Pour le collège, le GCSE/IGCSE, le WAEC et le A-level, avec bilans réguliers et rapports aux parents.",
    },
  },
  chemistry: {
    metaTitle: {
      en: "Chemistry Tutoring Online — Master Reactions, Equations & Exam Technique | Musbak Academy",
      ar: "الكيمياء أونلاين — أتقن التفاعلات والمعادلات وأسلوب الامتحان | أكاديمية مسباك",
      fr: "Chimie en ligne — maîtriser réactions, équations et technique d'examen | Académie Musbak",
    },
    description: {
      en: "Chemistry made systematic: atoms, bonding and the periodic table, quantitative chemistry, organic chemistry and chemical analysis — taught so that each topic connects to the last. Tutors balance conceptual understanding with drilled exam skills: mole calculations, writing and balancing equations, and interpreting data from practicals. For GCSE/IGCSE, WAEC and A-level students; includes timed past-paper practice and feedback after every session.",
      ar: "كيمياء بنظام محكم: الذرات والروابط والجدول الدوري، والكيمياء الكمية، والكيمياء العضوية، والتحليل الكيميائي — تُدرَّس بحيث يترابط كل درس بما قبله. يوازن المعلمون بين الفهم المفاهيمي والتدريب العملي على الامتحان: حسابات المول، وكتابة المعادلات وموازنتها، وتفسير بيانات التجارب. لطلاب GCSE/IGCSE وWAEC والمستوى المتقدم، مع تدريب مؤقت على أسئلة سنوات سابقة وتغذية راجعة بعد كل حصة.",
      fr: "La chimie rendue systématique : atomes, liaisons et tableau périodique, chimie quantitative, chimie organique et analyse chimique — enseignées de sorte que chaque chapitre se relie au précédent. Les tuteurs équilibrent compréhension conceptuelle et compétences d'examen travaillées : calculs de mole, équations à équilibrer, interprétation des données de laboratoire. Pour GCSE/IGCSE, WAEC et A-level, avec annales chronométrées et retour après chaque séance.",
    },
  },
  physics: {
    metaTitle: {
      en: "Physics Tutoring Online — Understand Deeply, Solve with Confidence | Musbak Academy",
      ar: "الفيزياء أونلاين — افهم بعمق وحل بثقة | أكاديمية مسباك",
      fr: "Physique en ligne — comprendre en profondeur, résoudre avec assurance | Académie Musbak",
    },
    description: {
      en: "Physics tutoring that builds real problem-solving skill: forces and motion, electricity, waves, energy, and exam-level mechanics and fields. Instead of memorizing formulas, you learn to model a problem, choose the right relationship and check that the answer makes sense — the skill examiners actually reward. Includes worked examples, timed past-paper questions and step-by-step feedback. For GCSE/IGCSE, WAEC and A-level students.",
      ar: "دروس فيزياء تبني مهارة حل المسائل الحقيقية: القوى والحركة، والكهرباء، والموجات، والطاقة، وميكانيكا ومجالات المستوى المتقدم. بدل حفظ القوانين، تتعلم نمذجة المسألة واختيار العلاقة الصحيحة والتحقق من معقولية الإجابة — وهي المهارة التي يكافئها المصححون فعلًا. تشمل أمثلة محلولة وأسئلة سنوات سابقة بتوقيت محدد وتغذية راجعة متدرجة. لطلاب GCSE/IGCSE وWAEC والمستوى المتقدم.",
      fr: "Soutien en physique qui développe la vraie compétence de résolution : forces et mouvement, électricité, ondes, énergie, et à niveau examen mécanique et champs. Au lieu de mémoriser des formules, vous apprenez à modéliser un problème, choisir la bonne relation et vérifier que la réponse est plausible — la compétence que les examinateurs récompensent vraiment. Exemples résolus, annales chronométrées et retours pas à pas. Pour GCSE/IGCSE, WAEC et A-level.",
    },
  },
  "school-curriculum": {
    metaTitle: {
      en: "School Curriculum Support Online — All Subjects, One Plan | Musbak Academy",
      ar: "دعم المنهج الدراسي أونلاين — كل المواد بخطة واحدة | أكاديمية مسباك",
      fr: "Soutien scolaire en ligne — toutes les matières, un seul plan | Académie Musbak",
    },
    description: {
      en: "One tutor team for the whole school year. We support your child across their full curriculum — homework, tests and exams — with a coordinated plan, one schedule and a single WhatsApp thread for parents. Tutors follow your school's syllabus and textbooks, fill gaps from earlier years, and prepare students confidently for checkpoint, BECE, WAEC, IGCSE and end-of-year exams. Ideal for families who want structure without managing five different tutors.",
      ar: "فريق معلمين واحد لعام دراسي كامل. ندعم طفلك عبر منهجه بالكامل — واجبات واختبارات وامتحانات — بخطة متكاملة وجدول واحد ومحادثة واتساب واحدة لأولياء الأمور. يتبع المعلمون منهج مدرسة طفلك وكتبه، ويسدون الثغرات من السنوات السابقة، ويستعدون الطلاب بثقة لامتحانات المرحلة وBECE وWAEC وIGCSE ونهاية العام. خيار مثالي للعائلات التي تريد تنظيمًا دون إدارة خمسة معلمين مختلفين.",
      fr: "Une seule équipe de tuteurs pour toute l'année scolaire. Nous accompagnons votre enfant sur tout son programme — devoirs, contrôles et examens — avec un plan coordonné, un emploi du temps unique et un seul fil WhatsApp pour les parents. Les tuteurs suivent le programme et les manuels de l'école, comblent les lacunes des années passées et préparent sereinement aux examens checkpoint, BECE, WAEC, IGCSE et de fin d'année. Idéal pour les familles qui veulent de la structure sans gérer cinq tuteurs différents.",
    },
  },
};

export type Course = {
  id: CourseId;
  name: string;
  group: string;
  metaTitle: string;
  description: string;
};

/* COURSE_IDS order mirrors the hero.courses item order in every dictionary:
   the first 11 belong to group 0, the remaining 6 to group 1. */
function courseIndex(id: CourseId): { groupIndex: number; itemIndex: number } {
  const idx = COURSE_IDS.indexOf(id);
  return idx < 11
    ? { groupIndex: 0, itemIndex: idx }
    : { groupIndex: 1, itemIndex: idx - 11 };
}

export function getCourse(id: CourseId, lang: Lang): Course {
  const t = getDictionary(lang);
  const { groupIndex, itemIndex } = courseIndex(id);
  const copy = COURSES[id];
  return {
    id,
    name: t.hero.courses[groupIndex].items[itemIndex],
    group: t.hero.courses[groupIndex].group,
    metaTitle: copy.metaTitle[lang],
    description: copy.description[lang],
  };
}

export function listCourses(lang: Lang): Course[] {
  return COURSE_IDS.map((id) => getCourse(id, lang));
}
