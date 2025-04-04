
```yaml
nd-block:
  attributes:
    sectionName: components-header
```

# [Flowbite](https://flowbite.com/) based Nodoku components 

Currently, the set of Nodoku components based on Flowbite include the following elements:



```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-nav-header-header
```

## Flowbite Nav Header

| Category                            | Value                                                                    |
|-------------------------------------|--------------------------------------------------------------------------|
| name                                | **_flowbite/nav-header_**                                                |
| number of consumable content blocks | 1                                                                        |
| schema file location                | schemas/nodoku-flowbite/schemas/components/nav-header/visual-schema.json |
| default theme file location         | schemas/nodoku-flowbite/schemas/components/nav-header/default-theme.yml  |
| client side components              | language-switcher, user-account                                          |

Nav-Header is a component presenting a navigation header of a page or a site

This component consumes exactly one content block, and this content block is supposed to have the following attributes

- the H1 title element of the content block should have the predefined value "**_{Brand}_**"
- an image, designating the company logo
- one paragraph having the following form: **_{companyName}_**Company name
- one list of menu items, potentially having sub lists

The Nav-Header also can accept two client side components:
- language-switcher
  - a client side component representing a button to change the language of the page
- user-account
  - a client side component representing a button, clicking on which a user may login/logout, or have access to a personal profile



```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-nav-header-showcase
```

# {Brand}

![logo](icon:nd-react-icons/fa6:FaBagShopping "My-Company logo")

{companyName}My-Company

- [Home](/#)
- [Menu item](/docs)
- Menu item with sub-items
  - [Menu sub-item 1](/menu-sub-item-1)
  - [Menu sub-item 2](/menu-sub-item-2)



```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-carousel-header
```

## Flowbite Carousel

| Category                            | Value                                                                   |
|-------------------------------------|-------------------------------------------------------------------------|
| name                                | **_flowbite/carousel_**                                                 |
| number of consumable content blocks | unlimited                                                               |
| schema file location                | schemas/nodoku-flowbite/schemas/components/carousel/visual-schema.json  |
| optoins schema file location        | schemas/nodoku-flowbite/schemas/components/carousel/options-schema.json |
| default theme file location         | schemas/nodoku-flowbite/schemas/components/carousel/default-theme.yml   |
| client side components              | none                                                                    |

Flowbite Carousel is an element that presents the content as changing slides.

It supports the following sliding directions:
- horizontal
  - animationType: slide-x
  
- vertical
  - animationType: slide-y
  
- fading
  - animationType: fade-in-fade-out

This component can consume any number of _content blocks_, each content block defining a single slide.

You can customize the appearance of each slide, including background color and background image using the _themes_ customization option, as follows:

```yaml
  - row:
      components:
        - flowbite/carousel:
            themes:
              - bgColorStyle:
                  decoration: text-center dark:bg-red-700 bg-red-300 p-5
              - bgColorStyle:
                  decoration: text-center dark:bg-orange-700 bg-orange-300 p-5
              - bgColorStyle:
                  decoration: text-center dark:bg-cyan-700 bg-cyan-300 p-5
            selector:
              attributes:
                sectionName: components-flowbite-carousel-showcase

```



```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-carousel-showcase
```

# Slide 1 Title

## Slide 1 Sub-Title

Slide 1 first paragraph 

Slide 1 second paragraph 

Slide 1 third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Slide 2 Title

## Slide 2 Sub-Title

Slide 2 first paragraph 

Slide 2 second paragraph 

Slide 2 third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Slide 3 Title

## Slide 3 Sub-Title

Slide 3 first paragraph 

Slide 3 second paragraph 

Slide 3 third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-jumbotron-header
```

## Flowbite Jumbotron

| Category                            | Value                                                                   |
|-------------------------------------|-------------------------------------------------------------------------|
| name                                | **_flowbite/jumbotron_**                                                |
| number of consumable content blocks | 1                                                                       |
| schema file location                | schemas/nodoku-flowbite/schemas/components/jumbotron/visual-schema.json |
| default theme file location         | schemas/nodoku-flowbite/schemas/components/jumbotron/default-theme.yml  |
| client side components              | none                                                                    |

```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-jumbotron-showcase
```

# Jumbotron Title

## Jumbotron Sub-Title

Jumbotron first paragraph

Jumbotron second paragraph

Jumbotron third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-card-header
```

## Flowbite Card

| Category                            | Value                                                              |
|-------------------------------------|--------------------------------------------------------------------|
| name                                | **_flowbite/card_**                                                |
| number of consumable content blocks | 1                                                                  |
| schema file location                | schemas/nodoku-flowbite/schemas/components/card/visual-schema.json |
| default theme file location         | schemas/nodoku-flowbite/schemas/components/card/default-theme.yml  |
| client side components              | none                                                               |

Each card represents exactly one content block.

The content block must have one image included, as this is the image that is used to display on the card.

If the image provider, supplied to the RenderingPage, supports displaying icons, instead of an image one can specify an icon, encoded as follows:

```markdown
![card-1](icon:nd-react-icons/hi:HiOutlineEmojiHappy )
```

```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-card-showcase
```

# Card 1 Title

## Card 1 Sub-Title

![card-1](icon:nd-react-icons/hi:HiOutlineEmojiHappy )

Card 1 first paragraph

Card 1 second paragraph

Card 1 third paragraph

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Card 2 Title

## Card 2 Sub-Title

![card-2](icon:nd-react-icons/hi:HiOutlineGift)

Card 2 first paragraph

Card 2 second paragraph

Card 2 third paragraph

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Card 3 Title

## Card 3 Sub-Title

![card-3](icon:nd-react-icons/hi:HiOutlineGlobeAlt )

Card 3 first paragraph

Card 3 second paragraph

Card 3 third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-horizontal-card-header
```

## Flowbite Horizontal Card

| Category                            | Value                                                              |
|-------------------------------------|--------------------------------------------------------------------|
| name                                | **_flowbite/horizontal-card_**                                     |
| number of consumable content blocks | 1                                                                  |
| schema file location                | schemas/nodoku-flowbite/schemas/components/horizontal-card/visual-schema.json |
| default theme file location         | schemas/nodoku-flowbite/schemas/components/horizontal-card/default-theme.yml  |
| client side components              | none                                                               |

Each card represents exactly one content block.

The content block must have one image included, as this is the image that is used to display on the card.

If the image provider, supplied to the RenderingPage, supports displaying icons, instead of an image one can specify an icon, encoded as follows:

```markdown
![card-1](icon:nd-react-icons/hi:HiOutlineEmojiHappy )
```

```yaml
nd-block:
  attributes:
    sectionName: components-flowbite-horizontal-card-showcase
```

# Card 1 Title

## Card 1 Sub-Title

![card-1](icon:nd-react-icons/hi:HiOutlineEmojiHappy )

Card 1 first paragraph

Card 1 second paragraph

Card 1 third paragraph

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Card 2 Title

## Card 2 Sub-Title

![card-2](icon:nd-react-icons/hi:HiOutlineGift)

Card 2 first paragraph

Card 2 second paragraph

Card 2 third paragraph

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


# Card 3 Title

## Card 3 Sub-Title

![card-3](icon:nd-react-icons/hi:HiOutlineGlobeAlt )

Card 3 first paragraph

Card 3 second paragraph

Card 3 third paragraph 

|[Call to action 1](/call-to-action-1)|

|[Call to action 2](/call-to-action-2)|


