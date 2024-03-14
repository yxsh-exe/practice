gsap.to("#nav", {
  backgroundColor: "white",
  height: "100px",
  duration: "0.5",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    // markers: true,
    start: " top 50%",
    scrub: 1,
  },
});

gsap.from("#page2-ab", {
  scale:2,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#page2-ab",
    scroller: "body",
    // markers: true,
    start: "top 30%",
    end: "top 90%",
    scrub: 1,
  },
});
