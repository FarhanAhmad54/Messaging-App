import { StyleSheet } from 'react-native';

/**
 * Aurora Editorial theme.
 * Dark ink surfaces carry a restrained blue → purple → emerald/sea-green
 * spectrum. Gradients are applied selectively by UI surfaces; text and body
 * copy remain neutral for readability.
 */
export const colors = {
  ink: '#070A0F',
  inkSoft: '#0B1018',
  paper: '#F1F4F2',
  paperMuted: '#C2C9CC',
  panel: '#0E141D',
  panel2: '#131B27',
  line: '#25303A',
  white: '#FAFCFB',
  muted: '#87939B',
  accent: '#B8C5FF',
  accentBlue: '#4F8CFF',
  accentPurple: '#8B5CF6',
  accentViolet: '#A855F7',
  accentGreen: '#35D39A',
  accentSea: '#43C7A4',
  accentMint: '#79E2C0',
  auroraBlue: '#2563EB',
  auroraPurple: '#7C3AED',
  auroraGreen: '#10B981',
  auroraSea: '#2DD4BF',
  danger: '#FF6B7A',
  success: '#58D6A7',
};

export const aurora = {
  /** Ordered stops for any gradient-capable surface. */
  stops: [colors.auroraBlue, colors.auroraPurple, colors.auroraGreen, colors.auroraSea],
  bluePurple: [colors.auroraBlue, colors.auroraPurple],
  purpleGreen: [colors.auroraPurple, colors.auroraGreen],
  greenSea: [colors.auroraGreen, colors.auroraSea],
};

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 48 };

export const editorial = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  title: { color: colors.paper, fontSize: 38, lineHeight: 42, fontWeight: '700', letterSpacing: -1.5 },
  heading: { color: colors.paper, fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  label: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase' },
  body: { color: colors.paperMuted, fontSize: 15, lineHeight: 22 },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line },
  accentText: { color: colors.accentMint },
});
