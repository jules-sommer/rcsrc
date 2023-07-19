/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'light-xl': [
          'drop-shadow(0 20px 13px rgba(125, 211, 252, 0.5)))',
          'drop-shadow(0 8px 5px rgba(125, 211, 252, 0.05))'
        ]
      },
      colors: {
        'pinkola': {
          100: "#ffdde2",
          200: "#ffbbc4",
          300: "#ff98a7",
          400: "#ff7689",
          500: "#ff546c",
          600: "#cc4356",
          700: "#993241",
          800: "#66222b",
          900: "#331116"
        }
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  daisyui: {
    themes: [
      {
        lsd: {
          "primary": "#ff546c",
          "secondary": "#5eead4",
          "accent": "#14b8a6",
          "neutral": "#020617",
          "base-100": "#1d1a48",
          "info": "#5fb8e7",
          "success": "#139a7b",
          "warning": "#f1a821",
          "error": "#dc3848",
        },
      },
      "cupcake",
      "synthwave",
      "cyberpunk",
      "retro",
      "valentine",
    ],
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
    require("daisyui"),
  ]
}