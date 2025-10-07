/**
 * Nexus POS Theme Configuration
 * Colores y estilos del sistema HMI
 */

export const NEXUS_COLORS = {
  primary: {
    blue: "#2196F3",
    blueDark: "#1976D2",
  },
  background: {
    main: "#3B4B5C", // Color de fondo principal del HMI (azul grisáceo oscuro)
    dark: "#2C3E50", // Variante más oscura
  },
  status: {
    red: "#EF4444",
    green: "#22C55E",
    orange: "#F97316",
    yellow: "#FCD34D",
  },
  neutral: {
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const NEXUS_TYPOGRAPHY = {
  fontFamily: {
    sans: "Inter, system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
} as const;

/**
 * Theme configurations for Tailwind CSS
 */
export const NEXUS_THEME_CONFIG = {
  background: NEXUS_COLORS.background.main,
  surface: NEXUS_COLORS.background.dark,
  text: NEXUS_COLORS.white,
  textSecondary: "#E5E7EB",
  border: NEXUS_COLORS.neutral.gray700,
  primary: NEXUS_COLORS.primary.blue,
  primaryHover: NEXUS_COLORS.primary.blueDark,
  success: NEXUS_COLORS.status.green,
  error: NEXUS_COLORS.status.red,
  warning: NEXUS_COLORS.status.orange,
};