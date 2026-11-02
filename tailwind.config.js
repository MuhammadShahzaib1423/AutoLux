/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        parchment: '#F3EDE3',
        sand: '#E8DFD0',
        ink: {
          DEFAULT: '#1C1917',
          soft: '#44403C',
          muted: '#78716C',
        },
        gold: {
          DEFAULT: '#B45309',
          light: '#D97706',
          soft: '#F5E6C8',
        },
        sage: {
          DEFAULT: '#5B7A62',
          light: '#E4EBE2',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(28, 25, 23, 0.08)',
        lift: '0 18px 40px rgba(28, 25, 23, 0.14)',
      },
    },
  },
  plugins: [],
}
