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
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}

