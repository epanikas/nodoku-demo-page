// ref: https://dev.to/dawnind/how-to-setup-tailwind-with-purgecss-and-postcss-3341


const options = {
    content: [
        ".next/server/app/*.html",
        ".next/server/app/**/*.html",
        "./node_modules/flowbite/lib/esm/components/carousel/*.js"
    ],
    css: [".next/static/css/*.css"],
    output: "./.next/static/css",
    // safelist: ["body", "html", ".transition-transform", ".transform", /translate-.*/g],
    safelist: ["body", "html"],
    defaultExtractor: content => content.match(/[\w-/:[\]]+(?<!:)/g) || []
}

export default options;
