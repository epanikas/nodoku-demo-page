import {Flowbite, getTheme} from "flowbite-react";
import React, {JSX} from "react";
import {
    ImageProvider,
    parseMarkdownAsContent,
    parseYamlContentAsSkin,
    RenderingPage,
    RenderingPriority
} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import * as fs from "node:fs";
import {NodokuI18n} from "nodoku-i18n";
import OnFallbackLngTextUpdateStrategy = NodokuI18n.Simplelocalize.OnFallbackLngTextUpdateStrategy;
import {NdImageProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import NdImageProvider = NodokuComponents.NdImageProvider;
import {commonImageProvider} from "@/app/components/common-image-provider";


export const dynamic = "force-static"

var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("in [lng]/page.tsx this config is intended on server side only");
}


export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/getting-started.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/getting-started.md").toString(), "en", "getting-started")

    await NodokuI18n.Simplelocalize.initI18nStore( ["getting-started"], 'en', true,
            OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

    return (
        <RenderingPage
            lng={lng}
            renderingPriority={RenderingPriority.content_first}
            skin={skin}
            content={content}
            i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku}
            imageProvider={commonImageProvider}
            componentResolver={nodokuComponentResolver}
        />
    );
}

