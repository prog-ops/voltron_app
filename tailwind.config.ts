import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customGreen: '#102A2A',
      },
      borderColor: {

      },
      borderRadius: {
        'custom': '10px',
      },
      scale: {
        '25': '1.02', // Add custom scale for 25%
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'], // Enable scale on hover
    },
  },
  plugins: [],
};
export default config;
