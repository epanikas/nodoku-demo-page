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
import {LanguageSwitcher} from "@/app/components/language-switcher";
import LanguageDef = NodokuI18n.LanguageDef;
// import {UserAccount} from "@/app/components/user-account";
import {NodokuIcons} from "nodoku-icons";
import {gb_flag} from "nodoku-icons/nd-flag-icons/gb";
import {it_flag} from "nodoku-icons/nd-flag-icons/it";
import {de_flag} from "nodoku-icons/nd-flag-icons/de";
import {es_flag} from "nodoku-icons/nd-flag-icons/es";
import {fr_flag} from "nodoku-icons/nd-flag-icons/fr";
import {pt_flag} from "nodoku-icons/nd-flag-icons/pt";
import {ru_flag} from "nodoku-icons/nd-flag-icons/ru";
import {sa_flag} from "nodoku-icons/nd-flag-icons/sa";
import {il_flag} from "nodoku-icons/nd-flag-icons/il";
import {ge_flag} from "nodoku-icons/nd-flag-icons/ge";
import {NdPageSkin} from "nodoku-core";
import {NdContentBlock} from "nodoku-core";


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


function countryCodeToFlagIcon(countryCode: string, className: string): JSX.Element | undefined {

    switch (countryCode) {
        case "gb":
            return <>{gb_flag("1x1", className)!({})}</>
        case "it":
            return <>{it_flag("1x1", className)!({})}</>
        case "de":
            return <>{de_flag("1x1", className)!({})}</>
        case "es":
            return <>{es_flag("1x1", className)!({})}</>
        case "fr":
            return <>{fr_flag("1x1", className)!({})}</>
        case "pt":
            return <>{pt_flag("1x1", className)!({})}</>
        case "ru":
            return <>{ru_flag("1x1", className)!({})}</>
        case "il":
            return <>{il_flag("1x1", className)!({})}</>
        case "sa":
            return <>{sa_flag("1x1", className)!({})}</>
        case "ge":
            return <>{ge_flag("1x1", className)!({})}</>
    }

    return undefined

}

export default async function NavHeader(params: {lng: string, languages: LanguageDef[]}): Promise<JSX.Element> {

    const {lng, languages} = params;

    if (lng === "favicon.ico") {
        return <></>
    }

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/header-footer/nav-header.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/header-footer/nav-header.md").toString(), "en", "nav-header")

    const iconLanguages = await Promise.all(languages.map(async l => (
        {...l, icon: countryCodeToFlagIcon(l.icon, "fi fis fiCircle inline-block")})));

    const clientSideComponentProvider = (c: string) => {

        const k: ClientSideComponentNameEnum | undefined = fromStringToClientSideComponentNameEnum(c);

        if (k !== undefined) {

            switch (k) {
                case "flowbite/nav-header:language-switcher":
                    return languages.length > 0 ? <LanguageSwitcher languages={iconLanguages} selectedLng={lng} /> : <></>
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

