/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/

// Delay before hiding the page navigation bar:
const HIDE_TIMEOUT = 2*1000;

// Used to sense the section before reaching it specifically:
const Y_FACTOR = 0.25;

// Set minimum number of displayed sections:
const MIN_SECTION_THRESHOLD = 0;

// Get <ul> element by its class name
const navBarMenu = document.querySelector('.navbar__menu');

// Used for detecting scrolling event:
let isScrolling = null;

// Used to mainpulate buttons:
let btnContainers = document.querySelectorAll('.btn__container');
let btnMain = document.querySelectorAll('.hide__btn__text__container');
let btnText = document.querySelectorAll('.hide__btn__text');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
* @description Collect (data-nav) value from each section
* @returns {object} collected data
*/
 function collectDataFromSections() {
     // get all <section> elements by name:
    let sectionsList = document.querySelectorAll('section');

    // initialize final resutls:
    let sectionsDataList = [];
    let sectionsIdList = [];

    // extract (data-nav) attribute value, then add it into the returned list:
    sectionsList.forEach(function(singleSection) {
        sectionsDataList.push(singleSection.getAttribute('data-nav'));
        sectionsIdList.push(singleSection.getAttribute('id'));
    });

    return [sectionsDataList, sectionsIdList];
}


/**
* @description Update the status of active (section)
* @param {object} sectionInViewport
*/
function updateActiveClass(sectionInViewport) {
    // get all <section> elements by name:
    let sectionsList = document.querySelectorAll('section');

    // add ('active__section') class:
    sectionInViewport.classList.add('active__section');

    // remove ('active__section') class from other sections:
    for (let j=0; j<sectionsList.length; j++) {
        if (sectionsList[j] !== sectionInViewport && sectionsList[j].classList.contains('active__section')) {
            sectionsList[j].classList.remove('active__section')
        }
    }
}


/**
* @description Update the status of active (navigation list item)
* @param {object} listItem
*/
function updateActiveLinkClass(listItem) {
    // get all <a> elements inside <li> elements by name:
    let linksList = navBarMenu.querySelectorAll('li a');

    // add ('active__menu__link') class:
    listItem.classList.add('active__menu__link');

    // remove ('active__menu__link') class from other sections:
    for (let j=0; j<linksList.length; j++) {
        if (linksList[j] !== listItem && linksList[j].classList.contains('active__menu__link')) {
            linksList[j].classList.remove('active__menu__link');
        }
    }
}


/**
* @description Clear first navigation list item when scrolling above it
*/
function clearNavigationActiveStatus() {
    // get all <section> elements by name:
    let sectionsList = document.querySelectorAll('section');

    // current scroll position in viewport:
    let scrollPosition = -1*document.documentElement.getBoundingClientRect().top;

    // select first section and its associated navigation list item:
    let section = sectionsList[0];
    let listItem = navBarMenu.querySelector(`li a[href="#${section.getAttribute('id')}"]`);

    // required conditions for specific section to be in viewport:
    let condition = (scrollPosition < section.offsetTop - section.offsetHeight*Y_FACTOR);

    // check the result obtained from the constructed condition:
    if (condition) {
        // check if that specific navigation list item DO have ('active__menu__link') class:
        if (listItem.classList.contains('active__menu__link')) {
            listItem.classList.remove('active__menu__link');
        }
    }
}


/**
* @description Show the button and its text
* @param {object} btnElement
* @param {object} btnTextElement
*/
function showButton(btnElement, btnTextElement) {
    // check the button to see if it's hidden/collapsed:
    if (btnElement.classList.contains('hide__btn__text__container')) {
        // show the button:
        btnElement.classList.remove('hide__btn__text__container');
        btnElement.classList.add('btn__text__container');

        // show the button text:
        btnTextElement.classList.remove('hide__btn__text');
        btnTextElement.classList.add('btn__text');
    }
}


/**
* @description Hide the button and its text
* @param {object} btnElement
* @param {object} btnTextElement
*/
function hideButton(btnElement, btnTextElement) {
    // check the button to see if it's shown:
    if (btnElement.classList.contains('btn__text__container')) {
        // hide the button:
        btnElement.classList.remove('btn__text__container');
        btnElement.classList.add('hide__btn__text__container');

        // hide the button text:
        btnTextElement.classList.remove('btn__text');
        btnTextElement.classList.add('hide__btn__text');
    }
}


