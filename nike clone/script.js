function lgsap() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector(".main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy(".main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector(".main").style.transform
			? "transform"
			: "fixed",
	});

	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}
lgsap();

var tl = gsap.timeline();

tl.from("#upper ", {
	y: -100,
	duration: 1,
	delay: 0.5,
	ease: Power1.easeInOut,
});
tl.to("#upper img", {
	x: 570,
	duration: 1,
	delay: 0.5,
	ease: Power1.easeInOut,
});
tl.from("#nav ,#nav-2 ,#nav-3", {
	opacity: 0,
	duration: 1,
	stagger: true,
});

tl.from(".offer", {
	y: 10,
	opacity: 0,
	duration: 1,
	ease: Power1,
});

tl.from(".page1 img", {
	scale: 0,
	opacity: 0,
	ease: Power1.easeInOut,
});
gsap.to(".innerbox", {
	transform: "translateY(0)",
	display: "block",
	opacity: 1,
	duration: 0.5,
	scrollTrigger: {
		trigger: ".innerbox",
		scroller: ".main",
		start: "top 80%",
		end: "top 50%",
		scrub: 2,
	},
});
