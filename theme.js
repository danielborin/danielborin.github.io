// Compartilhado por todas as páginas: alternância de tema claro/escuro.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('db-theme'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('db-theme', next); } catch (e) {}
    });
  });
})();