/**
* @description Check scrolling event to set sections as active if scrolling
*                OR: to hide navigation bar if not scrolling for a while
*/
function checkScrolling() {
    // elements that will be manipulated while (scrolling) and (no Scrolling):
    let navBarMenu = document.querySelector('.navbar__menu');
    let pageHeader = document.querySelector('.page__header');

    // clear timeout when scrolling again:
    clearTimeout(isScrolling);

    // show (navbar__menu) and (page__header):
    if (navBarMenu.classList.contains('hide')) {
        navBarMenu.classList.remove('hide');
        pageHeader.classList.remove('hide');
    }

    // listen to (scoll) to change (active__section, active__menu__link) classes:
    sectionInViewport();

    // set timeout when scroll has stopped:
    isScrolling = setTimeout(function() {
        // hide (navbar__menu) and (page__header):
        if (!navBarMenu.classList.contains('hide')) {
            navBarMenu.classList.add('hide');
            pageHeader.classList.add('hide');
        }
    }, HIDE_TIMEOUT);   // (HIDE_TIMEOUT) is set at the beggining of the file
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
* @description Build the navigation bar
*/
function buildNavBar() {
    // collect (data-nav) attributes from page sections:
    let sectionsDataList, sectionsIdList;
    [sectionsDataList, sectionsIdList] = collectDataFromSections();

    // get <nav> element by its id:
    let navBarList = document.querySelector('#navbar__list');

    // clear <nav> list items:
    while (navBarList.children.length !== 0) {
        navBarList.firstChild.remove();
    }

    // create virtual element:
    let fragment = document.createDocumentFragment();

    // construct <li> element for each section:
    for (let i=0; i<sectionsDataList.length; i++) {
        // create empty <li> element:
        let singleListItem = document.createElement('li');

        //set its innerHTML value:
        singleListItem.innerHTML = `<a href="#${sectionsIdList[i]}" class="menu__link">${sectionsDataList[i]}</a>`;

        // append actual <li> element to virtual element:
        fragment.appendChild(singleListItem);
    }

    // append virtual element to actual <ul>:
    navBarList.appendChild(fragment);
}


/**
* @description Add class 'active' to section when near top of viewport
*/
function sectionInViewport() {
    // get all <section> elements by name:
    let sectionsList = document.querySelectorAll('section');

    // current scroll position in viewport:
    let scrollPosition = -1*document.documentElement.getBoundingClientRect().top;

    // check each section on the page:
    for (let i=0; i<sectionsList.length; i++) {
        // select specific section:
        let section = sectionsList[i];

        // select navigation list item associated with this specific section:
        let listItem = navBarMenu.querySelector(`li a[href="#${section.getAttribute('id')}"]`);

        // required conditions for specific section to be in viewport:
        let condition = (scrollPosition >= section.offsetTop - section.offsetHeight*Y_FACTOR) &&
        (scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*Y_FACTOR);

        // check the result obtained from the constructed condition:
        if (condition) {
            // check if that specific section do NOT have ('active__section') class:
            //          OR: that specific navigation list item do NOT have ('active__menu__link') class:
            if (!section.classList.contains('active__section') || !listItem.classList.contains('active__menu__link')) {
                // update sections status:
                updateActiveClass(section);

                // update navigation items status:
                updateActiveLinkClass(listItem);
            }
        }
    }

    // clear active status from the first navigation element:
    clearNavigationActiveStatus();
}


/**
* @description Scroll to anchor ID using scrollTO event
* @param {object} event
*/
function scrollToAnchor(event) {
    // prevent default scrollong behavior:
    event.preventDefault();

    // construct the scrolling behavior options:
    const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    };

    // get (href) attribute value from the clicked <li> item:
    const selectedElement = document.querySelector(event.target.getAttribute('href'));

    // check if clicked item already has a (href) attribute; to prevent (Uncaught TypeError) errors:
    // true if it's one of the <li> items:
    if (selectedElement !== null) {
        selectedElement.scrollIntoView(scrollOptions);   // scroll into desired view:
    }
}


