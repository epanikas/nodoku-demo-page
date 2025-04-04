```yaml
nd-block:
  attributes:
    sectionName: readme-header
```

# Nodoku Demo Page README

## [https://github.com/epanikas/nodoku-demo-page](https://github.com/epanikas/nodoku-demo-page)

```yaml
nd-block:
  attributes:
    sectionName: readme
```


[**_nodoku-demo-page_**](https://github.com/epanikas/nodoku-demo-page) is a demo project for the [Nodoku static site builder](https://github.com/nodoku/nodoku-core).

This repository demonstrates the use of Nodoku libraries to build static pages using the Markdown files as content provider, and Yaml files as visual representation configuration.

## Getting started

Here are the steps to run the nodoku-demo-page project locally:

- clone git repo

```shell
git clone https://github.com/epanikas/nodoku-demo-page.git
```

- cd to the repo

```shell
cd nodoku-demo-page
```

- run npm install

```shell
npm install
```

- run generaton for component resolver and schema files (see for more details README in https://github.com/nodoku/nodoku-core)
```shell
npm run gen-component-resolver
npm run gen-skin-schema
```

- create a sample translation project in Simplelocalize (https://simplelocalize.io/)
Once the project is created, obtain its PROJECT TOKEN and API KEY and provide them in the file ```.env.local``` as follows:

```text
DEFAULT_LNG=en
SIMPLELOCALIZE_API_KEY=<my api key>
SIMPLELOCALIZE_PROJECT_TOKEN=<my project token>
```

- run the project in dev mode

```shell
npm run dev
```

- build the site

```shell
npm run build
```

- run the built site

```shell
npm start
```

Once this is done, and evrything went well, you can navigate in your browser to the url: http://localhos:3001 and you should see the site working


## Project structure

The project is organized around the Next JS page router, based on the file structure, starting from the ```src/app``` folder.

Each page is nothing but ac parameterized call to the Nodoku RenderingPage JSX component, which is the main entry point for the Nodoku library.

As follows (see for example ```src/app/[lng]/page.tsx```):

```typescript

export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    const skin: NdPageSkin = parseYamlContentAsSkin(fs.readFileSync("./public/site/nodoku-landing.yaml").toString());
    const content: NdContentBlock[] = parseMarkdownAsContent(fs.readFileSync("./public/site/nodoku-landing.md").toString(), "en", "nodoku-landing")

    return <RenderingPage
                lng={lng}
                renderingPriority={RenderingPriority.skin_first}
                skin={skin}
                content={content}
                componentResolver={nodokuComponentResolver}
                imageProvider={commonImageProvider}
                htmlSanitizer={commonHtmlSanitizer}
                i18nextProvider={NodokuI18n.i18nForNodoku(i18nStore)}
                i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
                clientSideComponentProvider={undefined}
        />;
}



```

As one can see, the content for this page is retrieved from the ```./public/site/nodoku-landing.md``` and the skin - from ```./public/site/nodoku-landing.yaml```

This is a common pattern in this project when the structure of content and skin files follow the structure of the pages in ```src/app``` router.

Here is a brief description of the parameters for RenderingPage (for more detailed explanation please refer to https://github.com/nodoku/nodoku-core)


- **_lng_**: the language the page should be rendered with (for more details about Nodoku localization capabilities please refer to https://github.com/nodoku/nodoku-i18n)


- **_renderingPriority_**: specifies if the page should be rendering according to the structure of the skin file, or according to the structure of the content file


- **_skin_**: the parsed Yaml file which represents the skin of the page


- **_content_**: the array of content blocks parsed from the content Markdown file
 
 
- **_componentResolver_**: the function that would convert the name of the visual component to its actual implementation


- **_imageProvider_**: the function that would create an image representation, upon given image url


- **_htmlSanitizer_**: the function that would sanitize the received from the content block. Upon Markdown parsing each content block carries the original HTML that the parser has created. This piece of HTML could have been processed by a translator and translation postprocessor (see below). Then this HTML is embedded into the page, after it has been sanitized by this function


- **_i18nextProvider_**: the text translator provider (see https://github.com/nodoku/nodoku-i18n for more details)


- _**i18nextPostProcessor**_: the function that is used to postprocess the translated text. Usually used to convert the icon text name, such as ```{icon:nd-react-icons/fa6:FaGithub}``` to an actual icon representation


- **_clientSideComponentProvider_**: the function that is called to obtain an actual JSX representation for a client-side component, if a Nodoku component supports one. For example, the component ```flowbite/nav-header``` accepts two client side components, that can be displayed on the navbar: ```language-switcher``` and ```user-account```  


## Page translation (i18n localization)

The current project uses a cloud based localization solution, provided by Simplelocalize.

In order for this project to work one would need to provide the Simplelocalize PROJECT TOKEN and Simplelocalize API KEY in the file ```.env.local```.

The translation engine is specified as follows:

```tsx
import {i18nStore} from "@/app/components/nodoku-server-i18n-config";
...
<RenderingPage 
    ...
    i18nextProvider={NodokuI18n.i18nForNodoku(i18nStore)}
    ...
/>
```

The store for the localization is defined in the ```src/app/components/nodoku-server-i18n-config.ts``` as follows:

```ts
const client: SimplelocalizeBackendApiClientImpl =
    new SimplelocalizeBackendApiClientImpl(apiKey, projectToken, translationFetchMode);

const missingKeyStorage: MissingKeyStorage =
    new SimplelocalizeMissingKeyStorage(client, () => Promise.resolve(), onMissingKeyStrategy, onFallbackLngTextUpdateStrategy);


export const i18nStore: NodokuI18n.I18nStore = await NodokuI18n.initI18nStore(
    "all", // all languages to be fetched
    [ // the namespaces to be used
        "nodoku-landing", 
        "getting-started", 
        "showcase", 
        "footer", 
        "nav-header"
    ], 
    'en', // the default language (fallback language), used to detect the changes in the source text
    translationFetchMode, // should we use CDN or API to fetch the translation from the cloud
    saveMissing, // should the missing keys be saved
    loadOnInit, // whether the translations should be loaded immediately
    client, // the actual translation client to be used, in our case SimplelocalizeBackendApiClientImpl
    missingKeyStorage // where the missing keys should be stored
);

```

## Configuring Tailwind

Nodoku is a library that heavily relies on the Tailwind CSS framework for styling and visual appearance.

The following ```tailwind.config.ts``` should be used:

```ts
import type {Config} from "tailwindcss";
import * as typo from '@tailwindcss/typography';
import {NodokuFlowbiteTailwind} from "nodoku-flowbite/tailwind";
import {NodokuMambaUiTailwind} from "nodoku-mambaui/tailwind";
import {NodokuCoreTailwind} from "nodoku-core/tailwind";
import {NodokuComponentsTailwind} from "nodoku-components/tailwind";

const config: Config = {
    darkMode: 'class',              // specifies that the dark mode button is activated via the class parameter. This is the default mode for the Flowbite theme switcher button

    content: [
        "./src/**/*.ts",            // includin tailwind classes found in the code
        "./src/**/*.tsx",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./schemas/**/*.yml",       // including tailwind classes for the default component themes
        "./public/**/*.html",       
        "./src/**/*.{html,js}",
        "./public/site/**/*.yaml",  // including tailwind classes found in the page skin Yaml files
    ]
    .concat(NodokuCoreTailwind.tailwindConfig())        // add the required config for components from nodoku-core
    .concat(NodokuComponentsTailwind.tailwindConfig())  // add the required config for components from nodoku-components
    .concat(NodokuFlowbiteTailwind.tailwindConfig())    // add the required config for components from nodoku-flowbite
    .concat(NodokuMambaUiTailwind.tailwindConfig()),    // add the required config for components from nodoku-mambaui

    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'unset', // removing default width for Typography Tailwind plugin
                    }
                }
            }
        },
    },
    plugins: [
        typo.default(), // make sure to include the Typography Tailwind plugin, since the component core/typography relies on that
    ],
};


export default config;

```

Note, that when using Nodoku, the correct Tailwind configuration is crucial for the correct work.

Each Nodoku component bundle, such as nodoku-flowbite and nodoku-mambaui are shipped with the Tailwind config to be included in the Tailwind config of the project.

For example, 

```ts
import {NodokuMambaUiTailwind} from "nodoku-mambaui/tailwind";
...
const twMambaUi = NodokuMambaUiTailwind.tailwindConfig()
const allContent = [standard project configuration].concat(twMambaUi)

const config: Config = {
    content: allContent
};

export default config;

```

## Using Nodoku icons

Nodoku framework allows using icons by specifying them directly in the text, or as images.

The component [nodoku-icons](https://github.com/nodoku/nodoku-icons) provides the necessary mechanism to enable icons

### Specifying icon in a text

An icon can be specified directly in the text content using the following format ```{icon:<name of the icons bundle>/<name of the icons set>:<name of the icon>}```:

For example:

```markdown
{icon:nd-react-icons/fa6:FaAt}
```

This text pattern is postprocessed by the specifed text postprocessor, specified as a parameter to the RenderingPage component:

```tsx
import {NodokuIcons} from "nodoku-icons";
import {nameToIconConverters} from "@/app/components/common-provider";

<RenderingPage
    ...
    i18nextPostProcessor={NodokuIcons.iconTextPostProcessorFactory(nameToIconConverters)}
    ...
/>;
```

In this project, see ```src/app/components/common-provider.tsx``` for details

### Using an icon as an image

An icon can be encoded in the image url as follows:

```markdown
![step-1](icon:nd-react-icons/hi:HiOutlineAnnotation )
```

One would use the same icon notation, as in case of text, with the only exception being that instead of curly braces - {}, the brackets are used - ().

The RenderingPage parameter **_imageProvider_** should be configured for this url notation to work.

See the implementation of the function **_commonImageProvider_** in the file ```src/app/components/common-provider.tsx```

Note that you can control the icon size in the Yaml skin file using the parameter ```imageStyle::imageWidth``` as follows:

```yaml
rows:
  - row:
      components:
        - flowbite/horizontal-card:
            theme:
              imageStyle:
                # controls the icon size
                imageWidth: '150' 
            selector:
              attributes:
                sectionName: example
```

See the skin file ```public/site/nodoku-landing.yaml``` for more details