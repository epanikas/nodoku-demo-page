
```yaml
nd-block:
  attributes:
    sectionName: head-hero
```

# Nodoku

## a content-first landing page and <br>static site generator

Nodoku is a library aiming at creating beautiful and responsive landing pages effortlessly. 

It uses **_Markdown_** file as content supplier, and a **_Yaml_** file as visual configurator.


```yaml
nd-block:
  attributes:
    sectionName: what-is-it
```


## _Nodoku_ is a set of libraries that allows building effortlessly a landing page or a static site

Nodoku is a framework on top of **_NextJS_**, **_React_** and **_Tailwind_**.

Nodoku is using the underlying NextJS capabilities of Server-Side-Rendering (SSR).

The Nodoku engine parses the supplied Markdown file into content blocks.

Then it renders each block using the configuration provided in the Yaml file - called _**skin**_.




```yaml
nd-block:
  attributes:
    sectionName: how-it-works
```

# Nodoku way 

## Nodoku suggests a simple way of creating content-centric landing pages, using Markdown and Yaml

```yaml
nd-block:
  attributes:
    sectionName: nodoku-way
```

# Step 1: _Think_
## Create content promoting your product or service as an **MD file**

![step-1](../images/postit-board.jpg "step 1")

Concentrate on the subject of your product / service to highlight its advantages.

Use your *favorite* text editor to create a content-rich MD (markdown) file,
without worrying about presentation.

Using content block delimeter - a Yaml code snippet -
structure the content file, so that it can be submitted to the Nodoku parser.

|Get started|


# Step 2: _Skin_
## Skin the MD file using simple **Yaml config** and available components

![step-2](../images/3d-view-puzzle-pieces.jpg "step 2")

Once you are happy with the message your landing page conveys,
start by skinning it up.

Nodoku skin is a Yaml file, which binds together sections in your MD file,
with the presentation blocks.

You can choose among different presentation components,
including Carousel, Hero and different types of Card components.

|Get started|

# Step 3: _Fine tune_
## Use configuration options to fine tune your landing page presentation

![step-3](../images/design-table.jpg "step 3")

If the default presentation doesn't suit your needs, you can tweak it up
using the config options of each component to fine tune it for your needs.

You can change the background color, text color, borders and other
visual details of your presentation.

Normally the Nodoku components support Tailwind CSS out of the box,
so you can fine tune ivsual presetnation using Tailwind.

|Get started|


```yaml
nd-block:
  attributes:
    sectionName: example-header
```

# Here is an example

## Suppose you are creating a product landing page

```yaml
nd-block:
  attributes:
    sectionName: example
```

# Create an MD file

![step-1](../images/postit-board.jpg "step 1")

create a Markdown content file, describing your product 

```markdown
# Title of my awesome product
## Subtitle of my awesome product

Description of my product.
And another line of description.

![my-awesome-product](./images/my-awesome-product.png)
```

# Draft a skin Yaml file


![step-2](../images/3d-view-puzzle-pieces.jpg "step 2")


draft a Yaml file configuring the visual representation


```yaml
rows:
  - row:
      components:
        - mambaui/hero-left-text:
            selector:
              attributes:
                id: product-1


```




```yaml
nd-block:
  attributes:
    sectionName: example-result-header
```

## And here is the result

```yaml
nd-block:
  attributes:
    id: product-1
```


# Title of my awesome product

## Subtitle of my awesome product

Description of my product.

And another line of description.

![my-awesome-product](../images/still-life-with-plants-deco.jpg "My Awesome Product")

