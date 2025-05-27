document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const header = document.getElementById("header");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                link.classList.add("active");
            } else {
                console.warn(`Element with ID '${targetId}' not found.`);
            }
        });
    });

    // Lazy-load images with data-src
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "50px" });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }
});
