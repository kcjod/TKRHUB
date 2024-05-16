document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
  });

  // Sync ScrollTrigger updates with Locomotive Scroll
  locoScroll.on("scroll", ScrollTrigger.update);

  // Configure ScrollTrigger to use Locomotive Scroll as the scroller
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });

  // Refresh ScrollTrigger and Locomotive Scroll on window updates
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // Initial refresh of ScrollTrigger and Locomotive Scroll
  ScrollTrigger.refresh();
});

gsap.to("#logostart", {
  y: "-100vh",
  delay: 2,
  duration: 1,
});


let questions = document.querySelectorAll('[id^="q"]');
let answers = document.querySelectorAll('[id^="a"]');
let flag = 0;

function toggleDisplay(index) {
  answers.forEach((answer, i) => {
    if (i === index) {
      answer.style.display = (flag === 0) ? "block" : "none";
    } else {
      answer.style.display = "none";
    }
  });
  flag = (flag === 0) ? 1 : 0;
}

questions.forEach((question, index) => {
  question.addEventListener("click", () => toggleDisplay(index));
});
