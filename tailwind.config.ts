import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "purple-power": "#411175",
        "purple-mid": "#6612B5",
        "purple-light": "#B063FF",
        yellow: "#F9FF26",
        grey: "#EEEEEE",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      maxWidth: {
        content: "768px",
      },
      width: {
        nav: "248px",
      },
    },
  },
  plugins: [],
};

export default config;
