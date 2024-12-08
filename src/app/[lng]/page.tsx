import * as fs from "node:fs";
import {Flowbite, getTheme} from "flowbite-react";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NodokuI18n} from "nodoku-i18n";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-image-provider";
import {i18nStore} from "@/app/components/nodoku-i18n-config";

const customCarousel = {...getTheme()};

customCarousel.carousel.item.base = "height block w-full";
customCarousel.carousel.scrollContainer.base = "snap-mandatory flex h-full overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none";

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

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/nodoku-landing.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/nodoku-landing.md").toString(), "en", "nodoku-landing")

    // console.log("JSON.stringify(content)", JSON.stringify(content))
    // console.log("JSON.stringify(content)", JSON.stringify(content))

    // await NodokuI18n.Simplelocalize.initI18nStore( ["nodoku-landing"/*, "docs", "faq"*/], 'en', "auto", "auto",
    //         OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

    if (process.env.NODE_ENV === "development") {
        await i18nStore.reloadResources();
    }

    return (
        <Flowbite theme={{theme: customCarousel}}>
            <RenderingPage
                lng={lng}
                renderingPriority={RenderingPriority.skin_first}
                skin={skin}
                content={content}
                i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku(i18nStore)}
                imageProvider={commonImageProvider}
                componentResolver={nodokuComponentResolver}
            />
        </Flowbite>
    );
}

