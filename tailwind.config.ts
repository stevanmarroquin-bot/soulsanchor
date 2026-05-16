import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        aileron: ['AileronHeavy', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a08',
        parchment: '#e8e4dc',
        dim: 'rgba(232,228,220,0.42)',
        muted: 'rgba(232,228,220,0.25)',
        line: 'rgba(232,228,220,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
