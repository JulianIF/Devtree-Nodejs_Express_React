/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-bg': "url('/bg.svg')"
      },
      backgroundSize: {
        "home-xl": "50%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

