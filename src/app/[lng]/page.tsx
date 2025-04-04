import * as fs from "node:fs";
// import {Flowbite, getTheme} from "flowbite-react";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NodokuI18n} from "nodoku-i18n";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";
import {nameToIconConverters} from "@/app/components/common-provider";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {NodokuIcons} from "nodoku-icons";

import dynamic from "next/dynamic";
import {NdPageSkin} from "nodoku-core";
import {NdContentBlock} from "nodoku-core";
import {NdList} from "nodoku-core";

// const Flowbite = dynamic(() => (await import("flowbite-react")).Flowbite)


// const customCarousel = {...getTheme()};
//
// customCarousel.carousel.item.base = "height block w-full";
// customCarousel.carousel.scrollContainer.base = "snap-mandatory flex h-full overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none";

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

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/nodoku-landing.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/nodoku-landing.md").toString(), "en", "nodoku-landing")

    console.log("rendering content: \n", content.map(b => `b.id ${b.id} b.list ${b.paragraphs.filter(p => p instanceof NdList).map(l => l.items == undefined ? "list with no items!!!" : "ok").join(", ")}`).join('\n'));

    // console.log("JSON.stringify(content)", JSON.stringify(content))
    // console.log("JSON.stringify(content)", JSON.stringify(content))


    // if (process.env.NODE_ENV === "development") {
    //     await i18nStore.reloadResources();
    // }


    return <RenderingPage
                lng={lng}
                renderingPriority={RenderingPriority.skin_first}
                skin={skin}
                content={content}
                componentResolver={nodokuComponentResolver}
                imageProvider={commonImageProvider}
                htmlSanitizer={commonHtmlSanitizer}
                i18nextProvider={NodokuI18n.i18nForNodoku(i18nStore)}
                i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
                clientSideComponentProvider={undefined}
            />;
}

