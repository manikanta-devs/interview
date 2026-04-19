/**
 * Unified App Theme & Configuration
 * Single source of truth for all design tokens, colors, fonts, and styling
 */

export const appTheme = {
  // ============ BRANDING ============
  name: "NexHire",
  tagline: "AI Interview Intelligence Platform",
  logo: "LogoOption3", // Using the dynamic arrow N logo

  // ============ COLOR PALETTE ============
  colors: {
    // Primary gradient - Blue to Cyan to Purple
    primary: {
      50: "#f0f4ff",
      100: "#e0e9ff",
      300: "#a5b4fc",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      900: "#0f2c66",
    },
    // Accent - Cyan (Secondary)
    accent: {
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
    },
    // Success - Emerald
    success: {
      400: "#4ade80",
      500: "#10b981",
      600: "#059669",
    },
    // Warning - Amber
    warning: {
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
    },
    // Error - Red
    error: {
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
    },
    // Neutral - Slate
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
  },

  // ============ TYPOGRAPHY ============
  fonts: {
    // Font families
    sans: "system-ui, -apple-system, sans-serif",
    mono: "ui-monospace, 'Cascadia Code', monospace",

    // Font sizes (tailwind scale)
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },

    // Font weights
    weights: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
      black: 900,
    },

    // Line heights
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // ============ SPACING ============
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  // ============ BORDER RADIUS ============
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    base: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  // ============ GRADIENTS ============
  gradients: {
    // Primary gradient (Blue → Cyan → Purple)
    primary:
      "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",

    // Cool gradient
    cool: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",

    // Warm gradient
    warm: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",

    // Success gradient
    success: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",

    // Error gradient
    error: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
  },

  // ============ SHADOWS ============
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    glow: "0 0 20px rgba(59, 130, 246, 0.4)",
  },

  // ============ ANIMATIONS ============
  animations: {
    duration: {
      fast: "150ms",
      base: "300ms",
      slow: "500ms",
      slower: "1000ms",
    },
    easing: {
      linear: "linear",
      ease: "ease",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // ============ BUTTON VARIANTS ============
  buttons: {
    primary: {
      bg: "bg-gradient-to-r from-indigo-600 to-cyan-600",
      text: "text-white",
      hover: "hover:from-indigo-700 hover:to-cyan-700",
      active: "active:from-indigo-800 active:to-cyan-800",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    secondary: {
      bg: "bg-white/10",
      text: "text-white",
      hover: "hover:bg-white/20",
      active: "active:bg-white/30",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    ghost: {
      bg: "bg-transparent",
      text: "text-indigo-400",
      hover: "hover:bg-indigo-500/10",
      active: "active:bg-indigo-500/20",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    danger: {
      bg: "bg-red-600/20",
      text: "text-red-400",
      hover: "hover:bg-red-600/30",
      active: "active:bg-red-600/40",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
  },

  // ============ CARD VARIANTS ============
  cards: {
    glass:
      "backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5",
    gradient:
      "bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-indigo-500/20",
    elevated:
      "bg-slate-900 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow",
  },

  // ============ ICON DEFAULTS ============
  icons: {
    size: {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    },
    color: {
      primary: "#3b82f6",
      accent: "#06b6d4",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      muted: "#94a3b8",
    },
  },

  // ============ LAYOUT ============
  layout: {
    maxWidth: "max-w-7xl",
    container: "container mx-auto px-4",
    sidebarWidth: "w-72",
    mainPadding: "py-8 md:py-12",
  },

  // ============ RESPONSIVE BREAKPOINTS ============
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

/**
 * Get CSS class string for a component style
 */
export function getButtonClasses(variant: keyof typeof appTheme.buttons) {
  const style = appTheme.buttons[variant];
  return `${style.bg} ${style.text} ${style.hover} ${style.active} ${style.disabled}`;
}

export function getCardClasses(variant: keyof typeof appTheme.cards) {
  return appTheme.cards[variant];
}

/**
 * Helper to get gradient
 */
export function getGradient(type: keyof typeof appTheme.gradients) {
  return appTheme.gradients[type];
}
