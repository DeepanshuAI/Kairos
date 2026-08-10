/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F3F0E8",
          soft: "#FAF9F6",
          muted: "#E8E4DA",
        },
        charcoal: {
          DEFAULT: "#151515",
          light: "#242424",
          muted: "#3E3E3E",
        },
        stone: {
          DEFAULT: "#B8B0A2",
          light: "#D4CECE",
          dark: "#7A7368",
        },
        bronze: {
          DEFAULT: "#9A8060",
          light: "#B89D7A",
          dark: "#786246",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '0.2em',
        widestHeadline: '0.08em',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
