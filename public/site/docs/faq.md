```yaml
nd-block:
  attributes:
    sectionName: faq-general-header
```

# General questions
## {icon:nd-react-icons/fa6:FaRegCircleQuestion} Frequently Asked Questions {icon:nd-react-icons/fa6:FaRegCircleQuestion}


```yaml
nd-block:
  attributes:
    sectionName: faq-general
```

# Why Nodoku ? 

Nodoku suggests a content-first approach for a web page and site creation. It promotes a strict separation between content and visual presentation, when one can be changed independently of the other.

Nodoku content is stored in a Markdown file. Markdown is a convenient text format, which allows for rich text formatting options, such as _italic_ and **bold** fonts. 

Nodoku skin is a Yaml file, which allows for Nodoku components customization.

Nodoku engine parses the content Markdown file and the Yaml skin file, and builds a static page accordingly.

Nodoku ships with a set of components that perform the actual server-side rendering. Each content block of Nodoku is interpreted by a designated rendering components.

Read more about the foundation of Nodoku and its inner workings in https://github.com/nodoku/nodoku-core

Here is [the blog article](/blog-article) describing the rationale behind Nodoku creation. 


# What is Nodoku ?

_Nodoku_ is a set of libraries that allows building effortlessly a landing page or a static site

Nodoku is a framework on top of **_NextJS_**, **_React_** and **_Tailwind_**.

Nodoku is using the underlying NextJS capabilities of Server-Side-Rendering (SSR).

The Nodoku engine parses the supplied Markdown file into content blocks.

Then it renders each block using the configuration provided in the Yaml file - called _**skin**_.


# What use-cases Nodoku has been designed for

Nodoku has primarily been designed to provide an easy-to-use content-centric framework for creating landing pages, that can easily be integrated in an existing NextJS project.

However, Nodoku with its rich component-based rendering capabilities, localization mechanism and wide customization options can be an excellent choice for such use cases as:

- a technical blog
- a product or service landing page
- a landing page of a local business
- a startup site

What can be appealing when using Nodoku is the fact that the content is easily editable, since no annoying web-forms are involved.

Instead, a text editor is enough to edit the relevant parts of the Markdown document, which makes the whole process seamless and fluid.

In accrodance with Nodoku license, however, **_Nodoku cannot be used in site builders or automatic tools for site creation or generation_**.

# How much does it cost to use Nodoku ? Is it free ?

Yes, Nodoku is absolutely free for personal use, or for use to build pages or sites for clients. 

However, **_Nodoku cannot be used to create site builders, or any other tools for automatic web-site or web-page creation_**. 

# Is Nodoku page responsive ?

Yes, definitely.

Each and every rendering component of Nodoku is carefully designed to be fully responsive, that is, it is intended to look great on almost any screen size and aspect ratio.

The set of Nodoku components currently available - [nodoku-flowbite](https://github.com/nodoku/nodoku-flowbite) and [nodoku-mambaui](https://github.com/nodoku/nodoku-mambaui) - is based on visual blocks from [MambaUI](https://mambaui.com/) and [Flowbite](https://flowbite.com/) respectively. These components were designed with responsive capability in mind.



```yaml
nd-block:
  attributes:
    sectionName: faq-installation-header
```

# Installation questions
## {icon:nd-react-icons/fa6:FaRegCircleQuestion} Frequently Asked Questions {icon:nd-react-icons/fa6:FaRegCircleQuestion}


```yaml
nd-block:
  attributes:
    sectionName: faq-installation
```

# How can I install Nodoku ?

Currently, Nodoku is designed such that it should be integrated in a NextJS project.

You can either use an existing NextJS project or create a new one. 

Then you would install Nodoku as follows

```shell
npm install nodoku-core nodoku-components nodoku-mambaui nodoku-flowbite
```

You might want to install [nodoku-i18n](https://github.com/nodoku/nodoku-i18n) if your site is supposed to be localized on multiple languages.

Create a Markdown file, that would designate the content of your page, and a Yaml skin file

Finally, call the Nodoku Rendering Page component to render your page, as follows:

```typescript

export default async function Home({params}: { params: Promise<{ lng: string }> }): Promise<JSX.Element> {

    const {lng} = await params;

    const skin = parseYamlContentAsSkin(fs.readFileSync("./public/site/skin/my-page.yaml").toString());
    const content = parseMarkdownAsContent(fs.readFileSync("./public/site/my-page.md").toString(), "en", "my-page")

    return <RenderingPage
        lng={lng}
        renderingPriority={RenderingPriority.skin_first}
        skin={skin}
        content={content}
        componentResolver={nodokuComponentResolver}
        imageProvider={commonImageProvider}
        htmlSanitizer={commonHtmlSanitizer}
        i18nextProvider={undefined}
        i18nextPostProcessor={undefined}
        clientSideComponentProvider={undefined}
    />;
}

```

See the [Nodoku demo](https://github.com/epanikas/nodoku-demo-page) project, which demonstrates many aspects of Nodoku usage.


# Can Nodoku components have client side interactive widgets ?

Mostly, Nodoku components are designed to be rendered on server side, in order to fully take advantage of NextJS Server-Side Rendering (SSR)

However, in some cases a Nodoku component can accept a custom client side interactive widget.

For example, flowbite/nav-header can accept two client side interactive widgets: 

- language-switcher
  - to be used as switcher for display language
- user-account
  - this widget is intended to be used for client login/logout and user profile related options

The client components should be supplied via the **_clientSideComponentProvider_** parameter of the RenderingPage, as follows:

```tsx

const clientSideComponentProvider = (c: string) => {

    if (c === "flowbite/nav-header:language-switcher") {
        return <LanguageSwitcher />
    } else if ("flowbite/nav-header:user-account") {
        return <UserAccount />
    }
    return <span>[placeholder for {c}]</span>
}



<RenderingPage
    ...
    clientSideComponentProvider={clientSideComponentProvider}
/>
```

Note, that the client side widget name, given to the **_clientSideComponentProvider_** consists of two parts: the main component name - flowbite/nav-header, followed by the actual widget name - language-switcher.

This is done to exclude the possibility when the client side widget name collides between two different Nodoku components.