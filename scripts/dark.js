// scripts/dark.js

document.addEventListener('DOMContentLoaded', () => {

  const desktopToggle = document.getElementById('dark-toggle');
  const mobileToggle = document.getElementById('dark-toggle-mobile');

  function updateButtonText() {
    const isDark = document.body.classList.contains('dark-mode');
    const text = isDark ? 'Light Mode' : 'Dark Mode';

    if (desktopToggle) desktopToggle.textContent = text;
    if (mobileToggle) mobileToggle.textContent = text;
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    updateButtonText();
  }

  if (desktopToggle) {
    desktopToggle.addEventListener('click', toggleTheme);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleTheme);
  }

  // установить правильный текст при загрузке
  updateButtonText();

});