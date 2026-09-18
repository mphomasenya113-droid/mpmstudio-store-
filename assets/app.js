(function () {
  "use strict";

  var TOTAL_SECONDS = 72 * 60 * 60;

  function pad(n) { return String(n).padStart(2, "0"); }

  function startCountdown() {
    var cells = document.querySelectorAll("[data-count]");
    if (!cells.length) return;
    var left = TOTAL_SECONDS;
    var progress = document.querySelector("[data-progress]");
    var tick = setInterval(function () {
      if (left <= 0) left = TOTAL_SECONDS;
      var h = Math.floor(left / 3600);
      var m = Math.floor((left % 3600) / 60);
      var s = left % 60;
      cells[0].textContent = pad(h);
      cells[1].textContent = pad(m);
      cells[2].textContent = pad(s);
      if (progress) progress.style.width = ((left / TOTAL_SECONDS) * 100).toFixed(1) + "%";
      left--;
    }, 1000);
    tick();
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initNewsletter() {
    var form = document.querySelector("[data-newsletter]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.querySelector("input[type=email]") || {}).value || "";
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      var note = form.parentElement.querySelector("[data-note]");
      if (!ok) { if (note) note.textContent = "Please enter a valid email address."; return; }
      form.style.display = "none";
      if (note) { note.textContent = "You're on the list. Watch your inbox for the first issue."; }
    });
  }

  function initCheckout() {
    var form = document.querySelector("[data-checkout]");
    var confirm = document.querySelector("[data-confirm]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.querySelector("#email") || {}).value || "";
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) { var f = form.querySelector("#email"); f.focus(); f.setCustomValidity("Please enter a valid email address."); f.reportValidity(); return; }
      form.style.display = "none";
      if (confirm) confirm.classList.add("show");
      var down = document.querySelector("[data-download]");
      if (down) { down.removeAttribute("download"); down.href = "index.html"; down.textContent = "Preview done — back to product"; }
    });
  }

  startCountdown();
  initReveal();
  initNewsletter();
  initCheckout();
})();