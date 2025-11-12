import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'saint-green': '#14c681',
        'saint-blue': '#286999',
        'saint-blue-light': '#007BFF',
        'saint-gray': '#3F3F3F',
        'saint-light': '#F0F0F0',
      },
      backgroundImage: {
        'saint-gradient': 'linear-gradient(135deg, #14c681 0%, #286999 100%)',
        'hero-gradient': 'linear-gradient(135deg, #14c681 0%, #286999 50%, #007BFF 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(20, 198, 129, 0.1) 0%, rgba(40, 105, 153, 0.1) 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
