gsap.from("#lpic",{
    x: -180,
    delay: 0.5,
    duration: 1
});

gsap.to("#lbox", {
    x: -100,
    opacity: 0,
    duration: 1.5,
    delay: 5
});


const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp:0.05
});
