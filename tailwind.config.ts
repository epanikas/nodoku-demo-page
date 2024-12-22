// import flowbite from "flowbite/plugin";
import type {Config} from "tailwindcss";
import * as typo from '@tailwindcss/typography';


const config: Config = {
    content: [
        // "./node_modules/flowbite-react/lib/**/*.js",
        // './node_modules/flowbite/**/*.js',
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./schemas/**/*.yml",
        // "./schemas/**/*.yml",
        // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        // "./node_modules/flowbite-react/lib/**/*.js",
        // "./node_modules/nodoku-flowbite/**/*.js",

        "./node_modules/nodoku-core/esm/**/*.js",
        "./node_modules/nodoku-core/esm/**/*.jsx",
        "./node_modules/nodoku-components/esm/**/*.js",
        "./node_modules/nodoku-components/esm/**/*.jsx",
        "./node_modules/nodoku-flowbite/esm/**/*.js",
        "./node_modules/nodoku-flowbite/esm/**/*.jsx",
        "./node_modules/nodoku-flowbite/schemas/**/*.yml",
        "./node_modules/nodoku-mambaui/esm/**/*.js",
        "./node_modules/nodoku-mambaui/esm/**/*.jsx",
        "./node_modules/nodoku-mambaui/schemas/**/*.yml",
        "./public/**/*.html",
        "./src/**/*.{html,js}",
        "./public/site/**/*.yaml",
        // flowbite.content(),
        "./node_modules/flowbite/**/*.js"
        // "node_modules/flowbite-react/dist/esm/components/Carousel/*.mjs",
    ],

    theme: {
        extend: {
            // backgroundImage: {
            //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            //     "gradient-conic":
            //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            // },
            aspectRatio: {
                '4/2': '4 / 2',
                'carousel': '4 / 1.61',
                'narrow': '6 / 2'
                // 'carousel': '4 / 2.5',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'unset', // add required value here
                    }
                }
            }
        },
    },
    plugins: [
        // require("flowbite/plugin")
        // flowbite.plugin(),
        typo.default(),
    ],
    // prefix: 'tw-',
};


// module.exports = {
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./public/**/*.html",
//   ],
//   plugins: [],
//   theme: {},
// };

// module.exports = {
//   content: [
//     "./node_modules/flowbite-react/lib/**/*.js",
//     "./app/**/*.{ts,tsx}",
//     "./pages/**/*.{ts,tsx}",
//     "./public/**/*.html",
//   ],
//   plugins: [
//     require("flowbite/plugin")
//   ],
//   theme: {},
// };

export default config;
