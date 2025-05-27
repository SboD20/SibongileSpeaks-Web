document.addEventListener("DOMContentLoaded", () => {
    app.init();
});
var app = {
    init() {
        var links = document.querySelectorAll("nav a");
        
        links.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                var targetId = link.getAttribute("href").substring(1);
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    links.forEach(navLink => navLink.classList.remove("active"));
                    link.classList.add("active");
                } else {
                    console.warn(`Element with ID '${targetId}' not found.`);
                }
            });
        });

        var lazyImages = document.querySelectorAll("img[data-src]");
        if ("IntersectionObserver" in window) {
            var imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.getAttribute("data-src");
                        img.removeAttribute("data-src");
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: "50px" });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            lazyImages.forEach(img => {
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            });
        }

        var header = document.getElementById("header");
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }
};
