import type { Config } from 'tailwindcss';

export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2F80ED',
        'secondary': '#4A5568'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
} satisfies Config;
