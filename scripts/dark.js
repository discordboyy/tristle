// scripts/dark.js
const toggle = document.querySelector('.dark-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});