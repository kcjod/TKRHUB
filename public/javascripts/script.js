function loco(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco()

// GSAP Animations
gsap.to("#logostart", {
  y: "-100vh",
  delay: 2,
  duration: 1,
});

let questions = document.querySelectorAll('[id^="q"]');
let answers = document.querySelectorAll('[id^="a"]');
let flags = new Array(questions.length).fill(0);

function toggleDisplay(index) {
  answers.forEach((answer, i) => {
      if (i === index) {
          answer.style.display = (flags[index] === 0) ? "block" : "none";
      } else {
          answer.style.display = "none";
          flags[i] = 0;
      }
  });

  flags[index] = (flags[index] === 0) ? 1 : 0;
}

questions.forEach((question, index) => {
  question.addEventListener("click", () => toggleDisplay(index));
});

let tl = gsap.timeline();

const h1 = document.querySelector("#leftp1 h1");
const h2 = document.querySelector("#leftp1 h2");
const p = document.querySelector("#leftp1 p");

tl.from(h1, {
  x: -50,
  opacity: 0,
  delay: 3,
  duration: 0.5
});

tl.from(h2, {
  x: -50,
  opacity: 0,
  delay: 0,
  duration: 0.5
});

tl.from(p, {
  x: -50,
  opacity: 0,
  delay: 0,
  duration: 1
});

tl.from("#rightp1 img", {
  x: 100,
  opacity: 0,
  duration: 1
});

gsap.from("#page2 img", {
  y: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
      trigger: "#page2 img",
      scroller: "main", // Ensure the scroller matches the Locomotive Scroll element
      start: "bottom bottom",
      end: "top 40%",
      scrub: 4
  }
});
