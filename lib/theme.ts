import { StyleSheet } from 'react-native';

export const colors = {
  ink: '#090909',
  paper: '#F2EFE8',
  paperMuted: '#C9C4BA',
  panel: '#121212',
  panel2: '#191919',
  line: '#2B2B2B',
  white: '#FAFAF7',
  muted: '#8D8A83',
  accent: '#E8E1D3',
  danger: '#D96C5F',
  success: '#9EB89C',
};

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 48 };

export const editorial = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  title: { color: colors.paper, fontSize: 38, lineHeight: 42, fontWeight: '700', letterSpacing: -1.5 },
  heading: { color: colors.paper, fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  label: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase' },
  body: { color: colors.paperMuted, fontSize: 15, lineHeight: 22 },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line },
});
