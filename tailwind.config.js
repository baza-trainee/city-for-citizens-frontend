/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      // new design
      roboto: ['var(--font-roboto)'],
      ubuntu: ['var(--font-font-ubuntu)'],
      exo_2: ['var(--font-exo-2)'],
      source_sans_3: ['var(--font-source-sans-3)'],

      // old design
      sans: ['NewMexika', 'sans-serif'],
      heading: ['MAK', 'sans-serif'],
    },
    colors: {
      // new design
      admin: {
        backdrop: '#1E1E1E80',
        darkblue: '#3D4756',
        dark: '#131313',
        dark_2: '#4E4E4E',
        menu: '#B0C1EF',
        side_bar: '#6589E3',
        light_1: '#FBFAFA',
        light_2: '#FEFEFE',
        light_3: '#FFFFFF',
      },
      state: {
        success: '#2D982B',
        error_main: '#E21B00',
        error_primary: '#E11717',
        error_second: '#FFF0F0',
        non_focus: '#868686',
      },

      icon: '#767676',
      black: '#000000',
      white: '#FFFFFF',
      yellow: '#FFD646',

      // light
      light: {
        accent: '#000000',

        // text
        head: '#000000',
        main: '#696969',

        // background
        primary: '#FFFFFF',
        secondary: '#F2F2F2',
        border: '#AEAEAE',

        button: {
          hover: '#464646',
          default: '#000000',
          pressed: '#222222',
          text: '#FFFFFF',
        },
      },

      // dark

      dark: {
        accent: '#FFD646',

        // text
        head: '#FFFFFF',
        main: '#BBBBBB',

        // background
        primary: '#191919',
        secondary: '#060606',
        border: '#2B2B2B',

        button: {
          hover: '#FFF464',
          default: '#FFD646',
          pressed: '#E1B828',
          text: '#000000',
        },
      },

      // old design
      'primary/100': '#0D3BDD',
      'primary/80': '#6589E3',
      'primary/0': '#000',
      'gray/100': '#121923',
      'gray/80': '#222A30',
      'gray/50': '#485058',
      'gray/30': '#858E97',
      'gray/20': '#ACB5BE',
      'gray/10': '#DFE5EC',
      'gray/5': '#F6F6F6',
      'gray/0': '#FCFCFC',
      error: '#FF0000',
    },
    extend: {
      textColor: {
        active: '#0D3BDD',
      },
      borderColor: {
        active: '#0D3BDD',
      },
    },
    screens: {
      mobile: '430px',
      tablet: '932px',
      desktop: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        tablet: '26px',
      },
    },
  },
  plugins: [],
};
