// Single source of truth for site identity, analytics and monetization wiring.
// Public IDs come from PUBLIC_* env vars at build time; nothing secret lives here.
const env = import.meta.env;

export const site = {
  domain: 'fontwell.online',
  url: 'https://fontwell.online',
  name: 'Fontwell',
  tagline: 'Free fonts you can actually use commercially',
  description:
    'Fontwell is an independent reference for the open-licensed fonts in the Google Fonts library: plain-English license summaries, specimens, pairings and CSS, rebuilt from official metadata.',
  contactEmail: 'contact@fontwell.online',
  locale: 'en',
  ga4Id: (env.PUBLIC_GA4_ID as string | undefined) ?? '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string | undefined) ?? '',
  naverVerification: (env.PUBLIC_NAVER_VERIFICATION as string | undefined) ?? '',
  bingVerification: (env.PUBLIC_BING_VERIFICATION as string | undefined) ?? '',
  adsenseClient: 'ca-pub-4490818204529253',
  indexNowKey: '097dadd6ab3d29cc7bf4c5337ec7038f',
  /** Affiliate destinations. Empty = render neutral official links only (no rel=sponsored). */
  affiliates: {
    adobeFonts: (env.PUBLIC_AFF_ADOBE_FONTS as string | undefined) ?? '',
    envatoFonts: (env.PUBLIC_AFF_ENVATO_FONTS as string | undefined) ?? '',
    fontspring: (env.PUBLIC_AFF_FONTSPRING as string | undefined) ?? '',
  },
  /** EEA + UK + CH ISO 3166-1 codes for Consent Mode v2 regional defaults. */
  consentRegions: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU',
    'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
  ],
} as const;

export type Site = typeof site;
