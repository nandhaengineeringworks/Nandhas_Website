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
        // High-Intensity Vibrant Color Palette
        navy: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#bae0ff',
          300: '#7cc7ff',
          400: '#36a8ff',
          500: '#0084ff', // Vibrant Electric Blue
          600: '#0062ff',
          700: '#0f52ba', // Rich Sapphire Blue
          800: '#0a1d4a', // Deep Navy
          900: '#051130',
          950: '#03081c', // High-Contrast Midnight
        },
        primary: {
          DEFAULT: '#0a1d4a',
          hover: '#051130',
        },
        secondary: {
          DEFAULT: '#0f52ba',
          hover: '#0062ff',
        },
        accent: {
          DEFAULT: '#ff5722', // High-Intensity Radiant Orange
          hover: '#e64a19',
          light: '#fff3e0',
          orange: '#ff6600',
          gold: '#ff9900', // Vibrant Gold
          cyan: '#00f0ff', // High-Intensity Neon Cyan
          emerald: '#00d084', // Vibrant Emerald Green
        },
        surface: {
          bg: '#f4f7fc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#03081c',
        },
        trust: {
          green: '#00c853',
          'green-light': '#e8f5e9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(255, 102, 0, 0.45)',
        'glow-blue': '0 0 25px rgba(0, 132, 255, 0.45)',
        'glow-green': '0 0 25px rgba(0, 208, 132, 0.45)',
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'card-hover': '0 12px 32px -4px rgba(10, 29, 74, 0.12), 0 8px 16px -4px rgba(10, 29, 74, 0.08)',
      }
    },
  },
  plugins: [],
};
