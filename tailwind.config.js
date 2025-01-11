/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '--dark': '#464646',
        '--gray_white': '#E1E1E1',
        '--gray_white_white': '#EFEFEF',
        '--red': '#FF4F4F',
        '--yellow_dark': '#F1BF5D',
      },
    },
  },
  plugins: [],
}
