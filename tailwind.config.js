/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}", // عدل حسب مكان ملفاتك
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"], // Inter للـ body
      mono: ["var(--font-roboto-mono)", "monospace"], // Roboto Mono للكود أو الـ snippets
    },

    colors: {
      brand: {
        DEFAULT: "#30818a", // اللون الأساسي
        light: "#369ea4", // أفتح شوية
        dark: "#2a6b73", // أغمق للهيدر/الفوتر
      },
    },
  },
};
export const plugins = [require("tw-animate-css")];
