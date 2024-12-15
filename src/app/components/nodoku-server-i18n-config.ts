import {NodokuI18n} from "nodoku-i18n";
import OnFallbackLngTextUpdateStrategy = NodokuI18n.Simplelocalize.OnFallbackLngTextUpdateStrategy;
import OnMissingKeyStrategy = NodokuI18n.Simplelocalize.OnMissingKeyStrategy;

var runsOnServerSide = typeof window === 'undefined';
if (!runsOnServerSide) {
    throw new Error("this config is intended on server side only");
}


const projectToken: string = process.env.SIMPLELOCALIZE_PROJECT_TOKEN || "n-a";
const apiKey: string = process.env.SIMPLELOCALIZE_API_KEY || "n-a";

console.log("<<< started initializing store")

const saveMissing = true;
const loadOnInit: boolean = process.env.NODE_ENV === "development"
const translationFetchMode: "api" | "cdn" = process.env.NODE_ENV === "development" ? "api" : "cdn"
const onFallbackLngTextUpdateStrategy = OnFallbackLngTextUpdateStrategy.reset_reviewed_status;
const onMissingKeyStrategy: OnMissingKeyStrategy = OnMissingKeyStrategy.save_to_file;//process.env.NODE_ENV === "development" ? OnMissingKeyStrategy.upload : OnMissingKeyStrategy.save_to_file;


export const i18nStore: NodokuI18n.I18nStore = await NodokuI18n.Simplelocalize.initI18nStore(apiKey, projectToken, "all",
    ["nodoku-landing", "getting-started", "showcase", "footer"], 'en', translationFetchMode,
    saveMissing, loadOnInit, onMissingKeyStrategy, onFallbackLngTextUpdateStrategy);

console.log(">>> ended initializing store")
