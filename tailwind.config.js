/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0b',
        'ink-2': '#3a3a3a',
        mute: '#666666',
        line: '#dcdcdc',
        orange: { DEFAULT: '#f16121', ink: '#b8420f' },
        wash: { DEFAULT: '#fff1e8', 2: '#ffe2d0' },
        tint: '#f3f3f2',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Public Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: { page: '1344px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.12) translate(-1.5%, -1%)' } },
        rise: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
        pop: { from: { opacity: 0, transform: 'translateY(12px) scale(.98)' }, to: { opacity: 1, transform: 'none' } },
        bounce3: { '0%,80%,100%': { transform: 'translateY(0)', opacity: .4 }, '40%': { transform: 'translateY(-4px)', opacity: 1 } },
        bar: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        kenburns: 'kenburns 9s ease-out forwards',
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        pop: 'pop .28s cubic-bezier(.2,.7,.2,1) both',
        bounce3: 'bounce3 1.1s infinite',
      },
    },
  },
  plugins: [],
}
