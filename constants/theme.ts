import { Platform } from 'react-native';

// Keep Colors for backward compat with existing Expo Router layout
export const Colors = {
  light: {
    text: '#0F0A1E',
    background: '#fff',
    tint: '#6C47FF',
    icon: '#9B9BA8',
    tabIconDefault: '#9B9BA8',
    tabIconSelected: '#6C47FF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#6C47FF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#6C47FF',
  },
};

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const COLORS = {
  primary: "#6C47FF",
  primaryLight: "#EEE9FF",
  primaryDark: "#4A2FD9",
  orange: "#FF7B47",
  orangeLight: "#FFF0EA",
  white: "#FFFFFF",
  background: "#F7F7FA",
  text: "#0F0A1E",
  textMuted: "#9B9BA8",
  gray100: "#F4F4F8",
  gray200: "#E8E8F0",
  gray300: "#D1D1DC",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  black: "#000000",
  green: "#1DB954",
  red: "#EF4444",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};
