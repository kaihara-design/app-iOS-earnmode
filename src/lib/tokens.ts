/**
 * DiagnosUs iOS Design Token Skeleton
 * 3-Tier Architecture: Global → Semantic → Element
 *
 * Figma source: BvtitRNTy7kUjbkLrXsB2h — DU App iOS
 * Last updated: 2026-03-17
 *
 * Values marked TODO are placeholders from Figma, pending color review session.
 */

// ─── Tier 1: Global Tokens ────────────────────────────────────────────────────
// Raw primitives. No semantic meaning. All spatial values in pt (= px in mockup).

export const global = {
  color: {
    neutral: {
      0: "#ffffff",
      50: "#f2f2f7",         // iOS Gray 6
      100: "#e5e5ea",        // iOS Gray 5
      200: "#d1d1d6",        // iOS Gray 4
      800: "rgba(60,60,67,0.60)",   // iOS secondary label
      850: "rgba(60,60,67,0.30)",   // iOS tertiary label
      900: "#000000",
      dark: {
        0: "#000000",
        50: "#1c1c1e",       // Dark card / elevated surface
        100: "#2c2c2e",      // Dark border
        800: "rgba(235,235,245,0.60)",
        850: "rgba(235,235,245,0.30)",
      },
    },
    brand: {
      teal: {
        light400: "#4dc3d0",    // TODO — Core/primary (tab active, display accent)
        light500: "#00c3d0",    // TODO — UI teal light (accents/teal)
        dark500: "#00d2e0",     // TODO — UI teal dark
        light600: "#2a98a4",    // TODO — Filter chip active
        deep: "#006A65",        // Earn Mode identity teal — text/icon
        deep10: "rgba(56,220,209,0.10)", // Earn teal bg fills
        container: "#38DCD1",   // Reserved — dark mode / special contexts
        onContainer: "#003D3A", // Text on container fills
      },
      indigo: {
        light: "#6155f5",       // TODO — Indigo light
        dark: "#6d7cff",        // TODO — Indigo dark
        border: "#cdc9ff",      // Indigo tinted border
        lightBg: "#f3f3ff",     // Indigo tint bg light
        darkBg: "#282652",      // Indigo tint bg dark
      },
    },
    accent: {
      orange: "#ff9500",
      orangeBg: "rgba(253,210,80,0.15)",
      green: "#34c759",
      greenBg: "#ebf9ee",
      greenBgDark: "#193920",
      red: "#FF3B30",
      redBg: "rgba(255,59,48,0.08)",
      violet: "#BC95E2",
      purple: "#9938da",       // Recommended gradient end
    },
    contest: {
      consensus: "#0f6771",
      consensusBg: "rgba(42,152,164,0.15)",
      division: "#5856d6",
      divisionBg: "rgba(88,86,214,0.15)",
    },
  },

  spacing: {
    4: 4,
    8: 8,
    12: 12,
    14: 14,
    16: 16,
    20: 20,
    24: 24,
    32: 32,
    34: 34,  // bottom safe area
  },

  radius: {
    4: 4,
    5: 5,
    8: 8,
    10: 10,
    12: 12,
    24: 24,
    full: 9999,
    continuous: {
      sm: 8,
      md: 12,
      lg: 24,
    },
  },

  border: {
    hairline: 0.5,
    default: 1,
    emphasis: 2,
  },

  opacity: {
    8: 0.08,
    12: 0.12,
    18: 0.18,
    20: 0.20,
    30: 0.30,
    60: 0.60,
    100: 1.0,
  },

  font: {
    family: {
      sfPro: "SF Pro",
      sfProDisplay: "SF Pro Display",
      system: "-apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 590,
      bold: 700,
    },
    size: {
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      17: 17,
      20: 20,
      22: 22,
      28: 28,
      34: 34,
    },
  },

  motion: {
    duration: {
      fast: "200ms",
      base: "300ms",
      slow: "500ms",
    },
    easing: {
      spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      easeOut: "ease-out",
    },
  },
} as const;

// ─── Tier 2: Semantic Tokens ──────────────────────────────────────────────────
// Expresses meaning and intent. References Global tokens.
// Two separate sets for light and dark mode.

