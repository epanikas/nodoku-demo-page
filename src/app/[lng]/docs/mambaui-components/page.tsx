import {JSX} from "react";
// import {allLanguages} from "@/app/i18n/server-i18n-conf";
// import LanguageDef from "@/app/i18n/language-def";
import Content from './mdx-page.mdx';
import {Flowbite, getTheme} from "flowbite-react";
// import {NodokuI18n} from "nodoku-i18n";


// export async function generateStaticParams(): Promise<{ params: { lng: string } }[]> {
//     return (await NodokuI18n.Simplelocalize.allLanguages()).map((l: NodokuI18n.LanguageDef) => {
//         return {params: {lng: l.key}};
//     });
// }

const components = {}; // Add custom components for MDX here

const customCarousel = {...getTheme()};

customCarousel.carousel.item.base = "block w-full";
customCarousel.carousel.scrollContainer.base = "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none";

export default async function Page(): Promise<JSX.Element> {
    return (
        <Flowbite theme={{theme: customCarousel}}>
            <div className={"container mx-auto max-w-5xl px-4"}>
                <div className={"prose"}>
                    <Content/>
                </div>
            </div>
        </Flowbite>

    )
}

