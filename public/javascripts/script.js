
// Initialize LocomotiveScroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.05,
});

console.log("LocomotiveScroll initialized");

// (Optional) Remove these lines if you don't want animations
gsap.to("#logostart", {
  delay: 2,
  y: "-100vh",
  duration: 1,
  display: "none",
  onComplete: () => console.log("#logostart animation complete"),
});


gsap.to("#pages", {
    delay: 3,
    onComplete: () => {
        document.querySelector("#pages").style.display = "block";
        console.log("#pages set to display:block");
    }
});