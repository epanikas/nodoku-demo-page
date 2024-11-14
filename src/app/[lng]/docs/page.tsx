import React, {JSX} from "react";
// import {allLanguages} from "@/app/i18n/server-i18n-conf";
// import LanguageDef from "@/app/i18n/language-def";
import Content from './mdx-page.mdx';
// import {NodokuI18n} from "nodoku-i18n";


// export async function generateStaticParams(): Promise<{ params: { lng: string } }[]> {
//     return (await NodokuI18n.Simplelocalize.allLanguages()).map((l: NodokuI18n.LanguageDef) => {
//         return {params: {lng: l.key}};
//     });
// }

const components = {}; // Add custom components for MDX here

export default async function Page(): Promise<JSX.Element> {
    return (
        <div className={"container mx-auto max-w-5xl px-4"}>
            <div className={"prose prose-amber prose-lg dark:prose-invert"}>
                {/*<Content/>*/}

                <h1>this is my title</h1>
                <h2>this is my subtitle</h2>
                <a href={"cnn.com"}>this is my link</a>
            </div>
        </div>

    )
}

