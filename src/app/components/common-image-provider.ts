import {ImageProvider} from "nodoku-core";
import {NdImageProps} from "nodoku-core";
import {JSX} from "react";
import {NodokuComponents} from "nodoku-components";
import NdImageProvider = NodokuComponents.NdImageProvider;

export const commonImageProvider: ImageProvider = async (imageProps: NdImageProps): Promise<JSX.Element> => {

    const {url, alt, imageStyle} = imageProps;

    let convertedUrl = url;
    if (url.startsWith("../")) {
        const k = url.lastIndexOf("../")
        convertedUrl = "/" + url.substring(k + "../".length, url.length);
    }
    return await NdImageProvider({url: url, alt, imageStyle});
}