export const semantic = {
  light: {
    color: {
      text: {
        primary: global.color.neutral[900],
        secondary: global.color.neutral[800],
        tertiary: global.color.neutral[850],
        vibrant: "#333333",
        vibrantControl: "#404040",
        onColor: global.color.neutral[0],
        pageTitle: "#3e4546",   // TODO — pending color review
      },
      surface: {
        default: global.color.neutral[0],
        grouped: global.color.neutral[50],
        elevated: global.color.neutral[0],
        card: global.color.neutral[0],
        overlay: "rgba(0,0,0,0.50)",
      },
      border: {
        default: global.color.neutral[100],
        separator: global.color.neutral[100],
      },
      tint: {
        default: global.color.brand.teal.light400,   // TODO — Core/primary
      },
      accent: {
        teal: global.color.brand.teal.light500,       // TODO — UI teal (non-Earn contexts)
        earnTeal: global.color.brand.teal.deep,
        earnTealBg: global.color.brand.teal.deep10,
      },
      interactive: {
        primaryDefault: global.color.brand.indigo.light,   // TODO
        indigoBg: global.color.brand.indigo.lightBg,
        indigoBorder: global.color.brand.indigo.border,
      },
      fill: {
        quaternary: "rgba(116,116,128,0.08)",
        vibrantTertiary: "#ededed",
      },
      status: {
        success: global.color.accent.green,
        successBg: global.color.accent.greenBg,
        error: global.color.accent.red,
        errorBg: global.color.accent.redBg,
        warning: global.color.accent.orange,
      },
      contest: {
        prize: global.color.accent.orange,
        prizeBg: global.color.accent.orangeBg,
        consensus: global.color.contest.consensus,
        consensusBg: global.color.contest.consensusBg,
        division: global.color.contest.division,
        divisionBg: global.color.contest.divisionBg,
      },
    },
    spacing: {
      layout: {
        horizontal: global.spacing[16],
        gapSection: global.spacing[20],
      },
      component: {
        gapSm: global.spacing[4],
        gapMd: global.spacing[8],
        gapLg: global.spacing[16],
        paddingSm: global.spacing[12],
        paddingMd: global.spacing[14],
        paddingLg: global.spacing[16],
        paddingXl: global.spacing[24],
      },
    },
    radius: {
      sm: global.radius[5],
      md: global.radius[8],
      lg: global.radius[12],
      xl: global.radius[24],
      full: global.radius.full,
      continuous: global.radius.continuous,
    },
  },

  dark: {
    color: {
      text: {
        primary: global.color.neutral[0],
        secondary: global.color.neutral.dark[800],
        tertiary: global.color.neutral.dark[850],
        vibrant: global.color.neutral[0],
        vibrantControl: "#bfbfbf",
        onColor: global.color.neutral[0],
        pageTitle: "#3e4546",   // TODO — dark variant TBD
      },
      surface: {
        default: global.color.neutral.dark[0],
        grouped: global.color.neutral.dark[0],
        elevated: global.color.neutral.dark[50],
        card: global.color.neutral.dark[50],
        overlay: "rgba(0,0,0,0.50)",
      },
      border: {
        default: global.color.neutral.dark[100],
        separator: global.color.neutral.dark[100],
      },
      tint: {
        default: global.color.brand.teal.light400,   // TODO — Core/primary dark
      },
      accent: {
        teal: global.color.brand.teal.dark500,    // TODO
        earnTeal: global.color.brand.teal.deep,
        earnTealBg: global.color.brand.teal.deep10,
      },
      interactive: {
        primaryDefault: global.color.brand.indigo.dark,  // TODO
        indigoBg: global.color.brand.indigo.darkBg,
        indigoBorder: global.color.brand.indigo.darkBg,
      },
      fill: {
        quaternary: "rgba(118,118,128,0.18)",
        vibrantTertiary: "#2c2c2e",   // TODO
      },
      status: {
        success: global.color.accent.green,
        successBg: global.color.accent.greenBgDark,
        error: global.color.accent.red,
        errorBg: global.color.accent.redBg,
        warning: global.color.accent.orange,
      },
      contest: {
        prize: global.color.accent.orange,
        prizeBg: global.color.accent.orangeBg,
        consensus: global.color.contest.consensus,    // TODO — dark variant
        consensusBg: global.color.contest.consensusBg, // TODO
        division: global.color.contest.division,
        divisionBg: global.color.contest.divisionBg,
      },
    },
    // Spacing and radius same as light
    spacing: {
      layout: {
        horizontal: global.spacing[16],
        gapSection: global.spacing[20],
      },
      component: {
        gapSm: global.spacing[4],
        gapMd: global.spacing[8],
        gapLg: global.spacing[16],
        paddingSm: global.spacing[12],
        paddingMd: global.spacing[14],
        paddingLg: global.spacing[16],
        paddingXl: global.spacing[24],
      },
    },
    radius: {
      sm: global.radius[5],
      md: global.radius[8],
      lg: global.radius[12],
      xl: global.radius[24],
      full: global.radius.full,
      continuous: global.radius.continuous,
    },
  },
} as const;

