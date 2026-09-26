// ReservoirEngineeringLab — справочник: поиск, копирование, боковое меню
(function () {
  "use strict";
  function norm(s) { return (s || "").toLowerCase().replace(/ё/g, "е"); }

  // Копировать синтаксис
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-copy");
      var done = function () { var o = b.textContent; b.textContent = "Скопировано"; setTimeout(function () { b.textContent = o; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, done); else done();
    });
  });

  // Мобильное меню справочника
  var st = document.getElementById("sideToggle"), side = document.getElementById("docsSide");
  if (st && side) st.addEventListener("click", function () {
    var o = side.classList.toggle("open"); st.setAttribute("aria-expanded", o ? "true" : "false");
  });

  // Фильтр в боковом меню
  var sf = document.getElementById("sideFilter");
  if (sf) sf.addEventListener("input", function () {
    var q = norm(sf.value.trim());
    document.querySelectorAll(".docs-side .side-mod").forEach(function (m) {
      var any = false;
      m.querySelectorAll(".side-fn").forEach(function (a) {
        var ok = !q || norm(a.getAttribute("data-k")).indexOf(q) >= 0;
        a.style.display = ok ? "" : "none"; if (ok) any = true;
      });
      m.querySelectorAll(".side-sec").forEach(function (s) {
        var n = s.nextElementSibling, vis = false;
        while (n && n.classList.contains("side-fn")) { if (n.style.display !== "none") vis = true; n = n.nextElementSibling; }
        s.style.display = vis ? "" : "none";
      });
      m.style.display = any ? "" : "none";
      if (q) m.open = true;
    });
  });

  // Поиск по библиотеке
  var ls = document.getElementById("libSearch"), cnt = document.getElementById("libCount"), empty = document.getElementById("libEmpty");
  function run() {
    var q = norm(ls.value.trim()), total = 0;
    document.querySelectorAll(".lib-mod").forEach(function (m) {
      var mv = 0;
      m.querySelectorAll(".lib-sec").forEach(function (s) {
        var sv = 0;
        s.querySelectorAll(".lib-fn").forEach(function (a) {
          var ok = !q || q.split(/\s+/).every(function (w) { return norm(a.getAttribute("data-k")).indexOf(w) >= 0; });
          a.style.display = ok ? "" : "none"; if (ok) sv++;
        });
        s.style.display = sv ? "" : "none"; mv += sv;
      });
      m.style.display = mv ? "" : "none"; total += mv;
    });
    if (cnt) cnt.textContent = q ? "найдено: " + total : "";
    if (empty) empty.hidden = total !== 0;
  }
  if (ls) {
    ls.addEventListener("input", run);
    var p = new URLSearchParams(location.search).get("q");
    if (p) { ls.value = p; run(); }
  }
})();
