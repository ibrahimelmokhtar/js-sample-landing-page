<!-- Project title -->
# Vanilla JavaScript Landing Page

<!-- Add buttons here -->
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ibrahimelmokhtar/js-sample-landing-page?display_name=tag)
![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fibrahimelmokhtar.github.io%2Fjs-sample-landing-page%2F)
![GitHub last commit](https://img.shields.io/github/last-commit/ibrahimelmokhtar/js-sample-landing-page)
![Lines of code](https://img.shields.io/tokei/lines/github/ibrahimelmokhtar/js-sample-landing-page)
![GitHub issues](https://img.shields.io/github/issues/ibrahimelmokhtar/js-sample-landing-page)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ibrahimelmokhtar/js-sample-landing-page)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_message=online&url=https%3A%2F%2Fibrahimelmokhtar.github.io%2Fjs-sample-landing-page%2F)

<!-- Describe your project in brief -->
A landing page implemented as part of **Professional Web Development Track** offered by **egFWD Initiative** through **Udacity**.  

# Table of contents

- [Project Title](#vanilla-javascript-landing-page)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
  - [Interface and Architecture](#interface-and-architecture)
    1. [Architecture](#architecture)  
    2. [Usability](#usability)  
    3. [Styling](#styling)  
    4. [HTML Structure](#html-structure)  
  - [Landing Page Behavior](#landing-page-behavior)  
    1. [Navigation](#1-navigation)  
    2. [Section Active State](#2-section-active-state)  
    3. [Scroll to Anchor](#3-scroll-to-anchor)  
  - [Additional Features](#additional-features)  
    1. [Navbar Active State](#1-navbar-active-state)  
    2. [Hide Navbar while NOT Scrolling](#2-hide-navbar-while-not-scrolling)  
    3. [Add New Section](#3-add-new-section)  
    4. [Delete Last Section](#4-delete-last-section)  
    5. [Go To Top](#5-go-to-top)  

# Installation
[(Back to top)](#table-of-contents)

To use this project, First clone the repository on your local device using the commands below:

```git clone https://github.com/ibrahimelmokhtar/js-sample-landing-page.git```

# Development
[(Back to top)](#table-of-contents)  
In this section, I will explain **how the code works** and **how everything is put together.**  

## Interface and Architecture
[(Back to top)](#table-of-contents)
### Architecture
This project has the structure shown below:  
```
css
- styles.css    
index.html
js
- app.js
README.md
```

### Usability
  This website has a Responsive Design. This means: "All features are usable across modern desktop, tablet, and phone browsers."  

### Styling
When a section is in the viewport, the following actions will happen:  
1. this section will be highlighted indicating it's the active section.  
2. This active section will be highlighted in the Navbar.

### HTML Structure
At the beginning, there are **FOUR** sections that have been added to the page.


## Landing Page Behavior
[(Back to top)](#table-of-contents)
### 1. Navigation
Navigation is built dynamically as an unordered list. The `document` object has an `event listener` which is listening for `DOMContentLoaded` event. When the `DOM` content is loaded, the following actions are performed:  
1. Collect the required data from each displayed section using `id` and [`data-nav`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) attributes.
2. Clear Navbar list, if exists; to start with empty Navbar list.
3. Create a `fragment` element using [`.createDocumentFragment()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment) function to append the created navbar list elements into it.
4. Loop through the collected data to create `li` elements; and set each `innerHTML` value to a specific `a` element; then append this `li` element to `fragment`.
5. Append the created  `fragment` to Navbar after adding all desired `li` elements to it.

### 2. Section Active State
It shows which section is being viewed while scrolling through the page. The `document` object has an `event listener` which is listening for `scroll` events. While scrolling, the following actions are performed:  
1. Obtain ALL displayed sections into single array to manipulate them easily.
2. Get the `top` value of current viewport using [`.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) function.
3. Loop through all sections to check if the current section passes specific conditions. 
4. if true, Set the current section to `active` via manipulating its `classList`.


### 3. Scroll to Anchor
When clicking an item from the navigation menu, the link should scroll smoothly to the appropriate section.  
Navigation menu has an `event listener` which is listening for `click` events. When clicked, the following actions are performed:  
1. Prevent the default action; By using [`.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) function.
2. Set the `scroll behavior` to `smooth`.
3. Check if an appropriate element is clicked; By checking its `href` value.
4. if it's an appropriate element, then use [`.scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) function to scroll into the appropriate section.


## Additional Features
[(Back to top)](#table-of-contents)
### 1. Navbar Active State
By highlighting the navbar link to the appropriate section, It shows which section is being viewed while scrolling through the page. The `document` object has an `event listener` which is listening for `scroll` events. While scrolling, the following actions are performed:  
*NOTE:* Using the same algorithm explained previously at [Section Active State](#section-active-state).  
1. Obtain ALL displayed sections into single array to manipulate them easily.
2. Get the `top` value of current viewport using [`.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) function.
3. Loop through all sections to check if the current section passes specific conditions.
4. if true, extract the navbar list item of the current section.
5. Set this list item to `active` via manipulating its `classList`.

### 2. Hide Navbar while NOT Scrolling
*NOTE: The idea behind this implementation is formulated after reading this great post:  
[Detecting when a visitor has stopped scrolling with vanilla JavaScript](https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/).*  
The `document` object has an `event listener` which is listening for `scroll` events. While scrolling, the following actions are performed:  
1. Clear the `global` scrolling timeout ID using [`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) function.
2. Remove a specific class, `hide`, from navbar `classList` which will show the navbar.
3. Set the `global` scrolling timeout ID using [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) function.
4. The `setTimeout()` function will execute a specific function after a desired period of time, `HIDE_TIMEOUT`, which will Add the class `hide` to navbar `classList`.

### 3. Add New Section
The `Add Section` button has a list of `event listeners`, each is listening to a specific `event` as following:  
- `pointerenter` event: Show the button's text, which is `Add Section`, with some transition appearance.
- `pointerleave` event: Hide the button's text.
- `click` event:
  1. Get the `main` element and ALL the displayed sections inside it.
  2. Obtain the last section data, `id` and [`data-nav`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) attributes, if there is ANY section; if NOT, Create a virtual section with `id='section0'` and `data-nav='Section 0'` to continue the next step without any errors.
  3. Update the last section's collected data by increasing its values by 1.
  4. Create a new `section` element then set the new `id` and `data-nav` attributes to it.
  5. Set the `innerHTML` value of this new `section` element to a specific value `Lorem ipsum`.
  6. Append this new section to the `main` element.

### 4. Delete Last Section
The `Delete Section` button has a list of `event listeners`, each is listening to a specific `event` as following:  
- `pointerenter` event: Show the button's text, which is `Delete Section`, with some transition appearance.
- `pointerleave` event: Hide the button's text.
- `click` event:
    1. Get ALL the displayed sections inside the `main` element.
    2. Check the number of the obtained sections; As you may want to leave the page with a specific/minimum number of sections displayed on it, this number is set through the `MIN_SECTION_THRESHOLD` global variable.
    3. Remove the last `section` from the `main` element.

### 5. Go To Top
The `Go to Top` button has a list of `event listeners`, each is listening to a specific `event` as following:  
- `pointerenter` event: Show the button's text, which is `Go to Top`, with some transition appearance.
- `pointerleave` event: Hide the button's text.
- `click` event:
    1. Set `(x, y)`, also known as `(left, top)`, to `(0, 0)`.
    2. Set the `scroll behavior` to `smooth`.
    3. use [`.scrollTo()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo) function to scroll to the appropriate position, which is the start of the window.

