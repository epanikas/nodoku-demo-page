import {NextRequest, NextResponse} from "next/server";
import {LANGUAGE_COOKIE} from "@/app/components/common-i18n-config";
import {SimplelocalizeBackendApiClientImpl} from "nodoku-i18n/simplelocalize/client";

const projectToken: string = process.env.SIMPLELOCALIZE_PROJECT_TOKEN || "n-a";
const apiKey: string = process.env.SIMPLELOCALIZE_API_KEY || "n-a";

// const environment = "_latest"
// const cdn = `https://cdn.simplelocalize.io/${projectToken}/${environment}`


const client: SimplelocalizeBackendApiClientImpl =
    new SimplelocalizeBackendApiClientImpl(apiKey, projectToken, "cdn");

console.log("process.env.SIMPLELOCALIZE_PROJECT_TOKEN defined ", process.env.SIMPLELOCALIZE_PROJECT_TOKEN !== undefined)

// const jsonlangs = "[\n" +
//     "    {\n" +
//     "        \"key\": \"ar\",\n" +
//     "        \"name\": \"Arabic\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"de\",\n" +
//     "        \"name\": \"German\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"en\",\n" +
//     "        \"name\": \"English\",\n" +
//     "        \"isDefault\": true,\n" +
//     "        \"icon\": \"gb\"\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"es\",\n" +
//     "        \"name\": \"Spanish\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"fr\",\n" +
//     "        \"name\": \"French\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"il\",\n" +
//     "        \"name\": \"Hebrew\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"it\",\n" +
//     "        \"name\": \"Italian\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"pt\",\n" +
//     "        \"name\": \"Portuguese\",\n" +
//     "        \"isDefault\": false\n" +
//     "    },\n" +
//     "    {\n" +
//     "        \"key\": \"ru\",\n" +
//     "        \"name\": \"Russian\",\n" +
//     "        \"isDefault\": false\n" +
//     "    }\n" +
//     "]"

// const allLanguages: {key: string}[] = JSON.parse(jsonlangs).map((l: any) => ({key: l.key}));
// const allLanguages: {key: string}[] = (await fetch(`${cdn}/_languages`).then(res => res.json())).map((l: any) => ({key: l.key}));
// const allLanguages: {key: string}[] = (await client.allLanguages()).map((l: any) => ({key: l.key}));



export async function middleware(request: NextRequest) {

    const allLanguages: {key: string}[] = (await client.allLanguages()).map((l: any) => ({key: l.key}));
    console.log("in middleware allLanguages ", allLanguages);

    console.log("received host ", request.nextUrl.host)
    console.log("received pathname ", request.nextUrl.pathname)
    console.log("received cookies ", request.cookies)

    const languages = allLanguages; //[{key: 'en'}, {key: 'it'}, {key: 'ru'}]//await i18nStore.allLanguages();

    const langsPattern = languages.map(l => l.key).join("|");
    console.log("middleware langsPattern", langsPattern, request.nextUrl.pathname)
    const regex = new RegExp(`^\/(${langsPattern})(.*)`);

    const chunkedUrl = regex.exec(request.nextUrl.pathname);

    let resp: NextResponse;
    let lang: string;
    if (chunkedUrl) {
        resp = NextResponse.next();
        lang = chunkedUrl[1]
    } else if (request.nextUrl.pathname.startsWith("/first-page")
        || request.nextUrl.pathname.startsWith("/readme")
        || request.nextUrl.pathname.startsWith("/images")
        || request.nextUrl.pathname.endsWith(".js")
        || request.nextUrl.pathname.endsWith(".js.map")) {

        resp = NextResponse.next();
        lang = "unset"
    } else {
        const langCookie = request.cookies.get(LANGUAGE_COOKIE);
        lang = langCookie ? langCookie.value : 'en';
        const destination = `${request.nextUrl.origin}/${lang}${request.nextUrl.pathname}`;
        console.log("rewriting to ", destination);
        resp = NextResponse.rewrite(destination);
    }
    console.log("setting language cookie", lang, "domain", request.nextUrl.hostname);
    if (lang !== "unset") {
        resp.cookies.set(LANGUAGE_COOKIE, lang, {path: "/", domain: request.nextUrl.hostname});
    }
    return resp;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}