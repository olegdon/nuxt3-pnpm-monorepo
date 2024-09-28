/** @type {import('tailwindcss').Config} */
export default {
  // extend or override default configuration
  theme: {
    extend: {
      colors: {
        webapp: {
          100: '#FCFFFE',
          200: '#DAF2EA',
          300: '#ACE6D2',
          400: '#47CCA0',
          500: '#00BF80',
          600: '#00A66F',
          700: '#008055',
          800: '#00593C',
          900: '#004730',
        },
      },
      backgroundImage: {
        'interactive-gradient': 'linear-gradient(90deg, #fff, #fff), linear-gradient(90deg, #00dc82, #1de0b1, #36e4da)',
        'interactive-gradient-dark': 'linear-gradient(90deg, #18181b, #18181b), linear-gradient(90deg, #00dc82, #1de0b1, #36e4da)',
      },
    },
  },
}
