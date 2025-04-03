document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const languageToggle = document.getElementById("language-toggle");
    const body = document.body;
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedLanguage = localStorage.getItem("language") || "en";
    
    body.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "Dark" : "Light";
    
    html.lang = savedLanguage;
    languageToggle.textContent = savedLanguage === "th/en" ? "th/en" : "th/en";

    themeToggle.addEventListener("click", () => {
        const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "Dark" : "Light";
        localStorage.setItem("theme", newTheme);
    });

    languageToggle.addEventListener("click", () => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("index-th.html")) {
            window.location.href = "index.html";
        } else {
            window.location.href = "index-th.html";
        }
    });
    
});


    // Smooth Scrolling Function
    function smoothScroll(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Handle all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScroll(targetElement);
            }
        });
    });

    // Image Slideshow
    const images = document.querySelectorAll('.profile-image');
    let currentImageIndex = 0;
    let slideshowInterval = null;
    
    function showImage(index) {
        // Hide all images
        images.forEach(image => {
            image.classList.remove('show');
        });
        
        // Show current image
        images[index].classList.add('show');
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }
    
    // Initialize slideshow if images exist
    if (images.length > 0) {
        showImage(currentImageIndex);
        
        // Set up the automatic slideshow
        slideshowInterval = setInterval(nextImage, 4000);
        
        // Optional: Pause slideshow on mouse hover
        const imageGallery = document.querySelector('.image-gallery');
        if (imageGallery) {
            imageGallery.addEventListener('mouseenter', () => {
                clearInterval(slideshowInterval);
            });
            
            imageGallery.addEventListener('mouseleave', () => {
                clearInterval(slideshowInterval); // Clear any existing interval first
                slideshowInterval = setInterval(nextImage, 4000);
            });
        }
    }
