/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'var(--dark)',
        'gray-white': 'var(--gray_white)',
        'gray-white-white': 'var(--gray_white_white)',
        red: 'var(--red)',
        'yellow-dark': 'var(--yellow_dark)',
        'black-soft': 'var(--black_soft)',
      },
      boxShadow: {
        '--whiteShadow': '0 35px 60px -15px rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
}
