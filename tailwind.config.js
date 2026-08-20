/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nandhas Core Professional Industrial Palette
        navy: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b0c2fd',
          400: '#8ba0fa',
          500: '#3b5edb',
          600: '#1d3fad',
          700: '#123B82', // Secondary Royal Blue
          800: '#0B1F4D', // Primary Deep Navy
          900: '#08173a',
          950: '#040b1d',
        },
        primary: {
          DEFAULT: '#0B1F4D',
          hover: '#08173a',
        },
        secondary: {
          DEFAULT: '#123B82',
          hover: '#0f326f',
        },
        accent: {
          DEFAULT: '#F97316', // Industrial Accent Orange
          hover: '#ea580c',
          light: '#fff7ed',
          orange: '#F97316',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          dark: '#0F172A',
        },
        content: {
          main: '#111827',
          muted: '#64748B',
          light: '#94A3B8',
        },
        trust: {
          green: '#16A34A',
          'green-light': '#f0fdf4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(11, 31, 77, 0.08), 0 8px 10px -6px rgba(11, 31, 77, 0.04)',
        'dropdown': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
