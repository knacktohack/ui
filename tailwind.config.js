/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary' : '#00444c',
        'orange-primary' : '#ff6942',
        'green-light':'#ebfdff'
      },
    },
  },
  plugins: [],
}