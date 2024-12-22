import type {Metadata} from "next";
import "../globals.css";
import {dir} from 'i18next'
// import {NavbarMenuItem} from "@/app/components/my-navbar";
import React from "react";
import {NodokuI18n} from "nodoku-i18n";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
// import MyFooter from "@/app/components/my-footer";
import "nodoku-components/a11y-light"
import "nodoku-components/a11y-dark"
import dynamic from "next/dynamic";
import {NavbarMenuItem} from "@/app/components/my-navbar-menu-item";


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

function menu(lng: string): NavbarMenuItem[] {
    return [
        {
            label: "Home",
            link: `/${lng}`,
            subItems: []
        },
        {
            label: "Docs",
            link: `/${lng}/docs`,
            subItems: []
        },
        {
            label: "Components",
            link: "#",
            subItems: [
                {
                    label: "Based on Flowbite",
                    link: `/${lng}/docs/flowbite-components`,
                    subItems: []
                },
                {
                    label: "Based on Mamba UI",
                    link: `/${lng}/docs/mambaui-components`,
                    subItems: []
                }
            ]
        }
    ];
}

// export const dynamic = "force-static";

const MyFooter = dynamic(() => import("@/app/components/my-footer"))
const MyNavbar = dynamic(() => import("@/app/components/my-navbar"))


export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{lng: string}> }>) {

    const { lng } = await params;

    // console.log("rendering RootLayout for", lng)

    // throw new Error("this is error on layout, should be thrown at build time")

    return (
        <html lang={lng} dir={lng == "il" ? "rtl" : dir(lng)}>
            <body className={"bg-white dark:bg-black text-black dark:text-white"} style={{paddingTop: "60px"}}>
                <MyNavbar languages={await i18nStore.allLanguages()} selectedLng={lng} menu={menu(lng)}/>
                {children}
                <MyFooter lng={lng} />
                {/*<script src="/scripts/crop-height-50-percents.js" type="text/javascript"/>*/}
                {/*<script async src="/scripts/flowbite.js" type="text/javascript" />*/}
                {/*<script defer src="/scripts/load-flowbite.js" type="module" />*/}
            </body>
        </html>
    );
}
