import theme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],

        ...theme.fontFamily,
      },
    },
  },
  plugins: [],
};
