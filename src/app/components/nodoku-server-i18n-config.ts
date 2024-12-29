import {NodokuI18n} from "nodoku-i18n";
import OnFallbackLngTextUpdateStrategy = NodokuI18n.OnFallbackLngTextUpdateStrategy;
import OnMissingKeyStrategy = NodokuI18n.OnMissingKeyStrategy;
import {SimplelocalizeMissingKeyStorage} from "nodoku-i18n/simplelocalize/storage";
import {SimplelocalizeBackendApiClientImpl} from "nodoku-i18n/simplelocalize/client";
import MissingKeyStorage = NodokuI18n.MissingKeyStorage;

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


const client: SimplelocalizeBackendApiClientImpl =
    new SimplelocalizeBackendApiClientImpl(apiKey, projectToken, translationFetchMode);

const missingKeyStorage: MissingKeyStorage =
    new SimplelocalizeMissingKeyStorage(client, () => Promise.resolve(), onMissingKeyStrategy, onFallbackLngTextUpdateStrategy);


export const i18nStore: NodokuI18n.I18nStore = await NodokuI18n.initI18nStore(/*apiKey, projectToken,*/
    "all",
    ["nodoku-landing", "getting-started", "showcase", "footer", "nav-header"], 'en',
    translationFetchMode,
    saveMissing,
    loadOnInit,
    client, missingKeyStorage/*onMissingKeyStrategy, onFallbackLngTextUpdateStrategy*/);

console.log(">>> ended initializing store")
