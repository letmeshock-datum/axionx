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

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  nav: { briefing: string; copyEmail: string; copied: string };
  hero: { title: string; intro: string };
  features: Feature[];
  dashboard: { alt: string };
  footer: { deployed: string; copyright: string };
  a11y: { home: string; language: string; features: string; skip: string };
}

export const ui: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: 'Axion Gen — Axion',
      description:
        'Combining generative business intelligence, geospatial, and agents intelligence in a single, simple interface.',
      ogAlt: 'Axion Gen — generative BI, geospatial and agents intelligence in a single interface.',
    },
    nav: {
      briefing: 'Request a briefing',
      copyEmail: 'Copy email',
      copied: 'Email copied',
    },
    hero: {
      title: 'Axion Gen',
      intro:
        'Combining generative business intelligence, geospatial, and agents intelligence in a single, simple interface.',
    },
    features: [
      {
        title: 'Every street, every day.',
        body:
          'Cameras on vehicles already on the road keep the record current. No survey campaigns. No waiting for someone to complain. What gets fixed is decided by condition, not by the calendar. Problems are handled while they are still small, and still cheap.',
      },
      {
        title: 'AI agents watch. People decide.',
        body:
          'Agents find what slipped and keep it moving. Every decision with consequences stays with a person.',
      },
      {
        title: 'The record belongs to the city.',
        body:
          'It runs inside the city’s own walls, and opens to planners, utilities and partners on the city’s terms.',
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
      features: 'What Axion Gen does',
      skip: 'Skip to content',
    },
  },
  ar: {
    meta: {
      title: 'Axion Gen — أكسيون',
      description:
        'يجمع بين ذكاء الأعمال التوليدي والذكاء الجغرافي المكاني وذكاء الوكلاء في واجهة واحدة بسيطة.',
      ogAlt: 'Axion Gen — ذكاء الأعمال التوليدي والجغرافي المكاني ووكلاء الذكاء الاصطناعي في واجهة واحدة.',
    },
    nav: {
      briefing: 'اطلب إحاطة',
      copyEmail: 'نسخ البريد الإلكتروني',
      copied: 'تم نسخ البريد',
    },
    hero: {
      title: 'Axion Gen',
      intro:
        'يجمع بين ذكاء الأعمال التوليدي والذكاء الجغرافي المكاني وذكاء الوكلاء في واجهة واحدة بسيطة.',
    },
    features: [
      {
        title: 'كل شارع، كل يوم.',
        body:
          'كاميرات مثبّتة على مركبات تسير في الطرق أصلًا تُبقي السجل محدّثًا باستمرار. لا حملات مسح ميداني. لا انتظار لشكوى من أحد. ما يُصلَح تحدّده حالة الأصل، لا التقويم. تُعالَج المشكلات وهي ما تزال صغيرة، وما تزال رخيصة.',
      },
      {
        title: 'وكلاء الذكاء الاصطناعي يراقبون. والبشر يقرّرون.',
        body:
          'يرصد الوكلاء ما فات ويُبقونه قيد المتابعة. وكل قرار له تبعات يبقى بيد إنسان.',
      },
      {
        title: 'السجل ملك للمدينة.',
        body:
          'يعمل داخل أسوار المدينة نفسها، ويُفتح للمخطّطين والمرافق والشركاء وفق شروط المدينة.',
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
      features: 'ما يقدّمه Axion Gen',
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