// ─── Tier 3: Element Tokens ───────────────────────────────────────────────────
// Scoped to specific UI components. References semantic tokens by path string.
// Light/dark variants resolved at runtime via CSS custom properties.

export const elements = {
  button: {
    primary: {
      // backgroundColor: semantic.light.color.interactive.primaryDefault
      borderRadius: global.radius[8],
      paddingVertical: global.spacing[14],
      paddingHorizontal: global.spacing[24],
      minHeight: 52,
      fontSize: global.font.size[17],
      fontWeight: global.font.weight.semibold,
    },
    secondary: {
      borderWidth: global.border.default,
      borderRadius: global.radius[8],
      paddingVertical: global.spacing[14],
      paddingHorizontal: global.spacing[24],
      minHeight: 52,
    },
  },

  card: {
    default: {
      borderWidth: global.border.default,
      borderRadius: global.radius[12],
      paddingVertical: global.spacing[12],
      paddingHorizontal: global.spacing[12],
    },
    featured: {
      borderRadius: global.radius[12],
      paddingVertical: global.spacing[12],
      paddingHorizontal: global.spacing[16],
    },
    contest: {
      borderRadius: global.radius[5],
      // shadow: "0px 1px 4px rgba(0,0,0,0.25)"
      imageHeightRatio: 0.63,
    },
    contestRecommended: {
      borderWidth: global.border.emphasis,
      // borderColor: neutral.0 (white)
      // glowShadow: "0px 0px 6px 1px #3499a4" — TODO
    },
  },

  chip: {
    filter: {
      borderRadius: global.radius[5],
      padding: global.spacing[8],  // all sides (10pt per Figma, using 8 from scale)
      fontSize: global.font.size[14],
      fontWeight: global.font.weight.semibold,
    },
    mode: {
      borderRadius: global.radius.full,
      paddingVertical: 2,
      paddingHorizontal: global.spacing[8],
      fontSize: global.font.size[11],
      fontWeight: global.font.weight.semibold,
    },
    prize: {
      borderRadius: global.radius[5],
      paddingVertical: global.spacing[4],
      paddingHorizontal: global.spacing[8],
      fontSize: global.font.size[14],
      fontWeight: global.font.weight.semibold,
    },
    status: {
      borderRadius: global.radius.full,
      paddingVertical: global.spacing[4],
      paddingHorizontal: global.spacing[8],
      fontSize: global.font.size[11],
      fontWeight: global.font.weight.semibold,
    },
  },

  navigationBar: {
    height: 44,
    titleFontSize: global.font.size[17],
    titleFontWeight: global.font.weight.semibold,
  },

  tabBar: {
    iconSize: 28,
    labelFontSize: global.font.size[10],
    labelFontWeight: global.font.weight.semibold,
    gap: 1,
  },

  sheet: {
    borderRadiusTop: global.radius[24],
    handleWidth: 32,
    handleHeight: 4,
    handle: {
      borderRadius: global.radius.full,
      marginTop: global.spacing[16],
      marginBottom: global.spacing[16],
    },
  },

  progressBar: {
    height: 4,
    borderRadius: global.radius.full,
  },

  iconBubble: {
    sm: { size: 24, iconSize: 14, borderRadius: global.radius.full },
    md: { size: 32, iconSize: 15, borderRadius: global.radius.full },
    lg: { size: 40, iconSize: 18, borderRadius: global.radius[12] },
    hero: { size: 64, iconSize: 28, borderRadius: global.radius.full },
    heroMax: { size: 80, iconSize: 36, borderRadius: global.radius.full },
  },
} as const;

// ─── Convenience export ───────────────────────────────────────────────────────

export const tokens = { global, semantic, elements } as const;
export type Tokens = typeof tokens;
