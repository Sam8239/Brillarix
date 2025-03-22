gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Navbar Starts
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(20px)";
            navbar.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.backdropFilter = "none";
            navbar.style.backgroundColor = "transparent";
        }
    });


    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function setActiveLink() {
        let scrollPosition = window.scrollY;
        let activeLink = null;

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("/")) return;

            const section = document.querySelector(href);
            if (!section) return;

            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeLink = link;
            }
        });

        if (activeLink) {
            navLinks.forEach(nav => nav.classList.remove("active"));
            activeLink.classList.add("active");
        }
    }


    window.addEventListener("scroll", setActiveLink);

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("/")) return;
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            targetElement?.scrollIntoView({ behavior: "smooth" });
        });
    });


    var navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });
});
// Navbar Ends

// Hero Starts
const rocket = document.getElementById("rocket");
if (rocket) {
    let lastScrollTop = 0;
    let scrollTicking = false;

    const animateRocketUp = () => {
        const rocketTop = rocket.getBoundingClientRect().top;
        const moveDistance = rocketTop - 200;


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

    rocket.addEventListener("click", animateRocketUp);

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

    rocket.addEventListener('mouseenter', shakeRocket);
    rocket.addEventListener('mouseleave', stopShake);

}
// Hero Ends

// Section Animations
gsap.utils.toArray('section').forEach((section) => {
    let headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
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

// Service Starts
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

// Service Ends

// Process Starts
// gsap.from(".step-container", {
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     stagger: 0.3,
//     ease: "power3.out",
//     scrollTrigger: {
//         trigger: ".process-section",
//         start: "top 30%",
//         toggleActions: "play none none reverse",
//     }
// });

// gsap.from(".step-line", {
//     scaleY: 0,
//     duration: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//         trigger: ".process-section",
//         start: "top 30%",
//         toggleActions: "play none none reverse",
//     }
// });

// Process Ends

// Tools Starts
gsap.fromTo(".tool-item",
    { opacity: 0, x: 100 },
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

$(document).ready(function () {
    // Testimonials Carousel
    var testimonials_slider = $(".testimonials-carousel");
    testimonials_slider.owlCarousel({
        items: 1,
        center: true,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        nav: false,
        dots: true,
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        responsive: {
            0: { items: 1 },
            480: { items: 1 },
            768: { items: 1 },
            991: { items: 1 },
            1200: { items: 2 }
        }
    });

    testimonials_slider.on('click', '.owl-item', function () {
        var index = $(this).index();
        var carouselData = testimonials_slider.data('owl.carousel');
        var relativeIndex = carouselData.relative(index);
        testimonials_slider.trigger('to.owl.carousel', [relativeIndex, 500, true]);
    });

    // Culture Carousel
    var team_testimonials_slider = $(".culture-carousel");
    team_testimonials_slider.owlCarousel({
        items: 1,
        center: true,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        nav: false,
        dots: true,
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        responsive: {
            0: { items: 1 },
            480: { items: 1 },
            768: { items: 2 },
            991: { items: 2 },
            1200: { items: 3 }
        }
    });

    team_testimonials_slider.on('click', '.owl-item', function () {
        var index = $(this).index();
        var carouselData = team_testimonials_slider.data('owl.carousel');
        var relativeIndex = carouselData.relative(index);
        team_testimonials_slider.trigger('to.owl.carousel', [relativeIndex, 500, true]);
    });

    // Works Carousel
    var works_slider = $(".works-carousel");
    works_slider.owlCarousel({
        items: 1,
        center: true,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        nav: false,
        dots: true,
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        slideTransition: "ease-in-out",
        rtl: true,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 2 },
            991: { items: 3 },
            1200: { items: 3 }
        }
    });

    works_slider.on('translated.owl.carousel', function () {
        $(".work-card video").each(function () {
            this.pause();
            this.currentTime = 0;
        });
        $(".owl-item.active.center .work-card video").each(function () {
            this.play();
        });
    });

    works_slider.on('click', '.owl-item', function () {
        var index = $(this).index();
        var carouselData = works_slider.data('owl.carousel');
        var relativeIndex = carouselData.relative(index);
        works_slider.trigger('to.owl.carousel', [relativeIndex, 500, true]);
    });

});

// Contact Starts
jQuery(document).ready(function () {

    // Contact Form
    $("#contactForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: 'sendmail.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                showToast('Success', 'Thank you! Your message has been sent.');
                $("#contactForm").trigger("reset");
            },
            error: function () {
                showToast('Error', 'There was an error sending the email.');
            }
        });
    });

    function showToast(title, message) {
        $("#toastTitle").text(title);
        $("#toastMessage").text(message);
        var toast = new bootstrap.Toast($("#liveToast"));
        toast.show();
    }


    // Preloader
    setTimeout(function () {
        $('#preloader').addClass('hide');
    }, 1000);
});

gsap.from(".contact-form", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none"
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

gsap.from(".footer-column", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.5
});

// Contact Ends


function setEqualHeight() {
    let testimonials = document.querySelectorAll("#testimonials .testimonial-card");
    let teamTestimonials = document.querySelectorAll("#team .testimonial-card");
    let maxHeight = 0;
    let teamMaxHeight = 0;

    testimonials.forEach(el => {
        el.style.height = "auto";
        maxHeight = Math.max(maxHeight, el.offsetHeight);
    });

    testimonials.forEach(el => {
        el.style.height = maxHeight + 20 + "px";
    });

    teamTestimonials.forEach(el => {
        el.style.height = "auto";
        teamMaxHeight = Math.max(teamMaxHeight, el.offsetHeight);
    });

    teamTestimonials.forEach(el => {
        el.style.height = teamMaxHeight + "px";
    });
}

window.addEventListener("load", setEqualHeight);
window.addEventListener("resize", setEqualHeight);

// Vanilla Tilt
VanillaTilt.init(document.querySelector(".tilt-img"), {
    max: 15,
    speed: 1000,
});

VanillaTilt.init(document.querySelectorAll(".service-card"), {
    max: 5,
    speed: 1000,
    glare: true,
    "max-glare": 0.2,
});

// Whatsapp
function openWhatsApp() {
    var phoneNumber = "+917742962886";
    var message = "Hello! I'm interested in your software services. Can we discuss how you can help my business?";
    var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}

// Marquee
$(document).ready(function () {
    $('.marquee').marquee({
        duration: 20000,
        duplicated: true,
        delayBeforeStart: 0
    });
});

