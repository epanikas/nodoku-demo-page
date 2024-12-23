/** @type {import('postcss-load-config').Config} */

// import autoprefixer from 'autoprefixer';
// import tailwindcss from 'tailwindcss';
// import purgeCSSPlugin from "@fullhuman/postcss-purgecss";


const config = {
  plugins: {
    "postcss-import": {},
    "autoprefixer": {},
    "tailwindcss": {},
    // purgeCSSPlugin: ["purgeCSSPlugin", {content: "test"}]
    // "@fullhuman/postcss-purgecss": {content: "test"}
  }
};

export default config;
