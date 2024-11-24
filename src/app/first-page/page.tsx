import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import * as fs from "node:fs";
import {commonImageProvider} from "@/app/components/common-image-provider";


export default async function Home(): Promise<JSX.Element> {

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/my-nodoku-page.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/my-nodoku-page.md").toString(), "en", "my-nodoku-page")

    return (
        <RenderingPage
            lng={"en"}
            renderingPriority={RenderingPriority.content_first}
            skin={skin}
            content={content}
            i18nextProvider={undefined}
            imageProvider={commonImageProvider}
            componentResolver={nodokuComponentResolver}
        />
    );
}

