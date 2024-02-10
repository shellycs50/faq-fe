/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      guminert: ['Guminert'],
    },
    extend: {
      placeholder: {
        'no-outline': {
          outline: 'none',
        }
      }
    },
  },
  plugins: [],
}