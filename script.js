gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
// Header animations
const headerTimeline = gsap.timeline();
headerTimeline
    .from('.section-tag', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.section-title', {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.section-subtitle', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

// Decorative elements parallax
// Animate decoration-3 elements with GSAP
gsap.utils.toArray('.decoration.decoration-3').forEach((decoration) => {
    gsap.to(decoration, {
        scrollTrigger: {
            trigger: '.about-section',
            start: '-=200',
            end: 'bottom bottom',
            scrub: 1.5,
            markers: false,  // Set to true if you want to see debug markers for the start/end points
            toggleActions: 'play none none reverse',  // This controls what happens on scroll
        },
        y: 50,
        ease: 'power1.inOut',
        duration: 1,  // You can control the speed/duration of the animation
    });
});




// Service cards animation
gsap.utils.toArray('.service-card , .work-card').forEach((card, i) => {
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
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// 3D hover effect for cards
document.querySelectorAll('.service-card, .work-card').forEach(card => {
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

// gsap.to('.decoration-4', {
//     scrollTrigger: {
//         trigger: 'body',
//         start: 'top top',
//         end: '500vh',
//         scrub: 1.5,
//     },
//     motionPath: {
//         path: path,
//         curviness: 2,
//         autoRotate: true,
//         alignOrigin: [0.5, 0.5]
//     },
//     ease: "power1.inOut",
//     duration: 100,
//     rotation: "+=720",
//     opacity: 1
// });


// Rocket Animation
const rocket = document.getElementById('rocket');
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
    gsap.set(rocket, { x: "-=2", rotation: "-=2" });
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

// Tools Starts
gsap.to(".tool-item", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: {
        amount: 1,
        grid: "auto",
        from: "start"
    },
    ease: "power3.out"
});

// More tools text animation
gsap.to(".more-tools", {
    opacity: 1,
    duration: 1,
    delay: 1.5,
    ease: "power3.out"
});

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


// // Scene, Camera, Renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     200
// );
// camera.position.set(-4, 3, 6);

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);

// // Lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// // GLTF Loader
// const loader = new THREE.GLTFLoader();
// loader.load(
//     "/assets/planet/scene.gltf",
//     (gltf) => {
//         const earth = gltf.scene;
//         earth.scale.set(2.5, 2.5, 2.5);
//         earth.position.set(0, 0, 0);
//         scene.add(earth);
//     },
//     undefined,
//     (error) => {
//         console.error("Error loading GLTF model:", error);
//     }
// );

// // Orbit Controls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1;
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = Math.PI / 2;

// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();

// // Responsive Design
// window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

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
    var slider = $(".owl-carousel");
    slider.owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        items: 1,
        stagePadding: 30,
        center: true,
        nav: false,
        margin: 30,
        dots: true,
        loop: true,
        smartSpeed: 2000,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 3 },
            991: { items: 3 },
            1200: { items: 4 }
        },
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        lazyLoad: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
    });
});
