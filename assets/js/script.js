'use strict';



// element toggle function
const elementToggleFunc = function(elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");

select.addEventListener("click", function() { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValue) {

    for (let i = 0; i < filterItems.length; i++) {

        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }

    }

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function() {

        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }

    });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {
        const clickedLink = this;

        for (let j = 0; j < pages.length; j++) {
            if (clickedLink.innerHTML.toLowerCase() === pages[j].dataset.page) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }

    });
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('[data-form-btn]');
        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;

        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        // Send email using EmailJS
        emailjs.sendForm('service_tb3m5yu', 'template_956z1nb', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Show success message
                btnText.textContent = 'Message Sent!';
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(function() {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);

                alert('Your message has been sent successfully!');
            }, function(error) {
                console.log('FAILED...', error);

                // Show error message
                btnText.textContent = 'Failed to send';

                // Reset button after 3 seconds
                setTimeout(function() {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);

                alert('Failed to send message. Please try again.');
            });
    });
}