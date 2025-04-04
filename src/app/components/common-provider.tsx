import {NdImageProps, NdHtmlSanitizer, NdImageProvider} from "nodoku-core";
import {JSX} from "react";
// import {NodokuComponents} from "nodoku-components";
import {nameToReactIcon_hi} from "nodoku-icons/nd-react-icons/hi"
// import {nameToReactIcon_hi2} from "nodoku-icons/nd-react-icons/hi2"
// import {nameToReactIcon_ci} from "nodoku-icons/nd-react-icons/ci"
// import {nameToReactIcon_lia} from "nodoku-icons/nd-react-icons/lia"
import {nameToReactIcon_md} from "nodoku-icons/nd-react-icons/md"
import {nameToReactIcon_fa6} from "nodoku-icons/nd-react-icons/fa6"
import {gb_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/gb";
import {it_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/it";
import {de_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/de";
import {es_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/es";
import {fr_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/fr";
import {pt_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/pt";
import {ru_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/ru";
import {sa_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/sa";
import {il_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/il";
import {ge_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/ge";
import {us_flag_nameToFlagIcon} from "nodoku-icons/nd-flag-icons/us";


import {NodokuIcons} from "nodoku-icons";
import {NdTrustedHtml} from "nodoku-core";
import { JSDOM } from "jsdom";
import * as DOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurifyServer = DOMPurify.default(window);
// const ReactDOMServer = (await import('react-dom/server')).default;

export const nameToIconConverters = [
    nameToReactIcon_hi,
    // nameToReactIcon_hi2,
    // nameToReactIcon_ci,
    // nameToReactIcon_lia,
    nameToReactIcon_fa6,
    nameToReactIcon_md,
    (iconName: string) => gb_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => it_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => de_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => es_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => fr_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => pt_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => ru_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => sa_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => il_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => ge_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]"),
    (iconName: string) => us_flag_nameToFlagIcon(iconName, "1x1", "fi fis fiCircle inline-block p-[2px]")

];

export const commonImageProvider: NdImageProvider = async (imageProps: NdImageProps): Promise<JSX.Element> => {

    const {url, alt, imageStyle} = imageProps;

    let convertedUrl = url;
    if (url.startsWith("../")) {
        const k = url.lastIndexOf("../")
        convertedUrl = "/" + url.substring(k + "../".length, url.length);
    }

    if (convertedUrl.startsWith("icon:")) {
        // console.log("icon detected ... ", convertedUrl)
        const icon: JSX.Element | undefined =
            NodokuIcons.iconProvider(convertedUrl.substring("icon:".length), nameToIconConverters, {size: imageStyle?.imageWidth || "32"});
        return (
            <div className={`${imageStyle?.base} ${imageStyle?.decoration}`}>
                {icon ? icon : `icon not found: ${convertedUrl}`}
            </div>
        )
    }

    // return await NodokuComponents.imageProvider({url: convertedUrl, alt, imageStyle});

    return <img className={`${imageStyle?.base} ${imageStyle?.decoration}`} src={convertedUrl} alt={alt} loading={"lazy"}/>;
}


export const commonHtmlSanitizer: NdHtmlSanitizer = (text: string): NdTrustedHtml => {

    return {__html: DOMPurifyServer.sanitize(text, {RETURN_TRUSTED_TYPE: true})}
    // return {__html: text as unknown as TrustedHTML}
}