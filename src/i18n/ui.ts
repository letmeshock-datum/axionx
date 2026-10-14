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

export interface Section {
  /** Stable anchor id, also used to keep accordion ids unique. */
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: Feature[];
  subline: string;
}

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  nav: { briefing: string; copyEmail: string; copied: string };
  sections: Section[];
  dashboard: { alt: string };
  footer: { deployed: string; copyright: string };
  a11y: { home: string; language: string; skip: string };
}

export const ui: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: 'Axion Gen — Axion',
      description:
        'Axion Gen is generative BI with a personal analytical agent. It reads live operational data, builds the analysis, and returns a plain-language answer with the chart to back it.',
      ogAlt: 'Axion Gen — generative BI, geospatial and agents intelligence in a single interface.',
    },
    nav: {
      briefing: 'Request a briefing',
      copyEmail: 'Copy email',
      copied: 'Email copied',
    },
    sections: [
      {
        id: 'gen',
        eyebrow: 'Axion Gen',
        title: 'Ask. Get the answer, not a dashboard.',
        intro:
          'Axion Gen is generative BI with a personal analytical agent. It reads live operational data, builds the analysis, and returns a plain-language answer with the chart to back it.',
        items: [
          {
            title: 'Natural-language queries',
            body: 'Questions in, findings out. No query builders, no report requests.',
          },
          {
            title: 'A personal agent that remembers',
            body: 'It learns the metrics, districts, and priorities that matter and keeps them in context.',
          },
          {
            title: 'Every number traceable',
            body: 'Each answer links back to its source rows and the logic that produced it.',
          },
          {
            title: 'Runs on-premises',
            body: 'Data stays inside the organization’s perimeter.',
          },
        ],
        subline: 'Dashboards show what happened. Axion Gen explains why — and what to do next.',
      },
      {
        id: 'spar',
        eyebrow: 'SPAR',
        title: 'One loop behind every agent',
        intro:
          'SPAR — Sense, Plan, Act, Reflect — is the operating cycle every Axion agent runs. It turns raw signals into accountable actions, continuously.',
        items: [
          {
            title: 'Sense',
            body: 'Ingest signals from field sensors, smartphones, and enterprise systems.',
          },
          {
            title: 'Plan',
            body: 'Reason over context and constraints; propose an action with its rationale.',
          },
          {
            title: 'Act',
            body: 'Execute through connected systems, or hand off for approval.',
          },
          {
            title: 'Reflect',
            body: 'Compare outcome to intent, log the gap, and refine the next cycle.',
          },
        ],
        subline: 'Not a pipeline. A loop — every action feeds the next decision.',
      },
      {
        id: 'oversight',
        eyebrow: 'Human-in-the-loop',
        title: 'Agents propose. People decide.',
        intro:
          'Axion is built on human-in-the-loop oversight. Agents prepare, reason, and recommend — a person approves what matters, and sees exactly why it was proposed.',
        items: [
          {
            title: 'Narrative View',
            body: 'Every proposed action arrives with its full chain of reasoning in plain language.',
          },
          {
            title: 'Approval by policy',
            body: 'Set which decisions run autonomously and which wait for sign-off.',
          },
          {
            title: 'Override with a record',
            body: 'Accept, edit, or reject; every intervention is logged and fed back into the loop.',
          },
          {
            title: 'Full interpretability',
            body: 'No black-box steps between data and decision.',
          },
        ],
        subline: 'Autonomy where it’s safe. Accountability everywhere else.',
      },
    ],
    dashboard: {
      alt: 'Axion Gen interface: a globe centred on the Arabian Peninsula with a live event timeline for Riyadh, Jeddah and the Eastern Region.',
    },
    footer: {
      deployed: 'Deployed at national scale in Saudi Arabia. Live in the UAE.',
      copyright: '© {year} Axion All Rights Reserved',
    },
    a11y: {
      home: 'Axion — home',
      language: 'Language',
      skip: 'Skip to content',
    },
  },
  ar: {
    meta: {
      title: 'Axion Gen — أكسيون',
      description:
        'Axion Gen منصة ذكاء أعمال توليدي مع وكيل تحليلي شخصي. يقرأ البيانات التشغيلية الحيّة، ويُعدّ التحليل، ويقدّم إجابة بلغة واضحة مع الرسم البياني الذي يدعمها.',
      ogAlt: 'Axion Gen — ذكاء الأعمال التوليدي والجغرافي المكاني ووكلاء الذكاء الاصطناعي في واجهة واحدة.',
    },
    nav: {
      briefing: 'اطلب إحاطة',
      copyEmail: 'نسخ البريد الإلكتروني',
      copied: 'تم نسخ البريد',
    },
    sections: [
      {
        id: 'gen',
        eyebrow: 'Axion Gen',
        title: 'اسأل. واحصل على الإجابة، لا على لوحة مؤشرات.',
        intro:
          'Axion Gen منصة ذكاء أعمال توليدي مع وكيل تحليلي شخصي. يقرأ البيانات التشغيلية الحيّة، ويُعدّ التحليل، ويقدّم إجابة بلغة واضحة مع الرسم البياني الذي يدعمها.',
        items: [
          {
            title: 'استعلامات باللغة الطبيعية',
            body: 'أسئلة تدخل، ونتائج تخرج. لا أدوات لبناء الاستعلامات، ولا طلبات تقارير.',
          },
          {
            title: 'وكيل شخصي يتذكّر',
            body: 'يتعلّم المؤشرات والأحياء والأولويات المهمّة، ويُبقيها حاضرة في السياق.',
          },
          {
            title: 'كل رقم قابل للتتبّع',
            body: 'كل إجابة ترتبط بصفوف البيانات المصدرية وبالمنطق الذي أنتجها.',
          },
          {
            title: 'يعمل داخل مقرّ المؤسسة',
            body: 'تبقى البيانات داخل النطاق الأمني للمؤسسة.',
          },
        ],
        subline: 'لوحات المؤشرات تُظهر ما حدث. أمّا Axion Gen فيشرح لماذا حدث، وما الخطوة التالية.',
      },
      {
        id: 'spar',
        eyebrow: 'SPAR',
        title: 'حلقة واحدة وراء كل وكيل',
        intro:
          'SPAR — الاستشعار، التخطيط، التنفيذ، المراجعة — هي دورة التشغيل التي يعمل بها كل وكيل في Axion. تحوّل الإشارات الخام إلى إجراءات خاضعة للمساءلة، باستمرار.',
        items: [
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
        subline: 'ليست مسار معالجة. بل حلقة — كل إجراء يغذّي القرار التالي.',
      },
      {
        id: 'oversight',
        eyebrow: 'الإنسان في الحلقة',
        title: 'الوكلاء يقترحون. والبشر يقرّرون.',
        intro:
          'بُني Axion على إشراف الإنسان في الحلقة. يُعدّ الوكلاء التحليل ويستدلّون ويوصون، ويعتمد الإنسان ما هو مهم، ويرى بدقة لماذا اقتُرح.',
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
        subline: 'استقلالية حيث تكون آمنة. ومساءلة في كل ما عدا ذلك.',
      },
    ],
    dashboard: {
      alt: 'واجهة Axion Gen: كرة أرضية تتمركز على شبه الجزيرة العربية مع خط زمني مباشر للأحداث في الرياض وجدة والمنطقة الشرقية.',
    },
    footer: {
      deployed: 'منشور على المستوى الوطني في المملكة العربية السعودية. ويعمل في الإمارات العربية المتحدة.',
      copyright: '© {year} أكسيون. جميع الحقوق محفوظة.',
    },
    a11y: {
      home: 'أكسيون — الصفحة الرئيسية',
      language: 'اللغة',
      skip: 'الانتقال إلى المحتوى',
    },
  },
};

export function t(locale: Locale): Dictionary {
  return ui[locale] ?? ui[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}
