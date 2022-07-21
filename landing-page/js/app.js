
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
 * Define Global Variables
 * 
*/

// get all sections
let sections = document.querySelectorAll("section");
let navList = document.querySelector("#navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// check if section is in viewport.
function isElementInViewPort(element) {
    const rect = element.getBoundingClientRect();
    // safety margin.
    const safeArea = window.innerHeight * 0.5;

    return (
        rect.top + safeArea >= 0 &&
        rect.left + safeArea >= 0 &&
        rect.bottom - safeArea <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - safeArea <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// scroll to section called on nav item click.
function scrollToSection(e) {
    // prevent default behaviour of link
    e.preventDefault();

    let section = this.getAttribute("href");

    document.querySelector(section).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

// create fragment to store nav items.
let fragment = document.createDocumentFragment();

// loop through sections and create nav items
sections.forEach(element => {
    let navItem = document.createElement("li");
    let link = document.createElement("a");

    navItem.className = "navbar__menu";
    link.classList.add("menu__link");

    link.setAttribute("href", "#" + element.id);

    link.textContent = element.dataset.nav;

    // add event listener to link
    link.addEventListener("click", scrollToSection);

    navItem.appendChild(link);
    fragment.append(navItem);
});

// append fragment to navList
navList.appendChild(fragment);



//Add class 'active' to section when near top of viewport

window.addEventListener('scroll', function () {
    let activeSection;
    sections.forEach(element => {
        if (element.classList.contains("your-active-class")) {
            element.classList.remove("your-active-class");
        }
        if (document.querySelector(`a[href='#${element.id}']`).classList.contains("active__link")) {
            // Removing active class from the previous nav link
            document.querySelector(`a[href='#${element.id}']`).classList.remove("active__link");
        }

        if (isElementInViewPort(element)) {
            activeSection = element;
        }
    });

    // Apply active class to the current section in the viewport.
    activeSection.classList.add("your-active-class");
    // Applying active class to the current nav link
    document.querySelector(`a[href='#${activeSection.id}']`).classList.add("active__link");
});