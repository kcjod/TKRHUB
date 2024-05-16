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


let q1 = document.getElementById("q1");
let q2 = document.getElementById("q2");
let q3 = document.getElementById("q3");
let q4 = document.getElementById("q4");
let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let a4 = document.getElementById("a4");
let flag = 0;

q1.addEventListener("click",function(){
  a2.style.display = "none";
  a3.style.display = "none";
  a4.style.display = "none";
  if(flag === 0){
    a1.style.display = "block";
    flag = 1;
  }
  else{
    a1.style.display = "none";
    flag = 0;
  }
});

q2.addEventListener("click",function(){
  a1.style.display = "none";
  a3.style.display = "none";
  a4.style.display = "none";
  if(flag === 0){
    a2.style.display = "block";
    flag = 1;
  }
  else{
    a2.style.display = "none";
    flag = 0;
  }
});

q3.addEventListener("click",function(){
  a2.style.display = "none";
  a1.style.display = "none";
  a4.style.display = "none";
  if(flag === 0){
    a3.style.display = "block";
    flag = 1;
  }
  else{
    a3.style.display = "none";
    flag = 0;
  }
});

q4.addEventListener("click",function(){
  a2.style.display = "none";
  a3.style.display = "none";
  a1.style.display = "none";
  if(flag === 0){
    a4.style.display = "block";
    flag = 1;
  }
  else{
    a4.style.display = "none";
    flag = 0;
  }
});