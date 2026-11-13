/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './about/**/*.html', './blog/**/*.html'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        accentDark: 'rgb(var(--color-accent-dark) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Archivo', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(17,17,15,0.04), 0 1px 3px 0 rgba(17,17,15,0.06)',
        cardHover: '0 12px 24px -8px rgba(17,17,15,0.12), 0 4px 8px -4px rgba(17,17,15,0.06)',
        book: '20px 24px 60px -16px rgba(17,17,15,0.25)',
      },
    },
  },
  plugins: [],
};
