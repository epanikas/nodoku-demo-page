import * as fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NdTranslatableText} from "nodoku-core";
import {NdImageProvider} from "nodoku-core";
import {NdI18nextProvider} from "nodoku-core";
import {NdI18NextPostProcessor} from "nodoku-core";
import {NdHtmlSanitizer} from "nodoku-core";
import {NodokuI18n} from "nodoku-i18n";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {ClientSideComponentNameEnum} from "@/nodoku-component-resolver";
import {fromStringToClientSideComponentNameEnum} from "@/nodoku-component-resolver";
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";
import {nameToIconConverters} from "@/app/components/common-provider";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {NodokuIcons} from "nodoku-icons";
import {LanguageSwitcher} from "@/app/components/language-switcher";
import LanguageDef = NodokuI18n.LanguageDef;
import {UserAccount} from "@/app/components/user-account";
import flagIconProvider = NodokuIcons.flagIconProvider;


var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("in [lng]/page.tsx this config is intended on server side only");
}

export type NavHeaderMenuItem = {
    label: NdTranslatableText;
    link: string;
    subItems: NavHeaderMenuItem[];
}

export type NavHeaderProps = {
    lng: string;

    menuItems: NavHeaderMenuItem[]
    themeButton: JSX.Element;
    languageSwitcher: JSX.Element;
    userAccount: JSX.Element;

    imageProvider: NdImageProvider | undefined;
    i18nextProvider: NdI18nextProvider | undefined;
    i18nextPostProcessor: NdI18NextPostProcessor | undefined;
    htmlSanitizer: NdHtmlSanitizer | undefined;



}


export default async function NavHeader(params: {lng: string, languages: LanguageDef[]}): Promise<JSX.Element> {

    const {lng, languages} = params;

    if (lng === "favicon.ico") {
        return <></>
    }

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/nav-header.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/nav-header.md").toString(), "en", "nav-header")

    // console.log("JSON.stringify(content)", JSON.stringify(content))
    // console.log("JSON.stringify(content)", JSON.stringify(content))

    // await NodokuI18n.Simplelocalize.initI18nStore( ["nodoku-landing"/*, "docs", "faq"*/], 'en', "auto", "auto",
    //         OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

    if (process.env.NODE_ENV === "development") {
        await i18nStore.reloadResources();
    }

    const iconLanguages = await Promise.all(languages.map(async l => (
        {...l,
            icon: (await flagIconProvider(l.icon, "1x1", "fi fis fiCircle inline-block"))}
    )));

    const clientSideComponentProvider = (c: string) => {

        const k: ClientSideComponentNameEnum | undefined = fromStringToClientSideComponentNameEnum(c);

        if (k !== undefined) {

            switch (k) {
                case "flowbite/nav-header:language-switcher":
                    return <LanguageSwitcher languages={iconLanguages} selectedLng={lng} />
                case "flowbite/nav-header:user-account":
                    // return <UserAccount />
                    return <></>
            }

        }
        return <span>[placeholder for {c}]</span>
    }

    return (
        <RenderingPage
            lng={lng}
            renderingPriority={RenderingPriority.skin_first}
            skin={skin}
            content={content}
            componentResolver={nodokuComponentResolver}
            imageProvider={commonImageProvider}
            htmlSanitizer={commonHtmlSanitizer}
            i18nextProvider={NodokuI18n.i18nForNodoku(i18nStore)}
            i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
            clientSideComponentProvider={clientSideComponentProvider}
        />
    );
}

