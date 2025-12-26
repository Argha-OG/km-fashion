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
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        glass: {
          10: "rgb(var(--glass-base) / 0.1)",
          20: "rgb(var(--glass-base) / 0.2)",
          30: "rgb(var(--glass-base) / 0.3)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '0.15em',
        'mega': '0.25em',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgb(var(--glass-base) / 0.05) 0%, rgb(var(--glass-base) / 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
