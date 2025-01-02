document.addEventListener('DOMContentLoaded', () => {
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

    const detailsButton = document.querySelector('#detailsButton');
    const detailsSection = document.querySelector('#details');

    if (detailsButton && detailsSection) {
        detailsButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(detailsSection);
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScroll(targetElement);
            }
        });
    });

    document.body.style.scrollBehavior = 'auto';
});

let images = document.querySelectorAll('.profile-image');
let currentImageIndex = 0;

function showImage(index) {
    images.forEach((image, i) => {
        image.classList.remove('show');
    });

    images[index].classList.add('show');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

showImage(currentImageIndex);

setInterval(nextImage, 3000);