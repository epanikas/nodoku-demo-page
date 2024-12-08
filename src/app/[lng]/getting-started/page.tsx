import * as fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority, NdTranslatableText} from "nodoku-core";
import {NodokuI18n} from "nodoku-i18n";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-image-provider";
import {i18nStore} from "@/app/components/nodoku-i18n-config";


// export const dynamic = "force-static"

var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("in [lng]/page.tsx this config is intended on server side only");
}


export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    // let actualI18nStore = await geti18nstore();
    if (process.env.NODE_ENV === "development") {
        // console.log("reloading await import(\"@/app/components/nodoku-i18n-config\")")
        // const {geti18store} = await import("@/app/components/nodoku-i18n-config");
        // actualI18nStore = geti18store();
        await i18nStore.reloadResources();
    }

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/getting-started.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/getting-started.md").toString(), "en", "getting-started")

    // await NodokuI18n.Simplelocalize.initI18nStore( ["getting-started"], 'en', true,
    //         OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

    // const l = {t: (text: NdTranslatableText) => i18nStore.translateTranslatableText(lng, text)}
    //
    // const provider = (lng: string): Promise<{t: (text: NdTranslatableText) => string}> => {
    //     return Promise.resolve(l);
    // }

    // const text = {
    //     key: 'sectionName=getting-started-block-0.title',
    //     ns: 'getting-started',
    //     text: 'Getting started with Nodoku',
    //     excludeFromTranslation: false
    // };

    // console.log("using provider ... ", i18nStore.getRef(), (await provider(lng)).t(text), l.t(text), i18nStore.translateTranslatableText(lng, text))

    return (
        <RenderingPage
            lng={lng}
            renderingPriority={RenderingPriority.content_first}
            skin={skin}
            content={content}
            i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku(i18nStore)}
            imageProvider={commonImageProvider}
            componentResolver={nodokuComponentResolver}
        />
    );
}

