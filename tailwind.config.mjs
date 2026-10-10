/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,md}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#18181B',
        brand: { yellow: '#FFD000', teal: '#14B8A6' },
      },
    },
  },
  plugins: [],
};
