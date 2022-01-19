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

const HIDE_TIMEOUT = 2*1000;    // delay before hiding the page navigation bar
const Y_FACTOR = 0.25;      // to sense the section before reaching it specifically
const MIN_SECTION_THRESHOLD = 0;  // minimum number of displayed sections
const navBarMenu = document.querySelector('.navbar__menu');     // get <ul> element by its class name

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// collect (data-nav) value from each section
 function collectDataFromSections(){
    let sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    let sectionsDataList = [];
    let sectionsIdList = [];
    // extract (data-nav) attribute value, then add it into the returned list:
    sectionsList.forEach(function(singleSection){
        sectionsDataList.push(singleSection.getAttribute('data-nav'));
        sectionsIdList.push(singleSection.getAttribute('id'));
    });
    return [sectionsDataList, sectionsIdList];
}

// update the status of active (section)
function updateActiveClass(sectionInViewport){
    let sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    sectionInViewport.classList.add('active__section');       // add ('active__section') class
    // remove ('active__section') class from other sections:
    for (let j=0; j<sectionsList.length; j++){
        if (sectionsList[j] !== sectionInViewport && sectionsList[j].classList.contains('active__section')){
            sectionsList[j].classList.remove('active__section')
        }
    }
}

// update the status of active (navigation list item)
function updateActiveLinkClass(listItem){
    let linksList = navBarMenu.querySelectorAll('li a');
    listItem.classList.add('active__menu__link');       // add ('active__menu__link') class
    // remove ('active__menu__link') class from other sections:
    for (let j=0; j<linksList.length; j++){
        if (linksList[j] !== listItem && linksList[j].classList.contains('active__menu__link')){
            linksList[j].classList.remove('active__menu__link');
        }
    }
}

 // clear first navigation list item when scrolling above it
function clearNavigationActiveStatus(){
    let sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    // current scroll position in viewport:
    let scrollPosition = -1*document.documentElement.getBoundingClientRect().top;
    // select first section and its associated navigation list item:
    let section = sectionsList[0];
    let listItem = navBarMenu.querySelector(`li a[href="#${section.getAttribute('id')}"]`);

    // required conditions for specific section to be in viewport:
    let condition = (scrollPosition < section.offsetTop - section.offsetHeight*Y_FACTOR);

    if (condition){
        // check if that specific navigation list item DO have ('active__menu__link') class:
        if (listItem.classList.contains('active__menu__link')){
            listItem.classList.remove('active__menu__link');
        }
    }
}

// show the button and its text:
function showButton(btnElement, btnTextElement){
    if (btnElement.classList.contains('hide__btn__text__container')){
        // show the button:
        btnElement.classList.remove('hide__btn__text__container');
        btnElement.classList.add('btn__text__container');

        // show the button text:
        btnTextElement.classList.remove('hide__btn__text');
        btnTextElement.classList.add('btn__text');
    }
}

