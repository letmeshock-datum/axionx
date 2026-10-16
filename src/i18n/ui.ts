export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<
  Locale,
  { label: string; dir: 'ltr' | 'rtl'; ogLocale: string; hreflang: string; htmlLang: string }
> = {
  en: { label: 'English', dir: 'ltr', ogLocale: 'en_US', hreflang: 'en', htmlLang: 'en' },
  ar: { label: 'العربية', dir: 'rtl', ogLocale: 'ar_SA', hreflang: 'ar', htmlLang: 'ar' },
};

export interface Feature {
  title: string;
  body: string;
}

export interface DiagramNode {
  label: string;
  text: string;
}

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  nav: { product: string; spar: string; oversight: string; demo: string };
  a11y: { home: string; language: string; skip: string; primary: string };
  hero: { accent: string; line1: string; line2: string; introLead: string; introRest: string };
  showcase: { alt: string };
  why: { accent: string; line2: string; line3: string };
  features: { items: Feature[]; dialogAlt: [string, string, string, string]; label: string };
  spar: {
    title: string;
    intro: string;
    steps: Feature[];
    accent: string;
    rest: string;
  };
  band: { alt: string };
  oversight: {
    title1: string;
    title2: string;
    intro: string;
    diagram: {
      label: string;
      agent: DiagramNode;
      policy: DiagramNode;
      autonomous: DiagramNode;
      person: DiagramNode & { accept: string; edit: string; reject: string };
      record: DiagramNode;
      withinPolicy: string;
      needsSignOff: string;
      caption: string;
    };
    items: Feature[];
    subline1: string;
    subline2: string;
  };
  cta: { line1: string; line2: string; button: string };
  mail: { label: string; app: string; copy: string; copied: string; subject: string };
}

