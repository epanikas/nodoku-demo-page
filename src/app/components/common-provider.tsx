import {NdImageProps, NdHtmlSanitizer, NdImageProvider} from "nodoku-core";
import {JSX} from "react";
import {NodokuComponents} from "nodoku-components";
import {nameToReactIcon_hi} from "nodoku-icons/nd-react-icons/hi"
import {nameToReactIcon_hi2} from "nodoku-icons/nd-react-icons/hi2"
import {nameToReactIcon_ci} from "nodoku-icons/nd-react-icons/ci"
import {NodokuIcons} from "nodoku-icons";
import {NdTrustedHtml} from "nodoku-core";
import { JSDOM } from "jsdom";
import * as DOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurifyServer = DOMPurify.default(window);
// const ReactDOMServer = (await import('react-dom/server')).default;

export const nameToIconConverters = [nameToReactIcon_hi, nameToReactIcon_hi2, nameToReactIcon_ci]

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

    return <img className={`${imageStyle?.base} ${imageStyle?.decoration}`} src={url} alt={alt} loading={"lazy"}/>;
}


export const commonHtmlSanitizer: NdHtmlSanitizer = (text: string): NdTrustedHtml => {

    return {__html: DOMPurifyServer.sanitize(text, {RETURN_TRUSTED_TYPE: true})}
    // return {__html: text as unknown as TrustedHTML}
}