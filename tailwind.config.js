/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in-from-top": {
          "0%": { transform: 'translateY(-15%)', opacity: 0 },
          "100%": { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        "slide-in-from-top": 'slide-in-from-top 0.35s ease-out'
      }
    },
  },
  plugins: [],
}