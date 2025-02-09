/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        '--dark': '#464646',
        '--gray_white': '#E1E1E1',
        '--gray_white_white': '#EFEFEF',
        '--red': '#FF4F4F',
        '--yellow_dark': '#F1BF5D',
        '--black-soft': '#242424',
        '--black': '#1a1a1a',
        '--green': '#42b883',
        '--vt-c-text-dark-1': 'rgba(255, 255, 255, .87)',
      },
      boxShadow: {
        '--whiteShadow': '0 35px 60px -15px rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
}
