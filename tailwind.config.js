/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./storybook/*.{js}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      'xs': '0.6875rem',
      'sm': '0.75rem',
      'md': '0.8125rem',
      'lg': '0.875rem',
      'xl': '1rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    colors: {
      ...colors,
      primary: {
        ...colors.violet,
        500: '#7F63F4'
      },
      main: "#7F63F4",
      tagBlue: "#6B9EFF",
      tagPurple: "#8B6CFF",
      tagPink: "#FF6CA2",
      tagOrange: "#FF996C",
      tagYellow: "#F1A863",
      errorRed: "#FF4F47",
      lightBlue: "#F9FAFB",
      lightPurple: "#EFEDFC",
      darkBlue: "#474F66",
      darkGray: {
        10: "#838383",
        20: "#5A5A5A"
      },
      lightGray: {
        10: "#F2F2F2",
        20: "#EAEAEA",
        30: "#D0D0D0",
        40: "#B7B7B7"
      },
      dimmed: "rgba(131, 131, 131, 0.4)",
      highlight: "#FFF2C9"
    },
    lineHeight: {
      ...defaultTheme.lineHeight,
      '12': '3rem' 
    }
  },
  plugins: [],
}
