const twentyConfig = {
  // extend or override default configuration
  theme: {
    extend: {
      boxShadow: {
        logo: 'inset 0 10px 4px -3px #fff, inset 0 -10px 4px -3px #fff, inset 6px 0 3px -3px rgba(0, 0, 0, .1), inset 1px 0 0 0 rgba(0, 0, 0, .15)',
        voucher: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
      },
      colors: {
        'extendedapp-primary': {
          50: '#F1F4F8',
          100: '#DFE6F0',
          150: '#CAD6F2',
          200: '#B6C7F3',
          250: '#A1B7F5',
          300: '#8DA7F7',
          350: '#7898F8',
          400: '#4F76FC',
          450: '#3B69FD',
          500: '#2659FF',
          550: '#2854E4',
          600: '#2A50CA',
          650: '#2B4BAF',
          700: '#2D4694',
          750: '#2E4487',
          800: '#233B85',
          850: '#183182',
          900: '#0D2880',
        },
        'extendedapp-gray': {
          50: '#F4F4F4',
          100: '#E6E6E6',
          150: '#D8D8D8',
          200: '#CACACA',
          250: '#BCBCBC',
          300: '#AEAEAE',
          350: '#A0A0A0',
          400: '#929292',
          450: '#848484',
          500: '#777777',
          550: '#696969',
          600: '#555555',
          650: '#4C4C4C',
          700: '#3A3A3A',
          750: '#333333',
          800: '#232323',
          850: '#151515',
          900: '#070707',
        },
      },
      fontFamily: {
        sans: '"Baton", Arial, Helvetica, sans-serif',
      },
    },
  },
}

export default twentyConfig
