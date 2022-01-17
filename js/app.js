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

const sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
let sectionsIdList = [];    // create empty list to collect (id) attributes
let sectionsDataList = [];  // create empty list to collect (data-nav) attributes
const Y_FACTOR = 0.25;      // to sense the section before reaching it specifically

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
        // required conditions for specific section to be in viewport:
        let condition = (scrollPosition >= section.offsetTop - section.offsetHeight*Y_FACTOR) &&
                        (scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*Y_FACTOR);

        if (condition){
                // check if that specific section do NOT have ('active__section') class:
                if (!section.classList.contains('active__section')){
                    updateActiveClass(section);
                }
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', buildNavBar);     // wait until content is loaded into DOM

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', sectionInViewport);     // listen to (scoll) to change (active__section) class
