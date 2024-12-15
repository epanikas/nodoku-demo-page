import {NextRequest, NextResponse} from "next/server";
// import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
import {LANGUAGE_COOKIE} from "@/app/components/common-i18n-config";


const projectToken = process.env.SIMPLELOCALIZE_PROJECT_TOKEN;
const environment = "_latest"
const cdn = `https://cdn.simplelocalize.io/${projectToken}/${environment}`

const allLanguages: {key: string}[] = (await fetch(`${cdn}/_languages`).then(res => res.json())).map((l: any) => ({key: l.key}));

console.log("in middleware allLanguages ", allLanguages);

export async function middleware(request: NextRequest) {

    console.log("received host ", request.nextUrl.host)
    console.log("received pathname ", request.nextUrl.pathname)
    console.log("received cookies ", request.cookies)

    const languages = allLanguages; //[{key: 'en'}, {key: 'it'}, {key: 'ru'}]//await i18nStore.allLanguages();

    const langsPattern = languages.map(l => l.key).join("|");
    console.log("middleware langsPattern", langsPattern, request.nextUrl.pathname)
    const regex = new RegExp(`\/(${langsPattern})(.*)`);

    const chunkedUrl = regex.exec(request.nextUrl.pathname);

    let resp: NextResponse;
    let lang: string;
    if (chunkedUrl) {
        resp = NextResponse.next();
        lang = chunkedUrl[1]
    } else {
        const langCookie = request.cookies.get(LANGUAGE_COOKIE);
        lang = langCookie ? langCookie.value : 'en';
        const destination = `${request.nextUrl.origin}/${lang}${request.nextUrl.pathname}`;
        console.log("rewriting to ", destination);
        resp = NextResponse.rewrite(destination);
    }
    console.log("setting language cookie", lang, "domain", request.nextUrl.hostname);
    resp.cookies.set(LANGUAGE_COOKIE, lang, {path: "/", domain: request.nextUrl.hostname});
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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}