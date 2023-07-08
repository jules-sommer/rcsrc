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
      }
    }
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
          "warning": "#af760e",
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
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("daisyui"),
  ]
}

