/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['Aeonik', 'sans-serif'],
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