// hide the button and its text:
function hideButton(btnElement, btnTextElement){
    if (btnElement.classList.contains('btn__text__container')){
        // hide the button:
        btnElement.classList.remove('btn__text__container');
        btnElement.classList.add('hide__btn__text__container');

        // hide the button text:
        btnTextElement.classList.remove('btn__text');
        btnTextElement.classList.add('hide__btn__text');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar(){
    // collect (data-nav) attributes from page sections:
    let sectionsDataList, sectionsIdList;
    [sectionsDataList, sectionsIdList] = collectDataFromSections();

    // get <nav> element by its id:
    let navBarList = document.querySelector('#navbar__list');
    // clear <nav> list items:
    while (navBarList.children.length !== 0){
        navBarList.firstChild.remove();
    }

    // create virtual element:
    let fragment = document.createDocumentFragment();
    // construct <li> element for each section:
    for (let i=0; i<sectionsDataList.length; i++){
        let singleListItem = document.createElement('li');      // create empty <li> element
        // singleListItem.textContent = sectionsDataList[i]; //set its textContent value
        singleListItem.innerHTML = `<a href="#${sectionsIdList[i]}" class="menu__link">${sectionsDataList[i]}</a>`; //set its textContent value
        fragment.appendChild(singleListItem);       // append actual <li> element to virtual element
    }
    // append virtual element to actual <ul>:
    navBarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function sectionInViewport(){
    let sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    // current scroll position in viewport:
    let scrollPosition = -1*document.documentElement.getBoundingClientRect().top;
    // check each section on the page:
    for (let i=0; i<sectionsList.length; i++){
        let section = sectionsList[i];      // select specific section
        // select navigation list item associated with this specific section
        let listItem = navBarMenu.querySelector(`li a[href="#${section.getAttribute('id')}"]`);

        // required conditions for specific section to be in viewport:
        let condition = (scrollPosition >= section.offsetTop - section.offsetHeight*Y_FACTOR) &&
        (scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*Y_FACTOR);

        if (condition){
            // check if that specific section do NOT have ('active__section') class:
            //          OR: that specific navigation list item do NOT have ('active__menu__link') class:
            if (!section.classList.contains('active__section') || !listItem.classList.contains('active__menu__link')){
                updateActiveClass(section);         // update sections status
                updateActiveLinkClass(listItem);    // update navigation items status
            }
        }
    }

    // clear active status from the first navigation element:
    clearNavigationActiveStatus();
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(event){
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
    if (selectedElement !== null){      // it's one of the <li> items
        selectedElement.scrollIntoView(scrollOptions);   // scroll into desired view:
    }
}

// add new section at the bottom of the page:
function addNewSection(){
    // get <main> and last <section> elements:
    let mainSection = document.querySelector('main');

    // check number of sections displayed:
    let mainSections = document.querySelectorAll('main section');
    let lastSectionData = {};   // data to be added to new section

    // if there is NO displayed sections:
    if (mainSections.length === 0){
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

    // create new <section> element:
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

// delete the last section at the bottom of the page:
function deleteLastSection(){
    // get <main> and last <section> elements:
    let mainSections = document.querySelectorAll('main section');
    // check number of sections againist specific threshold:
    if (mainSections.length > MIN_SECTION_THRESHOLD){
        // delete last <section> element:
        mainSections[mainSections.length-1].remove();
    }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', buildNavBar);     // wait until content is loaded into DOM

// Scroll to section on link click
navBarMenu.addEventListener('click', scrollToAnchor);           // add scrolling behavior to the clicked <li> item

let isScrolling = null;
// Set sections as active
document.addEventListener('scroll', function(){
    // elements that will be manipulated while (scrolling) and (no Scrolling):
    let navBarMenu = document.querySelector('.navbar__menu');
    let pageHeader = document.querySelector('.page__header');

    // clear timeout when scrolling again:
    clearTimeout(isScrolling);

    // show (navbar__menu) and (page__header):
    if (navBarMenu.classList.contains('hide')){
        navBarMenu.classList.remove('hide');
        pageHeader.classList.remove('hide');
    }

    // listen to (scoll) to change (active__section, active__menu__link) classes
    sectionInViewport();

    // set timeout when scroll has stopped:
    isScrolling = setTimeout(function(){
        // hide (navbar__menu) and (page__header):
        if (!navBarMenu.classList.contains('hide')){
            navBarMenu.classList.add('hide');
            pageHeader.classList.add('hide');
        }

    }, HIDE_TIMEOUT);   // (HIDE_TIMEOUT) is set at the beggining of the file
});


// motion of the side button:
let btnContainers = document.querySelectorAll('.btn__container');
let btnMain = document.querySelectorAll('.hide__btn__text__container');
let btnText = document.querySelectorAll('.hide__btn__text');

for (let i=0; i<btnContainers.length; i++){
    // add events for pointer entering the button container:
    btnContainers[i].addEventListener('pointerenter', function(){
        showButton(btnMain[i], btnText[i]);
    });

    // add events for pointer leaving the button container:
    btnContainers[i].addEventListener('pointerleave', function(){
        hideButton(btnMain[i], btnText[i]);
    });
}


for (let i=0; i<btnContainers.length; i++){
    btnContainers[i].addEventListener('click', function(){
        switch (i){
            case 0:     // add new section
                addNewSection();
                break;
            case 1:     // delete last section
                deleteLastSection();
                break;
            default:
                console.log("out-of-range function");
        }

        // update the navigation bar:
        buildNavBar();
    });
}