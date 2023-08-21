/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./views/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        popMedium:'PoppinsMedium'
      }
    },
  },
  plugins: [],
}

