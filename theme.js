/* theme.js — C360 Innovation Lab */
(function () {
  const KEY = 'c360_theme';

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    sync(theme);
  }

  function sync(theme) {
    const isLight = theme === 'light';
    const pill  = document.getElementById('toggle-pill');
    const label = document.getElementById('theme-toggle-label');
    if (pill)  pill.classList.toggle('on', isLight);
    if (label) label.textContent = isLight ? 'Light Mode' : 'Dark Mode';
  }

  /* run immediately before paint */
  apply(localStorage.getItem(KEY) || 'dark');

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    apply(current === 'dark' ? 'light' : 'dark');
  };

  /* re-sync after DOM is ready (sidebar is injected after DOMContentLoaded) */
  document.addEventListener('DOMContentLoaded', function () {
    sync(localStorage.getItem(KEY) || 'dark');
  });
})();
