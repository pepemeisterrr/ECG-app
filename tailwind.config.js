/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#e30b5d",
        secondary: "#250be3",
        tertiary: "#0be391",
        quaternary: "#c9e30b",
        boulder: "#747679",
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

