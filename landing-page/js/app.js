
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

// get all sections

var sections = document.querySelectorAll("section");
var navList = document.querySelector("#navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isElementInViewPort(element)
{
    const rect = element.getBoundingClientRect();
    const safeArea = window.innerHeight * 0.5;    
    
    return (
        rect.top+safeArea >= 0 &&
        rect.left+safeArea >= 0 &&
        rect.bottom - safeArea <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - safeArea <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

let fragment = document.createDocumentFragment();

sections.forEach(element => {
    let navItem = document.createElement("li");
    let link = document.createElement("a");

    navItem.className="navbar__menu";
    link.className = "menu__link";
    link.setAttribute("href", "#" + element.id);
    link.textContent = element.dataset.nav;

    navItem.appendChild(link);
    fragment.append(navItem);   
});
navList.appendChild(fragment);



//Add class 'active' to section when near top of viewport

window.addEventListener('scroll', function() {
    sections.forEach(element => {
        if(isElementInViewPort(element)){
        element.classList.add("your-active-class");
        }
        else{
            element.classList.remove("your-active-class");
        }
    }
    )
});