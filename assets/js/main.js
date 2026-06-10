// Featured Work dot navigation
document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('#featuredPanel .panel-card');
  var dots  = document.querySelectorAll('#featuredDots button');
  if (!cards.length || !dots.length) return;

  function show(i) {
    cards.forEach(function (c, j) { c.classList.toggle('active', i === j); });
    dots.forEach(function (d, j)  { d.classList.toggle('active', i === j); });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); });
  });
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is tapped (mobile UX)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
