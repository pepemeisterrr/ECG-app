/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif']
      },
      colors: {
        grviolet: "#ef32d9",
        grblue: "#89fffd",

      },
      container: {
        center: true,
        padding: {
          Default: '1rem',
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        
      },
    },
  },
  plugins: [],
}

