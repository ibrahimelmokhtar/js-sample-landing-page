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


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * collect (data-nav) value from each section
 * @returns a list, of type (String), with sections' (data-nav) values
 */
 function collectDataFromSections(){
    const sectionsList = document.querySelectorAll('section');  // get all <section> elements by name
    let sectionsDataList = [];      // create empty list to be returned
    // extract (data-nav) attribute value, then add it into the returned list:
    sectionsList.forEach(function(singleSection){
        sectionsDataList.push(singleSection.getAttribute('data-nav'));
    });
    return sectionsDataList;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar(){
    // collect (data-nav) attributes from page sections:
    const sectionsDataList = collectDataFromSections();
    // get <nav> element by its id:
    let navBarList = document.querySelector('#navbar__list');
    // create virtual element:
    let fragment = document.createDocumentFragment();
    // construct <li> element for each section:
    for (let i=0; i<sectionsDataList.length; i++){
        let singleListItem = document.createElement('li');      // create empty <li> element
        singleListItem.textContent = sectionsDataList[i]; //set its textContent value
        fragment.appendChild(singleListItem);       // append actual <li> element to virtual element
        console.log(fragment.children);
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
