import * as fs from "node:fs";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";
import {NodokuI18n} from "nodoku-i18n";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {nameToIconConverters} from "@/app/components/common-provider";
import {NodokuIcons} from "nodoku-icons";


export default async function Home(): Promise<JSX.Element> {

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/my-nodoku-page.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/my-nodoku-page.md").toString(), "en", "my-nodoku-page")

    return (
        <RenderingPage
            lng={"en"}
            renderingPriority={RenderingPriority.content_first}
            skin={skin}
            content={content}
            componentResolver={nodokuComponentResolver}
            imageProvider={commonImageProvider}
            htmlSanitizer={commonHtmlSanitizer}
            i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku(i18nStore)}
            i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
        />
    );
}

