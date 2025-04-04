import fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NdPageSkin} from "nodoku-core";
import {NdContentBlock} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";
import {nameToIconConverters} from "@/app/components/common-provider";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {NodokuI18n} from "nodoku-i18n";
import {NodokuIcons} from "nodoku-icons";


export const dynamic = "force-static"

export default async function Page({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/showcase/mambaui-showcase.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/showcase/mambaui-showcase.md").toString(), "en", "mambaui-showcase")


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

