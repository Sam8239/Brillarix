gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function setActiveLink() {
        let scrollPosition = window.scrollY;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));

            if (
                section.offsetTop - 100 <= scrollPosition &&
                section.offsetTop + section.offsetHeight - 100 > scrollPosition
            ) {
                navLinks.forEach(nav => nav.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);

    // Optional: Handle click to smoothly scroll and set active class
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll(".nav-link");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });
});


// Section Animations
gsap.utils.toArray('section').forEach((section) => {
    let headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        }
    });

    headerTimeline
        .from(section.querySelector('.section-tag'), {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: 'power3.out'
        })
        .from(section.querySelector('.section-title'), {
            opacity: 0,
            y: -40,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from(section.querySelector('.section-subtitle'), {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');
});

gsap.utils.toArray('.decoration.decoration-3').forEach((decoration) => {
    gsap.to(decoration, {
        scrollTrigger: {
            trigger: '.about-section',
            start: '-=200',
            end: 'bottom bottom',
            scrub: 1.5,
            markers: false,
            toggleActions: 'play none none reverse',
        },
        y: 150,
        ease: 'power1.inOut',
        duration: 1,
    });
});




// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 0,
        rotateX: 15,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// 3D hover effect for cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xRotation = ((y - rect.height / 2) / rect.height) * 10;
        const yRotation = ((x - rect.width / 2) / rect.width) * 10;

        gsap.to(card, {
            rotateX: -xRotation,
            rotateY: yRotation,
            duration: 0.5,
            ease: 'power2.out',
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

// Process Starts
gsap.from(".step-container", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".process-section",
        start: "top 30%",
        toggleActions: "play none none reverse",
    }
});

gsap.from(".step-line", {
    scaleY: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".process-section",
        start: "top 30%",
        toggleActions: "play none none reverse",
    }
});

// Process Ends

// Rocket Animation
const rocket = document.getElementById("rocket");
if (!rocket) {
    console.error('Rocket element not found.');
}

let lastScrollTop = 0;
let scrollTicking = false;

const animateRocketUp = () => {
    const rocketTop = rocket.getBoundingClientRect().top;
    const moveDistance = rocketTop - 80;

    // launchConfetti();

    gsap.to(rocket, {
        y: -moveDistance,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: scrollToNextSection
    });
};

const animateRocketDown = () => {
    gsap.to(rocket, { y: 0, duration: 2, ease: "power2.inOut" });
};

const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
};

// const launchConfetti = () => {
//     const duration = 1500; // Duration in milliseconds
//     const endTime = Date.now() + duration;

//     const frame = () => {
//         confetti({
//             particleCount: 5,
//             angle: 60,
//             spread: 55,
//             origin: { x: 0 }
//         });

//         confetti({
//             particleCount: 5,
//             angle: 120,
//             spread: 55,
//             origin: { x: 1 }
//         });

//         if (Date.now() < endTime) {
//             requestAnimationFrame(frame);
//         }
//     };

//     requestAnimationFrame(frame);
// };

// Start the upward animation on rocket click
rocket.addEventListener("click", animateRocketUp);

// Optimize scroll events using requestAnimationFrame to throttle updates
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            if (scrollTop < lastScrollTop) {
                animateRocketDown();
            }
            lastScrollTop = scrollTop < 0 ? 0 : scrollTop;
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Rocket shake animation using GSAP
let shakeTween = null;

const shakeRocket = () => {
    if (shakeTween && shakeTween.isActive()) return;

    const tl = gsap.timeline();
    tl.to(rocket, {
        x: "-=2",
        rotation: "-=2",
        duration: 0.15,
        ease: "sine.in"
    })
        .to(rocket, {
            x: "+=2",
            rotation: "+=2",
            duration: 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }, 0);

    shakeTween = tl;
};


const stopShake = () => {
    if (shakeTween) {
        shakeTween.kill();
        shakeTween = null;
    }
    gsap.to(rocket, { x: 0, rotation: 0, duration: 0.2 });
};

// Add mouse events for the shake effect
rocket.addEventListener('mouseenter', shakeRocket);
rocket.addEventListener('mouseleave', stopShake);

// Tools Starts
gsap.fromTo(".tool-item",
    { opacity: 0, x: 100 }, // Start position (right side)
    {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: {
            amount: 1,
            grid: "auto",
            from: "start"
        },
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".tools-section",
            start: "top 50%",
            toggleActions: "play none none none"
        }
    }
);

gsap.fromTo(".more-tools",
    { opacity: 0, x: 100 },
    {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".tools-section",
            start: "top 50%",
            toggleActions: "play none none none"
        }
    }
);

// Hover animations for tool circles
document.querySelectorAll('.tool-circle').forEach(circle => {
    circle.addEventListener('mouseenter', () => {
        gsap.to(circle, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    circle.addEventListener('mouseleave', () => {
        gsap.to(circle, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
// Tools Ends

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".blur-container");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scroll");
        } else {
            navbar.classList.remove("navbar-scroll");
        }
    });
});


$(document).ready(function () {
    var slider = $(".testimonials-carousel");
    slider.owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        items: 1,
        center: true,
        nav: false,
        margin: 10,
        dots: true,
        loop: true,
        smartSpeed: 2000,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 2 },
            991: { items: 3 },
            1200: { items: 5 }
        },
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
    });
});


document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const form = document.querySelector(".contact-form");

    // GSAP animations with ScrollTrigger
    gsap.from(".contact-form", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%", // Adjust start position
            toggleActions: "play none none none" // Play once when in view
        }
    });

    gsap.from(".form-group", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".submit-btn", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});


gsap.from(".footer-column", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.5
});


$(document).ready(function () {
    var slider2 = $(".works-carousel");
    slider2.owlCarousel({
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        items: 1,
        center: true,
        nav: false,
        margin: 10,
        dots: true,
        loop: true,
        smartSpeed: 2000,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 2 },
            991: { items: 3 },
            1200: { items: 3 }
        },
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        slideTransition: "ease-in-out",
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        rtl: true,
        onTranslated: function () {
            $(".work-card video").each(function () {
                this.pause();
                this.currentTime = 0;
            });

            $(".owl-item.active.center .work-card video").each(function () {
                this.play();
            });
        }
    });
});



