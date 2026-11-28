document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContainer = document.getElementById('scroller');

    // Observer options: Trigger when 50% of the section is visible
    const options = {
        root: mainContainer,
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the link matching the current section ID
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[data-target="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

const scroller = document.querySelector("#scroller");
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("#side-nav .nav-link");
const scrollCue = document.querySelector("#scroll-cue");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.dataset.target === id);
                });

                if (scrollCue) {
                    if (id !== "home") {
                        scrollCue.classList.add("hidden-cue");
                    } else {
                        scrollCue.classList.remove("hidden-cue");
                    }
                }
            }
        });
    },
    {
        root: scroller,
        threshold: 0.6,
    }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (scrollCue && scroller.scrollTop < 50) {
            scrollCue.classList.add("visible");
        }
    }, 2000);
});


    // Start observing each section
    sections.forEach(section => {
        observer.observe(section);
    });
});
