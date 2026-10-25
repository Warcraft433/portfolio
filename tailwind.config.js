/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CHARCOAL, BLACK, GRAY, NEON RED & NEON BLUE PALETTE

        // Pure Jet & Deep Blacks
        black: {
          DEFAULT: "#000000",
          950: "#050507", // Deepest canvas
          900: "#08080b", // Main dark canvas
          850: "#0c0d12",
        },

        // Technical Charcoal
        charcoal: {
          950: "#0d0e13",
          900: "#12131a", // Card surface
          850: "#171822", // Elevated surface
          800: "#1e1f2b", // Hover surface
          750: "#242636",
          700: "#2c2e40",
          DEFAULT: "#12131a",
        },

        // Cool Structural Gray Scale
        gray: {
          50: "#f8f9fb",
          100: "#f0f2f5",
          200: "#e2e5ec",
          300: "#c8ccd8",
          400: "#9da1b5",
          500: "#71758c", // Neutral mid-gray
          600: "#4e5166",
          700: "#363847", // Gray borders
          800: "#252733", // Subtle dividers
          900: "#191a24",
          950: "#101117",
          DEFAULT: "#71758c",
        },

        // NEON RED (Primary Electrifying Accent)
        neonRed: {
          50: "#fff0f2",
          100: "#ffe0e5",
          200: "#ffc2cb",
          300: "#ff8fa0",
          400: "#ff4d66",
          500: "#ff1744", // Pure Electric Neon Red
          600: "#e50935",
          700: "#bd0027",
          800: "#9c0323",
          900: "#7d0922",
          DEFAULT: "#ff1744",
          glow: "rgba(255, 23, 68, 0.4)",
          subtle: "rgba(255, 23, 68, 0.12)",
        },

        // NEON BLUE (Secondary Tech Accent)
        neonBlue: {
          50: "#e0faff",
          100: "#b9f5fe",
          200: "#7becfd",
          300: "#37dffb",
          400: "#05ccf1",
          500: "#00e5ff", // Pure Vivid Neon Blue / Cyan
          600: "#00b4d8",
          700: "#008fae",
          800: "#057088",
          900: "#095c70",
          DEFAULT: "#00e5ff",
          glow: "rgba(0, 229, 255, 0.4)",
          subtle: "rgba(0, 229, 255, 0.12)",
        },

        // Primary Accent Mapping (Neon Red)
        primary: {
          DEFAULT: "#ff1744",
          50: "#fff0f2",
          100: "#ffe0e5",
          200: "#ffc2cb",
          300: "#ff8fa0",
          400: "#ff4d66",
          500: "#ff1744",
          600: "#e50935",
          700: "#bd0027",
          800: "#9c0323",
          900: "#12131a",
          glow: "rgba(255, 23, 68, 0.4)",
        },

        // Dark Theme Tokens
        dark: {
          950: "#08080b", // Deep Black canvas
          900: "#12131a", // Charcoal card base
          850: "#171822", // Elevated surface
          800: "#252733", // Gray border
          750: "#2c2e40",
          700: "#363847",
          600: "#4e5166",
          500: "#71758c",
          400: "#9da1b5", // Secondary text
          300: "#c8ccd8", // High-contrast text
          200: "#e2e5ec",
          100: "#f4f5f8", // Crisp text on dark
        },

        // Slate Theme Tokens (Light mode)
        slate: {
          50: "#f8f9fb", // Light canvas
          100: "#f0f2f5", // Light card
          150: "#e6e9f0",
          200: "#dbe0eb", // Light border
          250: "#cbd1e0",
          300: "#b5bccf",
          400: "#8b93ab",
          500: "#69728c",
          600: "#4c536a",
          700: "#343a4c", // Body text
          800: "#222633",
          900: "#12141c", // Heading text
          950: "#090a0f",
        },

        // Aliases for compatibility
        neon: {
          DEFAULT: "#ff1744",
          500: "#ff1744",
          blue: "#00e5ff",
          glow: "rgba(255, 23, 68, 0.4)",
          subtle: "rgba(255, 23, 68, 0.12)",
        },
        gold: {
          500: "#ff1744",
          DEFAULT: "#ff1744",
        },
        champagne: {
          400: "#00e5ff",
          500: "#ff1744",
          DEFAULT: "#ff1744",
        },
        cerulean: {
          400: "#00e5ff",
          500: "#00e5ff",
          DEFAULT: "#00e5ff",
          glow: "rgba(0, 229, 255, 0.35)",
        },
        rose: {
          400: "#ff4d66",
          500: "#ff1744",
          DEFAULT: "#ff1744",
          glow: "rgba(255, 23, 68, 0.35)",
        },
        silver: {
          100: "#f4f5f8",
          DEFAULT: "#f4f5f8",
        },
        ivory: {
          200: "#f0f2f5",
          DEFAULT: "#f0f2f5",
        },
        graphite: {
          DEFAULT: "#71758c",
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Outfit", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 10s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: 0.15, transform: "scale(1)" },
          "50%": { opacity: 0.35, transform: "scale(1.06) translate(8px, -8px)" },
        }
      }
    },
  },
  plugins: [],
}
