/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './about/**/*.html', './blog/**/*.html'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        primary: '#0F172A',
        secondary: '#475569',
        accent: '#2563EB',
        accentDark: '#1D4ED8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15,23,42,0.04), 0 1px 3px 0 rgba(15,23,42,0.06)',
        cardHover: '0 12px 24px -8px rgba(15,23,42,0.12), 0 4px 8px -4px rgba(15,23,42,0.06)',
        book: '20px 24px 60px -16px rgba(15,23,42,0.35)',
      },
    },
  },
  plugins: [],
};
