import "../globals.css";
import React from "react";
import NavHeader from "@/app/components/nav-header";
import MyFooter from "@/app/components/my-footer";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang={"en"} dir={"ltr"}>
        <body className={"bg-white dark:bg-black text-black dark:text-white"} style={{paddingTop: "70px"}}>
        <NavHeader lng={"en"} languages={[]}/>
        {children}
        <MyFooter lng={"en"}/>
        </body>
        </html>
    );
}

