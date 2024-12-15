import fs from "node:fs";
import {Flowbite, getTheme} from "flowbite-react";
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {commonImageProvider} from "@/app/components/common-provider";
import {commonHtmlSanitizer} from "@/app/components/common-provider";
import {nameToIconConverters} from "@/app/components/common-provider";
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {NodokuI18n} from "nodoku-i18n";
import {NodokuIcons} from "nodoku-icons";


const customCarousel = {...getTheme()};

customCarousel.carousel.item.base = "height kaka afadsfa  block w-full";
customCarousel.carousel.scrollContainer.base = "snap-mandatory flex h-full overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none";

// export async function generateStaticParams(): Promise<{ params: { lng: string } }[]> {
//     const pageParams = (await NodokuI18n.Simplelocalize.allLanguages()).map((l: LanguageDef) => {
//         return {params: {lng: l.key}};
//     });
//
//     return pageParams;
//
// }

export const dynamic = "force-static"

// export async function generateStaticParams(): Promise<{ params: HomeProps }[]> {
//
//     return genStaticParamsWithSkinAndContent(
//         "./public/site/showcase.md",
//         "./public/site/skin/showcase.yaml",
//         "nodoku-landing"/*, "docs", "faq"*/,
//         "en")
//
// }


// const imageProvider: ImageProvider = async (imageProps: NdImageProps): Promise<JSX.Element> => {
//
//     const {url, alt, imageStyle} = imageProps;
//
//     let convertedUrl = url;
//     if (url.startsWith("../")) {
//         const k = url.lastIndexOf("../")
//         convertedUrl = "/" + url.substring(k + "../".length, url.length);
//     }
//     return await NdImageProvider({url: url, alt, imageStyle});
// }

export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    // const skin: NdPageSkin = new NdPageSkin(); //await skinYamlProvider("http://localhost:3001/site/skin/showcase.yaml")
    // const content: NdContentBlock[] = []; //await contentMarkdownProvider("http://localhost:3001/site/showcase.md", "en", "showcase")
    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/showcase.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/nodoku-landing.md").toString(), "en", "nodoku-landing")

    // console.log("JSON.stringify(content)", JSON.stringify(content.filter(b => b.id.startsWith("sectionName=nodoku-way")).map(b => b.title)))
    // console.log("JSON.stringify(content)", JSON.stringify(content.filter(b => b.id.startsWith("sectionName=nodoku-way")).map(b => b.subTitle)))

    // await NodokuI18n.Simplelocalize.initI18nStore( ["showcase"/*, "docs", "faq"*/], 'en', "auto", "auto",
    //     OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

        // console.log("=============== content ", JSON.stringify(skin))

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
                    componentResolver={nodokuComponentResolver}
                    imageProvider={commonImageProvider}
                    htmlSanitizer={commonHtmlSanitizer}
                    i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku(i18nStore)}
                    i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
                />
            </Flowbite>
        );
}

