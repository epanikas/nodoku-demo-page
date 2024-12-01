import React, {JSX} from "react";
import {
    ImageProvider,
    parseMarkdownAsContent,
    parseYamlContentAsSkin,
    RenderingPage,
    RenderingPriority
} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import ComponentPlaceholder from "@/app/components/component-placeholder";
import fs from "node:fs";
import {commonImageProvider} from "@/app/components/common-image-provider";


// const imageProvider: ImageProvider = async (imageUrl: string): Promise<string> => {
//     if (imageUrl.startsWith("../")) {
//         const k = imageUrl.lastIndexOf("../")
//         return "/" + imageUrl.substring(k + "../".length, imageUrl.length);
//     }
//     return imageUrl;
// }

export default async function NodokuSampleScaledDown({params}: { params: { lng: string, mdFile: string, yamlFile: string } }): Promise<JSX.Element> {

    const {lng, mdFile, yamlFile} = params;

    const skin = parseYamlContentAsSkin(fs.readFileSync(`./public${mdFile}`).toString());
    const content = parseMarkdownAsContent(fs.readFileSync(`./public${yamlFile}`).toString(), "en", "showcase")

    return (
        <div className={"relative aspect-video text-black dark:text-white"}>
            <div
                className={"crop-height-50-percents-loading absolute top-0 bottom-0 left-0 right-0 px-20 py-20 text-center border-grey-900 border-dashed border-4 rounded-3xl"}>
                <ComponentPlaceholder />
            </div>
            <div className={"crop-height-50-percents"}
                 style={{visibility: "hidden", opacity: "1"}}>
                <div className={"not-prose"}
                     style={{scale: "0.5", width: "200%", transformOrigin: "top left"}}>
                    <RenderingPage
                        lng={lng}
                        renderingPriority={RenderingPriority.skin_first}
                        content={content}
                        componentResolver={nodokuComponentResolver}
                        skin={skin}
                        imageProvider={commonImageProvider}
                        // i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku}
                        i18nextProvider={undefined}
                    />
                </div>
            </div>
        </div>
    );

}

