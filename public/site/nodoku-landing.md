
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

![my-awesome-product](../images/my-awesome-product.png)
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








