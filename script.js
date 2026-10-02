(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Compact, translucent nav on scroll
  var nav = document.getElementById("nav");
  function onScrollNav() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Fade-in on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Active nav link
  var sections = ["about", "expertise", "tools", "experience", "education", "contact"]
    .map(function (id) { return document.getElementById(id); });
  var navLinks = links.querySelectorAll("a");
  function onScrollActive() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (s) { if (s && s.offsetTop <= y) current = s.id; });
    navLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }

  // Timeline line draws as you scroll through it
  var timeline = document.getElementById("timeline");
  function onScrollTimeline() {
    if (!timeline) return;
    if (reduceMotion) { timeline.style.setProperty("--progress", 1); return; }
    var r = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * 0.75 - r.top) / r.height;
    timeline.style.setProperty("--progress", Math.max(0, Math.min(1, p)).toFixed(3));
  }

  // Gentle parallax on illustrations
  var parallaxEls = document.querySelectorAll(".parallax");
  function onScrollParallax() {
    if (reduceMotion) return;
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-speed")) || 0.05;
      var r = el.getBoundingClientRect();
      var offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollNav();
      onScrollActive();
      onScrollTimeline();
      onScrollParallax();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
