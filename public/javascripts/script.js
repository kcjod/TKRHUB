// gsap.from("#logo",{
//     y: -50,
//     delay: 0.5,
//     duration: 1
// })

// gsap.from("#elems", {
//     x: -20,
//     opacity: 0,
//     duration: 1
// })


const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp:0.05
});
