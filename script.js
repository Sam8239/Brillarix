gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
// Header animations
const headerTimeline = gsap.timeline();
headerTimeline
    .from('.services-tag', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.services-title', {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.services-subtitle', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

// Decorative elements parallax
gsap.utils.toArray('.decoration').forEach(decoration => {
    gsap.to(decoration, {
        scrollTrigger: {
            trigger: '.services-container',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: (i, target) => (target.classList.contains('decoration-1') ? 900 :
            target.classList.contains('decoration-2') ? -800 : 100),
        rotate: (i, target) => (target.classList.contains('decoration-1') ? 180 :
            target.classList.contains('decoration-2') ? -180 : 30),
        ease: 'none'
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
        y: 50,
        rotateX: 15,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// 3D hover effect for cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xRotation = ((y - rect.height / 2) / rect.height) * 20;
        const yRotation = ((x - rect.width / 2) / rect.width) * 20;

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
            duration: 0.5,
            ease: 'power2.out',
        });
    });
});

gsap.to('.decoration-4', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '500vh',
        scrub: 1.5,
    },
    motionPath: {
        path: path,
        curviness: 2,
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    ease: "power1.inOut",
    duration: 100,
    rotation: "+=720",
    opacity: 1
});




// Rocket Animation
const rocket = document.getElementById('rocket');
const fire = document.getElementById('fire');
let lastScrollTop = 0;

function animateRocketUp() {
    gsap.to(rocket, { y: -300, duration: 1.5, ease: "power2.inOut", onComplete: scrollToNextSection });
}

function animateRocketDown() {
    gsap.to(rocket, { y: 0, duration: 2, ease: "power2.inOut" });
}

function scrollToNextSection() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

rocket.addEventListener('click', () => {
    animateRocketUp();
});

// Add scroll event to detect scroll direction and move rocket back down
window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;

    if (scrollTop < lastScrollTop) {
        animateRocketDown();
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Rocket Shake Animation
let shakeTween;

const shakeRocket = () => {
    gsap.set(rocket, { x: -2, rotation: -2 });
    shakeTween = gsap.to(rocket, {
        x: "+=2",
        rotation: "+=2",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
};

const stopShake = () => {
    if (shakeTween) {
        shakeTween.kill();
    }
    gsap.to(rocket, { x: 0, rotation: 0, duration: 0.2 });
};

rocket.addEventListener('mouseenter', shakeRocket);
rocket.addEventListener('mouseleave', stopShake);



