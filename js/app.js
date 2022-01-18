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

const HIDE_TIMEOUT = 3*1000;
const sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
let sectionsIdList = [];    // create empty list to collect (id) attributes
let sectionsDataList = [];  // create empty list to collect (data-nav) attributes
const Y_FACTOR = 0.25;      // to sense the section before reaching it specifically
const navBarMenu = document.querySelector('.navbar__menu');     // get <ul> element by its class name

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * collect (data-nav) value from each section
 */
 function collectDataFromSections(){
    // extract (data-nav) attribute value, then add it into the returned list:
    sectionsList.forEach(function(singleSection){
        sectionsDataList.push(singleSection.getAttribute('data-nav'));
        sectionsIdList.push(singleSection.getAttribute('id'));
    });
}

/**
 * update the status of active (section)
 */
function updateActiveClass(sectionInViewport){
    sectionInViewport.classList.add('active__section');       // add ('active__section') class
    // remove ('active__section') class from other sections:
    for (let j=0; j<sectionsList.length; j++){
        if (sectionsList[j] !== sectionInViewport && sectionsList[j].classList.contains('active__section')){
            sectionsList[j].classList.remove('active__section')
        }
    }
}

/**
 * update the status of active (navigation list item)
 */
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

/**
 * clear first navigation list item when scrolling above it
 */
function clearNavigationActiveStatus(){
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

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar(){
    // collect (data-nav) attributes from page sections:
    collectDataFromSections();
    // get <nav> element by its id:
    let navBarList = document.querySelector('#navbar__list');
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
