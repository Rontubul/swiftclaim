import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        navy: {
          900: '#0a0e1a',
          800: '#0f1628',
          700: '#162038',
        },
        gold: {
          400: '#f0c040',
          500: '#e6ac20',
          600: '#cc9500',
        }
      }
    },
  },
  plugins: [],
}
export default config
