document.addEventListener("DOMContentLoaded", () => {
    const scroller = document.querySelector("#scroller");
    const sections = Array.from(document.querySelectorAll("main section"));
    const navLinks = Array.from(document.querySelectorAll("#side-nav .nav-link"));
    const scrollCue = document.querySelector("#scroll-cue");
    const rootStyle = document.documentElement.style;

    if (!scroller || !sections.length) return;

    const categoryStyles = {
        cover: {
            text: "#111111",
            dotFill: "#111111",
            dotBorder: "#111111",
        },
        internship: {
            text: "#256d51",
            dotFill: "#49b68c",
            dotBorder: "#256d51",
        },
        research: {
            text: "#7b1e32",
            dotFill: "#7b1e32",
            dotBorder: "#7b1e32",
        },
        project: {
            text: "#8c465a",
            dotFill: "#c7798e",
            dotBorder: "#8c465a",
        },
    };

    function applyCategoryTheme(category) {
        const palette = categoryStyles[category] || categoryStyles.cover;
        rootStyle.setProperty("--active-color", palette.text);
        rootStyle.setProperty("--active-dot-fill", palette.dotFill);
        rootStyle.setProperty("--active-dot-border", palette.dotBorder);
    }

    function getCurrentSectionIndex() {
        const scrollTop = scroller.scrollTop;
        const height = scroller.clientHeight || window.innerHeight;
        const idx = Math.round(scrollTop / height);
        return Math.max(0, Math.min(sections.length - 1, idx));
    }

    function goToSection(index) {
        const clamped = Math.max(0, Math.min(sections.length - 1, index));
        const target = sections[clamped];
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    scroller.addEventListener("scroll", () => {
        if (!scrollCue) return;
        if (scroller.scrollTop > 12) {
            scrollCue.classList.add("instant-hide");
        } else {
            scrollCue.classList.remove("instant-hide");
        }
    }, { passive: true });

    scroller.addEventListener("click", (event) => {
        if (event.target.closest("a, button, #side-nav")) return;

        const zonePx = 1.5 * 96;
        const clickY = event.clientY;
        const viewportHeight = window.innerHeight;
        const currentIndex = getCurrentSectionIndex();

        if (clickY <= zonePx && currentIndex > 0) {
            goToSection(currentIndex - 1);
        } else if (clickY >= viewportHeight - zonePx && currentIndex < sections.length - 1) {
            goToSection(currentIndex + 1);
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    const category = entry.target.dataset.category || "cover";

                    navLinks.forEach((link) => {
                        link.classList.toggle("active", link.dataset.target === id);
                    });

                    applyCategoryTheme(category);

                    if (scrollCue) {
                        scrollCue.classList.toggle("instant-hide", id !== "home");
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
        if (scrollCue && scroller.scrollTop <= 12) {
            scrollCue.classList.remove("instant-hide");
            scrollCue.classList.add("visible");
        }
    }, 2000);
});
