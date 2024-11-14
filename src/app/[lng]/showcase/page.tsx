import {Flowbite, getTheme} from "flowbite-react";
import React, {JSX} from "react";
// import {NodokuI18n} from "nodoku-i18n";
import {
    contentMarkdownProvider,
    ImageUrlProvider,
    NdContentBlock,
    NdPageSkin, parseMarkdownAsContent, parseYamlContentAsSkin,
    RenderingPage,
    RenderingPriority,
    skinYamlProvider
} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import {NodokuI18n} from "nodoku-i18n";
import OnFallbackLngTextUpdateStrategy = NodokuI18n.Simplelocalize.OnFallbackLngTextUpdateStrategy;
import fs from "node:fs";
// import OnFallbackLngTextUpdateStrategy = NodokuI18n.Simplelocalize.OnFallbackLngTextUpdateStrategy;
// import LanguageDef = NodokuI18n.LanguageDef;
// import {HomeProps} from "@/app/[lng]/page";
// import {genStaticParamsWithSkinAndContent} from "@/app/utils/common-static-params";



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


const imageUrlProvider: ImageUrlProvider = async (imageUrl: string): Promise<string> => {
    if (imageUrl.startsWith("../")) {
        const k = imageUrl.lastIndexOf("../")
        return "/" + imageUrl.substring(k + "../".length, imageUrl.length);
    }
    return imageUrl;
}

export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    if (lng === "favicon.ico") {
        return <></>
    }

    // const skin: NdPageSkin = new NdPageSkin(); //await skinYamlProvider("http://localhost:3001/site/skin/showcase.yaml")
    // const content: NdContentBlock[] = []; //await contentMarkdownProvider("http://localhost:3001/site/showcase.md", "en", "showcase")
    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/showcase.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/showcase.md").toString(), "en", "showcase")

    // console.log("JSON.stringify(content)", JSON.stringify(content.filter(b => b.id.startsWith("sectionName=nodoku-way")).map(b => b.title)))
    // console.log("JSON.stringify(content)", JSON.stringify(content.filter(b => b.id.startsWith("sectionName=nodoku-way")).map(b => b.subTitle)))

    await NodokuI18n.Simplelocalize.initI18nStore( ["showcase"/*, "docs", "faq"*/], 'en', false,
        OnFallbackLngTextUpdateStrategy.reset_reviewed_status)

        // console.log("=============== content ", JSON.stringify(skin))

        return (
            <Flowbite theme={{theme: customCarousel}}>
                <RenderingPage
                    lng={lng}
                    renderingPriority={RenderingPriority.skin_first}
                    skin={skin}
                    content={content}
                    i18nextProvider={NodokuI18n.Simplelocalize.i18nForNodoku}
                    // i18nextProvider={undefined}
                    imageUrlProvider={imageUrlProvider}
                    componentResolver={nodokuComponentResolver}
                />
            </Flowbite>
        );
}