/**
* @description Add new section at the bottom of the page
*/
function addNewSection() {
    // get <main> and last <section> elements:
    let mainSection = document.querySelector('main');

    // check number of sections displayed:
    let mainSections = document.querySelectorAll('main section');

    // data to be added to new section:
    let lastSectionData = {};

    // if there is NO displayed sections:
    if (mainSections.length === 0) {
        lastSectionData = {
            'id': 'section0',
            'data-nav': 'Section 0'
        };
    }
    else{
        // get last <section> data into single object:
        let lastSection = mainSection.lastElementChild;
        lastSectionData = {
            'id': lastSection.getAttribute('id'),
            'data-nav': lastSection.getAttribute('data-nav')
        };
    }

    // manipulate last <section> data to create new <section> data:
    let newDataNav = lastSectionData['data-nav'].split(' ');

    // create new (id) and (data-nav) values through increasing old ones by 1:
    let newSectionData = {
        'id': [newDataNav[0].toLowerCase(), Number(newDataNav[1])+1].join(''),
        'data-nav': [newDataNav[0], Number(newDataNav[1])+1].join(' ')
    };

    // create new <section> element with new (id) and (data-nav) attribute values:
    let newSection = document.createElement('section');
    newSection.setAttribute('id', newSectionData['id']);
    newSection.setAttribute('data-nav', newSectionData['data-nav']);

    // set new <section> innerHTML value:
    newSection.innerHTML = `
        <div class="landing__container">
            <h2>${newSectionData['data-nav']}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>`;

    // append new <section> element to <main> element:
    mainSection.appendChild(newSection);
}


/**
* @description Delete the last section at the bottom of the page
*/
function deleteLastSection() {
    // get <main> and last <section> elements:
    let mainSections = document.querySelectorAll('main section');

    // check number of sections againist specific threshold:
    if (mainSections.length > MIN_SECTION_THRESHOLD) {
        // delete last <section> element:
        mainSections[mainSections.length-1].remove();
    }
}


/**
* @description Scroll to the page's beginning
*/
function scrollToTop() {
    // set scroll options:
    const scrollOptions = {
        top: '0',
        left: '0',
        behavior: 'smooth'
    };

    // scroll <body> element to specified options:
    window.scrollTo(scrollOptions);
}


/**
* @description Show/Hide (Go to Top) button at specific height
*/
function DisplayGoToTopButton() {
    // get the button by its id:
    let btnGoToTop = document.querySelector('#go__to__top');

    // current scroll position in viewport:
    let scrollPosition = -1*document.documentElement.getBoundingClientRect().top;

    // check the displayed height of the current viewport:
    //      to show the button if it's hidden:
    if (scrollPosition > screen.height) {
        if (btnGoToTop.classList.contains('hide__btn__container')) {
            btnGoToTop.classList.remove('hide__btn__container');
            btnGoToTop.classList.add('btn__container');
        }
    }
    else {
        // hide the shown button if the displayed height is less than the current viewport:
        if (btnGoToTop.classList.contains('btn__container')) {
        btnGoToTop.classList.remove('btn__container');
        btnGoToTop.classList.add('hide__btn__container');
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu:
//      Wait until content is loaded into DOM:
document.addEventListener('DOMContentLoaded', buildNavBar);


// Scroll to section on link click:
//      Add scrolling behavior to the clicked <li> item:
navBarMenu.addEventListener('click', scrollToAnchor);


// Check scrolling and Set sections as active:
document.addEventListener('scroll', checkScrolling);


// Loop to add motion to the side buttons:
//      Pointer enter/leave events:
for (let i=0; i<btnContainers.length; i++) {
    // add events for pointer entering the button container:
    btnContainers[i].addEventListener('pointerenter', function() {
        showButton(btnMain[i], btnText[i]);
    });

    // add events for pointer leaving the button container:
    btnContainers[i].addEventListener('pointerleave', function() {
        hideButton(btnMain[i], btnText[i]);
    });
}


// Loop to add an event listeners functionality to each button:
for (let i=0; i<btnContainers.length; i++) {
    btnContainers[i].addEventListener('click', function() {
        if (btnContainers[i].getAttribute('id') === 'add__section') {
            // Add new section:
            addNewSection();
        }
        else if (btnContainers[i].getAttribute('id') === 'delete__section') {
            // Delete last section:
            deleteLastSection();
        }
        else if (btnContainers[i].getAttribute('id') === 'go__to__top') {
            // Scroll to top:
            scrollToTop();
        }
        else {
            // Just an error message for future upgrades:
            window.alert('You need to add this functionality first');
        }

        // update the navigation bar:
        buildNavBar();
    });
}


// Show/Hide (Go to Top) button at specific height:
document.addEventListener('scroll', DisplayGoToTopButton);
