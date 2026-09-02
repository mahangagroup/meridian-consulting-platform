/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0F19',
          surface: '#131826',
          raised: '#1A2032',
          border: '#262E42'
        },
        brass: {
          DEFAULT: '#C9A15A',
          light: '#DDBE85',
          dark: '#9C7A3D'
        },
        bridge: {
          blue: '#2B6CB0',
          teal: '#16A394'
        },
        mist: {
          DEFAULT: '#EDEFF3',
          muted: '#9AA3B2',
          faint: '#5B6577'
        }
      },
      fontFamily: {
        display: ['"Newsreader"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'bridge-gradient': 'linear-gradient(135deg, #2B6CB0 0%, #16A394 100%)',
        'brass-gradient': 'linear-gradient(135deg, #DDBE85 0%, #9C7A3D 100%)'
      }
    }
  },
  plugins: []
}