export const ui: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: 'Axion Gen — Axion',
      description:
        'Axion Gen is generative BI with a personal analytical agent. It reads live operational data, builds the analysis, and returns a plain-language answer with the chart to back it.',
      ogAlt: 'Axion Gen — generative BI with a personal analytical agent.',
    },
    nav: { product: 'Product', spar: 'SPAR', oversight: 'Oversight', demo: 'Request a demo' },
    a11y: { home: 'Axion Gen — home', language: 'Language', skip: 'Skip to content', primary: 'Primary' },
    hero: {
      accent: 'Ask.',
      line1: 'Get the answer,',
      line2: 'not a dashboard.',
      introLead: 'Axion Gen',
      introRest:
        'is generative BI with a personal analytical agent. It reads live operational data, builds the analysis, and returns a plain-language answer with the chart to back it.',
    },
    showcase: {
      alt: 'Axion Gen dashboards: a map of Saudi Arabia with city indicators, performance charts by amana, and the Axsi agent answering a question about inspection coverage.',
    },
    why: {
      accent: 'Dashboards show what happened.',
      line2: 'Axion Gen explains why —',
      line3: 'and what to do next.',
    },
    features: {
      items: [
        {
          title: 'Natural-language queries',
          body: 'Ask in plain language and get findings back, with no query builders or report requests',
        },
        {
          title: 'A personal agent that remembers',
          body: 'It learns the metrics, districts, and priorities that matter and keeps them in context.',
        },
        {
          title: 'Every number traceable',
          body: 'Every answer links back to the source rows and the logic behind it, so you can verify it.',
        },
        {
          title: 'Runs on-premises',
          body: 'Your data never leaves the organization’s perimeter, and nothing is shared outside it.',
        },
      ],
      label: 'What Axion Gen does',
      dialogAlt: [
        'Axsi answers “How are we doing on closing food-safety violations in Jeddah?” with a summary and a monthly bar chart.',
        'Axsi pulls the user’s saved Monday view for Dammam, then adds a weekly watch on two priority districts.',
        'Axsi traces the 60.5% coverage figure back to 4,812 source rows, with the filters and lineage behind it.',
        'Axsi runs a tenant audit for case H-48221 on-premises, with zero bytes of egress, and saves the policy.',
      ],
    },
    spar: {
      title: 'SPAR. One loop behind every agent',
      intro:
        'SPAR — Sense, Plan, Act, Reflect — is the operating cycle every Axion agent runs. It turns raw signals into accountable actions, continuously.',
      steps: [
        { title: 'Sense', body: 'Ingest signals from field sensors, smartphones, and enterprise systems.' },
        { title: 'Plan', body: 'Reason over context and constraints; propose an action with its rationale.' },
        { title: 'Act', body: 'Execute through connected systems, or hand off for approval.' },
        { title: 'Reflect', body: 'Compare outcome to intent, log the gap, and refine the next cycle.' },
      ],
      accent: 'Not a pipeline',
      rest: '. A loop — every action feeds the next decision.',
    },
    band: { alt: 'Wind lifting sand off the crest of a dune at sunset.' },
    oversight: {
      title1: 'Agents propose.',
      title2: 'People decide.',
      intro:
        'Axion is built on human-in-the-loop oversight. Agents prepare, reason, and recommend — a person approves what matters, and sees exactly why it was proposed.',
      diagram: {
        label: 'How a proposed action is decided',
        agent: { label: 'Agent', text: 'Proposes an action with its rationale' },
        policy: { label: 'Policy', text: 'Autonomous or sign-off?' },
        autonomous: { label: 'Autonomous', text: 'Runs within policy limits' },
        person: {
          label: 'Person · Narrative View',
          text: 'Reads the reasoning, then decides',
          accept: 'Accept',
          edit: 'Edit',
          reject: 'Reject',
        },
        record: { label: 'Record', text: 'Logged and fed back into the loop' },
        withinPolicy: 'Within policy',
        needsSignOff: 'Needs sign-off',
        caption: 'Every intervention is logged and returns to SPAR as input for Reflect.',
      },
      items: [
        { title: 'Narrative View', body: 'Every proposed action arrives with its full chain of reasoning in plain language.' },
        { title: 'Approval by policy', body: 'Set which decisions run autonomously and which wait for sign-off.' },
        { title: 'Override with a record', body: 'Accept, edit, or reject; every intervention is logged and fed back into the loop.' },
        { title: 'Full interpretability', body: 'No black-box steps between data and decision.' },
      ],
      subline1: 'Autonomy where it’s safe.',
      subline2: 'Accountability everywhere else.',
    },
    cta: { line1: 'Ask Axion Gen', line2: 'your first question.', button: 'Request a demo' },
    mail: {
      label: 'Write to us',
      app: 'Mail app',
      copy: 'Copy address',
      copied: 'Copied',
      subject: 'Axion Gen demo request',
    },
  },
  ar: {
    meta: {
      title: 'Axion Gen — أكسيون',
      description: 'أكسيون منصة ذكاء أعمال توليدي مع وكيل تحليلي شخصي. يقرأ البيانات التشغيلية الحيّة، ويُعدّ التحليل، ويقدّم إجابة بلغة واضحة مع الرسم البياني الذي يدعمها.',
      ogAlt: 'أكسيون — ذكاء أعمال توليدي مع وكيل تحليلي شخصي.',
    },
    nav: {
      product: 'المنتج',
      spar: 'دورة القرار',
      oversight: 'الإشراف',
      demo: 'اطلب عرض',
    },
    a11y: {
      home: 'أكسيون — الصفحة الرئيسية',
      language: 'اللغة',
      skip: 'الانتقال إلى المحتوى',
      primary: 'التنقل الرئيسي',
    },
    hero: {
      accent: 'اسأل.',
      line1: 'واحصل على الإجابة،',
      line2: 'لا على لوحة مؤشرات.',
      introLead: 'أكسيون',
      introRest: 'منصة ذكاء أعمال توليدي مع وكيل تحليلي شخصي. يقرأ البيانات التشغيلية الحيّة، ويُعدّ التحليل، ويقدّم إجابة بلغة واضحة مع الرسم البياني الذي يدعمها.',
    },
    showcase: {
      alt: 'لوحات أكسيون: خريطة للمملكة العربية السعودية بمؤشرات المدن، ورسوم بيانية لأداء المناطق، والوكيل Axsi يجيب عن سؤال حول جميع نطاق الاعمال',
    },
    why: {
      accent: 'لوحات المؤشرات تُظهر ما حدث.',
      line2: 'أمّا أكسيون فيشرح لماذا —',
      line3: 'وما الخطوة التالية.',
    },
    features: {
      items: [
        {
          title: 'استعلامات معقدة باللغة العربية',
          body: 'اسأل بلغة واضحة واحصل على النتائج، دون أدوات لبناء الاستعلامات أو طلبات تقارير.',
        },
        {
          title: 'وكيل شخصي يتذكّر',
          body: 'يتعلّم المؤشرات والأحياء والأولويات المهمّة، ويُبقيها حاضرة في السياق.',
        },
        {
          title: 'كل رقم قابل للتتبّع',
          body: 'كل إجابة ترتبط بصفوف البيانات المصدرية وبالمنطق الذي وراءها، لتتمكّن من التحقّق منها.',
        },
        {
          title: 'يعمل داخل مقرّ المؤسسة',
          body: 'لا تغادر بياناتك النطاق الأمني للمؤسسة، ولا يُشارَك شيء خارجه.',
        },
      ],
      label: 'ما يقدّمه أكسيون',
      dialogAlt: [
        'أكسي يجيب عن السؤال «كيف نسير في رفع سلامة الغذاء في جدة؟» بملخص ورسم بياني شهري.',
        'أكسي يستدعي عرض يوم الاثنين الذي حفظه المستخدم لمدينة الدمام، ثم يضيف متابعة أسبوعية لحيّين ذوي أولوية.',
        'أكسي يتتبّع نسبة التغطية الرقابية 60.5% وصولًا إلى 4,812 صفًا مصدريًا، مع المرشّحات ومسار البيانات الذي يقف وراءها.',
        'أكسي يُجري تدقيقًا للمستأجر في الحالة H-48221 داخل مقرّ المؤسسة، دون خروج أي بايت من البيانات، ثم يحفظ السياسة.',
      ],
    },
    spar: {
      title: 'دورة القرار. حلقة واحدة وراء كل وكيل',
      intro: 'دورة القرار — الاستشعار، التخطيط، التنفيذ، المراجعة — هي دورة التشغيل التي يعمل بها كل وكيل في أكسيون. تحوّل الإشارات الخام إلى إجراءات خاضعة للمساءلة، باستمرار.',
      steps: [
        {
          title: 'الاستشعار',
          body: 'استقبال الإشارات من المستشعرات الميدانية والهواتف الذكية وأنظمة المؤسسة.',
        },
        {
          title: 'التخطيط',
          body: 'التفكير في السياق والقيود، واقتراح إجراء مع مبرّراته.',
        },
        {
          title: 'التنفيذ',
          body: 'التنفيذ عبر الأنظمة المتصلة، أو الإحالة للاعتماد.',
        },
        {
          title: 'المراجعة',
          body: 'مقارنة النتيجة بالهدف، وتسجيل الفجوة، وتحسين الدورة التالية.',
        },
      ],
      accent: 'ليست مسار معالجة',
      rest: '. بل حلقة — كل إجراء يغذّي القرار التالي.',
    },
    band: {
      alt: 'رياح ترفع الرمال عن قمة كثيب عند الغروب.',
    },
    oversight: {
      title1: 'الوكلاء يقترحون.',
      title2: 'والبشر يقرّرون.',
      intro: 'بُني أكسيون على إشراف الإنسان في الحلقة. يُعدّ الوكلاء التحليل ويستدلّون ويوصون، ويعتمد الإنسان ما هو مهم، ويرى بدقة لماذا اقتُرح.',
      diagram: {
        label: 'كيف يُتّخذ القرار بشأن إجراء مقترح',
        agent: {
          label: 'الوكيل',
          text: 'يقترح إجراءً مع مبرّراته',
        },
        policy: {
          label: 'السياسة',
          text: 'تلقائي أم يحتاج اعتمادًا؟',
        },
        autonomous: {
          label: 'تلقائي',
          text: 'يُنفَّذ ضمن حدود السياسة',
        },
        person: {
          label: 'الإنسان · العرض السردي',
          text: 'يقرأ الاستدلال، ثم يقرّر',
          accept: 'قبول',
          edit: 'تعديل',
          reject: 'رفض',
        },
        record: {
          label: 'السجلّ',
          text: 'يُسجَّل ويعود إلى الحلقة',
        },
        withinPolicy: 'ضمن السياسة',
        needsSignOff: 'يحتاج اعتمادًا',
        caption: 'تُسجَّل كل مداخلة وتعود إلى دورة القرار مدخلًا لمرحلة المراجعة.',
      },
      items: [
        {
          title: 'العرض السردي',
          body: 'يصل كل إجراء مقترح مع سلسلة الاستدلال الكاملة بلغة واضحة.',
        },
        {
          title: 'الاعتماد وفق السياسات',
          body: 'حدّد القرارات التي تُنفَّذ تلقائيًا، وتلك التي تنتظر الاعتماد.',
        },
        {
          title: 'التجاوز مع سجلّ',
          body: 'اقبل أو عدّل أو ارفض؛ تُسجَّل كل مداخلة وتعود إلى الحلقة.',
        },
        {
          title: 'قابلية تفسير كاملة',
          body: 'لا خطوات غامضة بين البيانات والقرار.',
        },
      ],
      subline1: 'استقلالية حيث تكون آمنة.',
      subline2: 'ومساءلة في كل ما عدا ذلك.',
    },
    cta: {
      line1: 'اطرح على أكسيون',
      line2: 'سؤالك الأول.',
      button: 'اطلب عرضًا',
    },
    mail: {
      label: 'راسلنا',
      app: 'تطبيق البريد',
      copy: 'نسخ العنوان',
      copied: 'تم النسخ',
      subject: 'طلب عرض توضيحي لـ Axion Gen',
    },
  },
};

export function t(locale: Locale): Dictionary {
  return ui[locale] ?? ui[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}
