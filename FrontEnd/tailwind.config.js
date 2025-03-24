/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#4A6FA5',
          secondary: '#FF9A76',
        },
      },
    },
    plugins: [],
  };