// ReservoirEngineeringLab — общий скрипт сайта
(function () {
  "use strict";
  var ICONS = {
    menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><polyline points="8,12.5 11,15.5 16,9"/>',
    download: '<path d="M12 3v12"/><polyline points="7,10 12,15 17,10"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3,7 12,13 21,7"/>',
    zap: '<polygon points="13,2 4,14 11,14 10,22 20,9 13,9"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><polyline points="9,12 11,14 15,10"/>',
    layers: '<rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/>',
    code: '<polyline points="8,7 3,12 8,17"/><polyline points="16,7 21,12 16,17"/>',
    "arrow-right": '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="14,6 20,12 14,18"/>'
  };
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var s = ICONS[el.getAttribute("data-icon")];
    if (s) el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + s + "</svg>";
  });

  var toggle = document.querySelector(".nav-toggle"), links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var o = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", o ? "true" : "false");
    });
  }

  var rev = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && rev.length) {
    document.documentElement.classList.add("js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    rev.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rev.forEach(function (el) { el.classList.add("in"); }); }, 2500);
  }
})();
