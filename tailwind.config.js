/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2563eb',
        'accent-light': '#eff6ff',
        border: '#e5e7eb',
        'text-primary': '#1a1a1a',
        'text-secondary': '#6b6b6b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
