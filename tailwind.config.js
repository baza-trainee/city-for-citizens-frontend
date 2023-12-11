/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['NewMexika', 'sans-serif'],
      heading: ['MAK', 'sans-serif'],
    },
    colors: {
      'primary/100': '#0D3BDD',
      'primary/80': '#6589E3',
      'primary/0': '#000',
      'gray/100': '#121923',
      'gray/80': '#202529',
      'gray/50': '#485058',
      'gray/30': '#858E97',
      'gray/20': '#ACB5BE',
      'gray/10': '#DFE5EC',
      'gray/5': '#F6F6F6',
      'gray/0': '#FCFCFC',
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