[image by Freepik](https://www.freepik.com/free-photo/still-life-with-plants-deco_20734103.htm#fromView=search&page=1&position=0&uuid=6672daf1-0fe9-4f7d-afb6-46705817ca8c)



```yaml
nd-block:
  attributes:
    sectionName: generated-with-nodoku
```

# And Yes!<br><br>This very page was generated with Nodoku!

Check out the source code of this page at <br>[https://github.com/epanikas/nodoku-demo-page](https://github.com/epanikas/nodoku-demo-page)


```yaml
nd-block:
  attributes:
    sectionName: advantages-header
```

# Why you would like to give Nodoku a try

```yaml
nd-block:
  attributes:
    sectionName: advantages
```

# Distraction-free content-first approach

![step-1](icon:react-icons/hi:HiCode "step 1")

Unlike Nodoku, the vast majority of site builders are using the so-called WYSIWYG (What You See Is What You Get) approach, when the site is being built gradually, by filling in the web-forms right on the visual elements.

Even though this approach gives a very fast visual impression of your future page, it has a major drawback - it is very **_distracting_**.

Nodoku is suggesting a different approach - **_you create content first_**.

The content is created in a textual form in a Markdown file, and at this moment _nothing else matters_.


# Content and presentation are strictly separated 

![step-1](icon:react-icons/hi:HiOutlineViewGrid "step 1")

Nodoku promotes a strict separation between the content and the presentation, allowing for a great deal of flexibility, when one can be changed without affecting the other.

This approach is illustrated by the fact that the content and the design are represented by different files - **_Markdown file_** for content, and **_Yaml file_** - called _skin_ - for visual presentation.

Keeping content and design concepts strictly separated allows for independent editing of both, without worrying about the impact that one might have on another.



# Built-in multilingual localization 

![step-1](icon:react-icons/hi:HiOutlineGlobeAlt "step 1")

Nodoku has been designed from ground up keeping in mind the necessity of the content localization.

The content in Nodoku is represented by a set of **_content blocks_**, each of which is a separated piece of content (usually a paragraph or a title).

The content becomes easily localizable, since each content block has its unique key.

This key can naturally be used as a **_translation key_**, that can be integrated with the localization solution of your choice.

Check out [nodoku-i18n](https://github.com/nodoku/nodoku-i18n) for more details.


# Nodoku components are naturally responsive

![step-1](icon:react-icons/hi:HiOutlineDeviceMobile "step 1")

Each Nodoku component is carefully crafted such that it would be presented correctly on any browsing device.

The currently available sets of Nodoku components, [**_Nodoku-Flowbite_**](https://github.com/nodoku/nodoku-flowbite) and [**_Nodoku-MambaUI_**](https://github.com/nodoku/nodoku-mambaui) based on [Flowbite](https://flowbite.com/) and [Mamba UI](https://www.mambaui.com/) set of visual blocks respectively, are all responsive _to provide the best user experience_.

The Nodoku skin - a Yaml file providing visual customization - is based on the Tailwind CSS styling engine, which gives large possibilities for responsive design tuning.  



# Layout, based either on CSS grid or CSS flex

![step-1](icon:react-icons/hi:HiOutlineTable "step 1")

A Nodoku page is organized as a **_set of rows_**, each row having one or more visual components.

Such row-oriented layout gives a clear understanding of the structure of your page, and predictable visual element placement.

By default, each row in a Nodoku page is using **_CSS grid_** to organize the row inner elements.

However, the layout of a row can be switched to **_CSS flex_**, if required.

This allows, depending on your particular requirements, adapt the layout that best suits your needs.




# SEO friendly, thanks to Server-Side rendering

![step-1](icon:react-icons/hi:HiOutlineAnnotation "step 1")

Nodoku is using Server-Side Rendering, powered by the [NextJS](https://github.com/vercel/next.js) framework.

All the Nodoku pages are pre-built in advance during the offline build process.

This allows not only for the lightning fast page loading, but also for **_Search Engine Optimization_**, since each page is readily available, and can be scanned by the search engines easily.

No Javascript code is required to be executed prior to page scanning by the web search engine.

Consequently, the whole page naturally becomes **_SEO friendly_**.




# Extensible with new visual components

![step-1](icon:react-icons/hi:HiOutlinePuzzle "step 1")

Nodoku framework is extensible by design, since it is **_the end user that controls the mapping_** between visual components and Yaml skin configuration.

Nodoku is using the so-called _component provider_ - a function that returns a visual component representation according to the Yaml skin file description.

This implementation is responsible for the ultimate component rendering, using the theme and localization.

Consequently, the end-user can easily extend the existing set of components by custom ones, as required. 