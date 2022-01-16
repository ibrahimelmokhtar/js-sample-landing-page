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

let sectionsIdList = [];    // create empty list to collect (id) attributes
let sectionsDataList = [];  // create empty list to collect (data-nav) attributes


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * collect (data-nav) value from each section
 */
 function collectDataFromSections(){
    const sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    // extract (data-nav) attribute value, then add it into the returned list:
    sectionsList.forEach(function(singleSection){
        sectionsDataList.push(singleSection.getAttribute('data-nav'));
        sectionsIdList.push(singleSection.getAttribute('id'));
    });
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
