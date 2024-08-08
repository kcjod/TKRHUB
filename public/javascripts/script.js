gsap.registerPlugin(ScrollTrigger);

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

gsap.from("#p2img", {
  opacity:0,
  scrollTrigger:{
    trigger:"#p2img",
    scroller:"body",
    start:"top bottom",
    end:"top center",
    scrub:3
  }
});

gsap.from("#p2box", {
  opacity:0,
  scrollTrigger:{
    trigger:"#p2box",
    scroller:"body",
    start:"top bottom",
    end:"top 60%",
    scrub:2
  }
});


gsap.to("#drag-text", {
  y: 5,
  x: 10,
  duration: 1,
  repeat: -1,
  yoyo: true,
  scrollTrigger: {
    trigger: "#drag-text",
    scroller: "body",
  }
});


// Function to make a card draggable
function makeDraggable(card) {
  let isDragging = false;
  let offsetX, offsetY;

  card.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      card.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
      if (isDragging) {
          const newX = e.clientX - offsetX;
          const newY = e.clientY - offsetY;
          card.style.left = `${newX - 100}px`; // Adjusted to make it fit better visually
          card.style.top = `${newY - 25}px`; // Adjusted to make it fit better visually
      }
  });

  document.addEventListener("mouseup", () => {
      if (isDragging) {
          isDragging = false;
          card.style.cursor = "grab";
      }
  });
}

// Select tcard1 and make it draggable
const tcard1 = document.querySelector("#tcard1");
makeDraggable(tcard1);

// Select tcard2 and make it draggable
const tcard2 = document.querySelector("#tcard2");
makeDraggable(tcard2);
const tcard3 = document.querySelector("#tcard3");
makeDraggable(tcard3);
const tcard4 = document.querySelector("#tcard4");
makeDraggable(tcard4);
const tcard5 = document.querySelector("#tcard5");
makeDraggable(tcard5);
