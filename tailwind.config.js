/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary/100': '#0D3BDD',
      'primary/80': '#6589E3',
      'gray/100': '#272429',
      'gray/80': '#202529',
      'gray/50': '#485058',
      'gray/30': '#858E97',
      'gray/20': '#ACB5BE',
      'gray/10': '#DFE5EC',
      'gray/5': '#F6F6F6',
      'gray/0': '#FCFCFC',
      'dark-blue': '#121923',
    },
    extend: {},
    fontFamily: {
      sans: ['NewMexika', 'sans-serif'],
      heading: ['MAK', 'sans-serif'],
    },
    screens: {
      mobile: '320px',
      tablet: '768px',
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
