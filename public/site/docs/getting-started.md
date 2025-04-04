
```yaml
nd-block:
  attributes:
    sectionName: getting-started
```

# Getting started with Nodoku

## In this documentation we will discover the first steps, needed to setup a Nodoku project


### **_Step 1_**: Create a NextJS project

Nodoku is a framework, that runs in a NextJS project. In order to start with Nodoku one needs to be familiar with NextJS environment.

If you are not familiar yet with NextJS, please have a look at the [NextJS getting started](https://nextjs.org/docs/app/getting-started/installation) tutorial.

You can also consider using [create-next-app](https://nextjs.org/learn-pages-router/basics/create-nextjs-app/setup) tool to setup a NextJS project quickly.

### **_Step 2_**: Install Nodoku

Nodoku is installed as standard NPM dependency:

```shell
npm install nodoku-core nodoku-components nodoku-flowbite nodoku-mambaui
```
If you plan to use localization (multilingual site), you should also install _nodoku-i18n_:

```shell
npm install nodoku-i18n
```


### **_Step 3_**: Setup a Nodoku page

We assume that after the fist step you are having the following project structure (or similar):

```text
nodoku-project
  |- public
  |- src
  |   |- app
  |   |- globals.css
  |- package.json
```

add to the public folder two files:
- my-nodoku-page.md
- my-nodoku-page.yaml

These files will constitute the content of the page, and its visual representation respectively.

Under _src/app_ add the files:
- layout.tsx
- page.tsx

as follows:

**_src/app/layout.tsx_**

```tsx
import "./globals.css";
import React from "react";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang={"en"} dir={"ltr"}>
        <body>
        {children}
        </body>
        </html>
    );
}
```

**_src/app/page.tsx_**

```tsx
import React, {JSX} from "react";
import {parseMarkdownAsContent, parseYamlContentAsSkin, RenderingPage, RenderingPriority} from "nodoku-core";
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
import * as fs from "node:fs";
import {commonImageProvider} from "@/app/components/common-image-provider";


export default async function Home(): Promise<JSX.Element> {

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/my-nodoku-page.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/my-nodoku-page.md").toString(), "en", "my-nodoku-page")

    return (
        <RenderingPage
            lng={"en"}
            renderingPriority={RenderingPriority.content_first}
            skin={skin}
            content={content}
            i18nextProvider={undefined}
            imageProvider={commonImageProvider}
            componentResolver={nodokuComponentResolver}
        />
    );
}
```

At this point the file page.tsx wouldn't compile, as the following import is missing:

```typescript
import {nodokuComponentResolver} from "@/nodoku-component-resolver"
```

Let's create it now.


### **_Step 4_**: Generate component provider and skin schema

In order to generate the _component provider_ - a function that would map the component name to its implementation - run the following command:

```shell
npm run gen-component-resolver
```

This should generate the file at the src location: **_src/nodoku-component-resolver.ts_**

Likewise, you should also generate the JSON schema file to provide schema for skin Yaml file:

```shell
npm run gen-skin-schema
```

Learn more about _component resolver_ and _skin Yaml schema_ in the [nodoku-core documentation](https://github.com/nodoku/nodoku-core).



### **_Step 5_**: Edit the content file, and add component to the skin file

Edit the **_my-nodoku-page.md_** as follows:

```markdown
```yaml
nd-block:
  attributes:
    sectionName: first-page-title
``

# This is my first Nodoku page
```

(don't forget to add the third ` on the yaml code snippet)

Edit the **_my-nodoku-page.yaml_** as follows:

```yaml
# yaml-language-server: $schema=../../../schemas/visual-schema.json

global:
  defaultTheme: light

rows:
  - row:
      theme:
        componentHolder:
          base: m-10
      components:
        - core/typography:
            theme:
              containerStyle:
                decoration: container mx-auto text-center
            selector:
              attributes:
                sectionName: first-page-title
```


### **_Step 5_**: Run the Nodoku project

In order to run the freshly created Nodoku project, launch the following command:

```shell
npm run dev
```

At this point, if everything goes well, you should see the following page displayed in the browser (you can see it live here: [Nodoku first page](/first-page)):



![my-nodoku-page](../../images/my-nodoku-page-screenshot.png "step 1")

