/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  groupHover: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      roboto: ['var(--font-roboto)'],
      ubuntu: ['var(--font-font-ubuntu)'],
      exo_2: ['var(--font-exo-2)'],
      source_sans_3: ['var(--font-source-sans-3)'],
      oswald: ['var(--font-oswald)'],
    },

    colors: {
      admin: {
        backdrop: '#1E1E1E80',
        darkblue: '#3D4756',
        gray: '#9DAFDC',
        gray_2: '#747474',
        lightgray: '#EAEAEA',
        darkgray: '#7E8492',
        dark: '#131313',
        dark_2: '#4E4E4E',
        dark_3: '#151515',
        menu: '#B0C1EF',
        placeholder: '#7E8492',
        side_bar: '#6589E3',
        light_1: '#FBFAFA',
        light_2: '#FEFEFE',
        light_3: '#FFFFFF',
        green: '#2D982B',
        red: '#F00631',

        modal: {
          error: '#E21B00',
        },

        button: {
          hover: '#464646',
          hover_outlined: '#EEE',
          default: '#131313',
          active: '#3D4756',
          active_outlined: '#DCDCDC',
          disabled: '#7E8492',
          text: '#FFFFFF',
          border: '#131313',
        },
      },

      auth: {
        dark: '#131313',
        dark_10: '#7E8492',
        light: '#FFFFFF',
        light_2: '#FEFEFE',
      },

      state: {
        success: '#2D982B',
        warn_main: '#FFAB2D',
        error_main: '#E21B00',
        error_primary: '#E11717',
        error_second: '#FFF0F0',
        non_focus: '#868686',
        disabled: '#7E8492',
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
          switch: '#222A30',
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
          switch: '#F3F3F3',
        },
      },
    },

    screens: {
      mobile: '360px',
      tablet: '768px',
      laptop: '960px',
      laptop_xl: '1024px',
      desktop: '1280px',
      desktop_m: '1440px',
      desktop_xl: '1920px',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        laptop: '40px',
        desktop: '240px',
      },
    },
    extend: {
      boxShadow: {
        list: '7px 0px 2px 10px #FBFAFA, inset 0px 0px 2px 15px #FBFAFA',
        main: '0px 0px 10px 1px',
        gallery: '0px 5px 12px 0px rgba(115, 115, 115, 0.10);',
      },
    },
  },
  plugins: [],
};
