import type {Metadata} from "next";
import "../globals.css";
import {dir} from 'i18next'
import MyNavbar, {NavbarMenuItem} from "@/app/components/my-navbar";
import React from "react";
import {NodokuI18n} from "nodoku-i18n";

export const metadata: Metadata = {
    title: "Nodoku demo page",
    description: "Demo page and documentation for Nodoku static site generator",
};

var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("this config is intended on server side only");
}

export async function generateStaticParams(): Promise<{lng: string}[]> {
    const params = (await NodokuI18n.Simplelocalize.allLanguages())
        .map((l: NodokuI18n.LanguageDef) => ({lng: l.key}));
    // const params = [{lng: "en"}]
    console.log("in generateStaticParams", params.map(p => p.lng).join(", "))
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

export const dynamic = "force-static";

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{lng: string}> }>) {

    const { lng } = await params;

    // console.log("rendering RootLayout for", lng)

    // throw new Error("this is error on layout, should be thrown at build time")

    return (
        <html lang={lng} dir={lng == "il" ? "rtl" : dir(lng)}>
            <body className={"bg-white dark:bg-black text-black dark:text-white"}>
                <MyNavbar languages={await NodokuI18n.Simplelocalize.allLanguages()} selectedLng={lng} menu={menu(lng)}/>
                {children}
                <script src="/scripts/crop-height-50-percents.js" type="text/javascript"/>
            </body>
        </html>
    );
}
