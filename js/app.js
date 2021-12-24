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
let unorderdList = document.querySelector("ul");
const sections = document.querySelectorAll("section");
let fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * 
*/

// build the nav
for (const section of sections) {
    let list = document.createElement("li");
    let anchor = document.createElement("a");
    anchor.innerText = section.dataset.nav;
    anchor.href = "#" + section.id;
    anchor.id = section.id
    list.appendChild(anchor);
    fragment.appendChild(list);
}
unorderdList.appendChild(fragment);
let allanch = document.querySelectorAll("a")


// Add class 'active' to section when near top of viewport

//using intersection observer to know when section on viewport
const observerOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            for (let section of sections) {
                section.classList.remove('your-active-class');
            }
            entry.target.classList.add('your-active-class');//add active class to the section
            observer.unobserve(entry.target);
            for (let anchor of allanch) {
                if (entry.target.id == anchor.id) {
                    anchor.classList.add("item-active-class")//add active class to the navitem
                } else {
                    anchor.classList.remove("item-active-class")
                }
            }
        }

    });
}, observerOptions);

//adding active class to the section and the navitem when section on the viewport

function toggleActiveState() {
    for (let section of sections) {
        observer.observe(section);
    }

}

// Scroll to anchor ID using scrollTO event

//Scroliing to the targted section by ID
function scrollToSection(event) {
    event.preventDefault()
    for (const section of sections) {
        if (section.id == event.target.id) {
            section.scrollIntoView({ behavior: "smooth", block: "center" },)
        }

    }
}

/**
 * Begin Events
 *
*/

window.addEventListener('scroll', toggleActiveState);//add active class to the section on viewport
document.querySelectorAll("a").forEach(element => { element.addEventListener("click", scrollToSection) });//add active class to navitem when click on it

/**
 * End Events
 *
*/



