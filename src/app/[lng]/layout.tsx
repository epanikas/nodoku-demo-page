import {JSX} from "react"
import type {Metadata} from "next";
import {dir} from 'i18next'
import React from "react";
import {NodokuI18n} from "nodoku-i18n";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
// import "nodoku-components/a11y-light"
// import "nodoku-components/a11y-dark"
// import dynamic from "next/dynamic";
import NavHeader from "@/app/components/nav-header";
import MyFooter from "@/app/components/my-footer";
import LanguageDef = NodokuI18n.LanguageDef;
import Head from "next/head";
import {readFileSync} from "node:fs";
import path from "node:path";
import {readdirSync} from "node:fs";
// import "../globals.css";
if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    await import("../globals.css");
}


export const metadata: Metadata = {
    title: "Nodoku demo page",
    description: "Demo page and documentation for Nodoku static site generator",
};

var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("this config is intended on server side only");
}

// const store = await geti18nstore();

export async function generateStaticParams(): Promise<{lng: string}[]> {


    const params: {lng: string}[] = (await i18nStore.allLanguages())
        .map((l: NodokuI18n.LanguageDef): {lng: string} => ({lng: l.key}));
    // const params = [{lng: "en"}]
    console.log("in generateStaticParams", params.map((p: {lng: string}) => p.lng).join(", "))
    return params;
}



// export const dynamic = "force-static";

// const MyFooter = dynamic(() => import("@/app/components/my-footer"))
// const NavHeader = dynamic(() => import("@/app/components/nav-header"))


export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{lng: string}> }>) {

    const { lng } = await params;

    const languages: LanguageDef[] = await i18nStore.allLanguages()

    // console.log("rendering RootLayout for", lng)

    // throw new Error("this is error on layout, should be thrown at build time")

    const actualDir = lng == "il" ? "rtl" : dir(lng);

    // throw new Error("stop processing and check css created");

    if (process.env.NODE_ENV === "development") {
        await i18nStore.reloadResources();
    }

    // const css = `
    //     .my-element {
    //         background-color: #f00;
    //     }
    // `
    let cssStyles: JSX.Element[] = [];
    if (process.env.NODE_ENV !== "development") {
        cssStyles = __getInlineStyles();
    }

    return (
        <html lang={lng} dir={actualDir} className={actualDir}>
        {/*<Head>*/}
        {/*    <style type="text/css" lang="css">{css}</style>*/}
        {/*</Head>*/}
        <head>
            {/*<style type="text/css" lang="css">{css}</style>*/}
            {/*<title>this is my title</title>*/}
            {cssStyles}
        </head>
        <body className={"bg-white dark:bg-black text-black dark:text-white"} style={{paddingTop: "60px"}}>
            <NavHeader lng={lng} languages={languages}/>
            {children}
            <MyFooter lng={lng} />
        </body>
        </html>
    );
}

function __getInlineStyles(): JSX.Element[] {

    const cssDir = path.join(process.cwd(), ".next/static/css");
    const files = readdirSync(cssDir);

    console.log("found css files ", files);

    return files.filter((file: string) => /\.css$/.test(file)).map(file => (
        <style
            key={file}
            data-href={`.next/static/css/${file}`}
            dangerouslySetInnerHTML={{
                __html: readFileSync(path.join(cssDir, file), 'utf-8'),
            }}
        />
    ));
}
