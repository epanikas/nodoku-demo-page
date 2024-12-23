// import {PurgeCSS} from "./purgecss-esm"
import {PurgeCSS} from "purgecss"
import fs from "node:fs";
import {ResultPurge} from "purgecss";
import path from "node:path";


// const options = await getOptions(program);
// const options: UserDefinedOptions = {
//     content: [".next/server/app/*.html", ".next/server/app/**/*.html"],
//     css: [".next/static/css/*.css"],
//     output: "./",
//     safelist: ["body", "html"]
// }

const optionsFile = process.argv.length >= 3 ? process.argv[2] : "./purgecss.mjs"
const optionsFileUrl = "file://" + path.resolve(process.cwd(), optionsFile)
console.log("using options file: ", optionsFileUrl)
const options = (await import(optionsFileUrl)).default

console.log("loaded options: ", options)

const purgeCSS: PurgeCSS = new PurgeCSS();
const purged: ResultPurge[] = await purgeCSS.purge(options);
// output results in specified directory
if (options.output) {
    for (const purgedResult of purged) {
        const fileName = purgedResult.file!.split("/").pop();
        await writeCSSToFile(`${options.output}/${fileName}`, purgedResult.css);
    }
}
else {
    console.log(JSON.stringify(purged));
}

async function writeCSSToFile(filePath: string, css: string) {
    try {
        console.log("writing file: ", filePath);
        await fs.writeFileSync(filePath, css);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
}

