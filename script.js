document.addEventListener("DOMContentLoaded", () => {
    const scroller = document.querySelector("#scroller");
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("#side-nav .nav-link");
    const scrollCue = document.querySelector("#scroll-cue");

    if (!scroller || !sections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.toggle("active", link.dataset.target === id);
                    });

                    if (scrollCue) {
                        scrollCue.classList.toggle("hidden-cue", id !== "home");
                    }
                }
            });
        },
        {
            root: scroller,
            threshold: 0.55,
        }
    );

    sections.forEach((section) => observer.observe(section));

    setTimeout(() => {
        if (scrollCue && scroller.scrollTop < 50) {
            scrollCue.classList.add("visible");
        }
    }, 2000);
});
