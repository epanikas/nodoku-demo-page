import fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {NdPageSkin} from "nodoku-core";
import {NdContentBlock} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";


export default async function Home(): Promise<JSX.Element> {

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/my-nodoku-page.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/my-nodoku-page.md").toString(), "en", "my-nodoku-page")

    return <RenderingPage
                lng={"en"}
                renderingPriority={RenderingPriority.content_first}
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

