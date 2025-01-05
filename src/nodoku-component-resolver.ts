import {AsyncFunctionComponent, DummyComp, NdComponentDefinition} from "nodoku-core";

import { NodokuComponents } from "nodoku-components";
import { NodokuFlowbite } from "nodoku-flowbite";
import { NodokuMambaUi } from "nodoku-mambaui";

const components: Map<string, {compo: AsyncFunctionComponent, compoDef: NdComponentDefinition}> = new Map<string, {compo: AsyncFunctionComponent, compoDef: NdComponentDefinition}>();

components.set("core/typography", {compo: NodokuComponents.Typography, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-components/schemas/components/typography/default-theme.yml")});
components.set("flowbite/card", {compo: NodokuFlowbite.Card, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-flowbite/schemas/components/card/default-theme.yml")});
components.set("flowbite/horizontal-card", {compo: NodokuFlowbite.HorizontalCard, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-flowbite/schemas/components/horizontal-card/default-theme.yml")});
components.set("flowbite/carousel", {compo: NodokuFlowbite.Carousel, compoDef: new NdComponentDefinition("unlimited", "./schemas/nodoku-flowbite/schemas/components/carousel/default-theme.yml")});
components.set("flowbite/jumbotron", {compo: NodokuFlowbite.Jumbotron, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-flowbite/schemas/components/jumbotron/default-theme.yml")});
components.set("flowbite/nav-header", {compo: NodokuFlowbite.NavHeader, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-flowbite/schemas/components/nav-header/default-theme.yml")});
components.set("mambaui/hero-one", {compo: NodokuMambaUi.HeroOne, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/hero-one/default-theme.yml")});
components.set("mambaui/hero-two", {compo: NodokuMambaUi.HeroTwo, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/hero-two/default-theme.yml")});
components.set("mambaui/hero-left-text", {compo: NodokuMambaUi.HeroLeftText, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/hero-left-text/default-theme.yml")});
components.set("mambaui/hero-right-text", {compo: NodokuMambaUi.HeroRightText, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/hero-right-text/default-theme.yml")});
components.set("mambaui/card", {compo: NodokuMambaUi.Card, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/card/default-theme.yml")});
components.set("mambaui/faq-one-question", {compo: NodokuMambaUi.FaqOneQuestion, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/faq/one-question-default-theme.yml")});
components.set("mambaui/faq-header", {compo: NodokuMambaUi.FaqHeader, compoDef: new NdComponentDefinition(1, "./schemas/nodoku-mambaui/schemas/components/faq/header-default-theme.yml")});
components.set("mambaui/footer-four", {compo: NodokuMambaUi.FooterFour, compoDef: new NdComponentDefinition("unlimited", "./schemas/nodoku-mambaui/schemas/components/footer-four/default-theme.yml")});


export type ClientSideComponentNameEnum =
        "flowbite/nav-header:language-switcher" | 
        "flowbite/nav-header:user-account";

export const fromStringToClientSideComponentNameEnum = (c: string): ClientSideComponentNameEnum | undefined => {
    if (c === "flowbite/nav-header:language-switcher") {
        return "flowbite/nav-header:language-switcher";
    }
    if (c === "flowbite/nav-header:user-account") {
        return "flowbite/nav-header:user-account";
    }
    return undefined;
}


export async function nodokuComponentResolver(componentName: string): Promise<{compo: AsyncFunctionComponent, compoDef: NdComponentDefinition}> {
    const f: {compo: AsyncFunctionComponent, compoDef: NdComponentDefinition} | undefined = components.get(componentName);
    return f ? f : {compo: DummyComp, compoDef: new NdComponentDefinition(1)};
}