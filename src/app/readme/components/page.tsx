import fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NdPageSkin} from "nodoku-core";
import {NdContentBlock} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";


export const dynamic = "force-static"

export default async function Page({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/readme/readme.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/readme/nodoku-components-readme.md").toString(), "en", "nodoku-components-readme")

    return <RenderingPage
                lng={"en"}
                renderingPriority={RenderingPriority.skin_first}
                skin={skin}
                content={content}
                componentResolver={nodokuComponentResolver}
                imageProvider={commonImageProvider}
                htmlSanitizer={commonHtmlSanitizer}
                i18nextProvider={undefined}
                i18nextPostProcessor={undefined}
                clientSideComponentProvider={undefined}
            />;
}

