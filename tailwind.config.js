module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      resique: ['Risque', 'cursive'],
      redressed: ['Redressed', 'cursive'],
      ropa_sans: ['Ropa Sans', 'sans-serif'],
      rhodium_libre: ['Rhodium Libre', 'serif'],
      lato: ['Lato', 'sans-serif'],
      roboto_mono: ['Roboto Mono', 'monospace'],
    },
    extend: {
      colors: {
        scroll: {
          thumb: 'var(--color-primary-900)',
          track: 'var(--color-primary-900)',
          hover: 'var(--color-primary-900)',
        },
        cursor: 'var(--color-primary-900)',
        background: 'var(--color-background)',
        keyboard: {
          background: 'var(--color-keyboard)',
          keycolor: 'var(--color-primary-500)',
          key: 'var(--color-key)',
          active: 'var(--color-keyactive)',
        },
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
    },
  },
};
