import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        destructive: "var(--color-destructive)",
        card: "var(--color-card)",
        popover: "var(--color-popover)",
        sidebar: "var(--color-sidebar)",

      },
      fontFamily: {
        gtpro: ["var(--font-gtpro)", "system-ui", "sans-serif"],
        gtalpina: ["var(--font-gtAlpina)", "serif"],
        nanum: ["var(--font-nanum-pen)", "cursive"],
      },
      fontSize: {
        xxs: "11px",
      },
      screens: {
        ipad: "834px",
        "ipad-air": "820px",
        "ipad-mini": "744px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
}

export default config
