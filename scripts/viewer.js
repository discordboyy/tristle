// scripts/viewer.js

// ===== Fullscreen Viewer =====

let currentIndex = 0;

galleryImg.addEventListener('click', () => {
  currentIndex = projects.findIndex(p => p.imageUrl === galleryImg.src);
  openViewer();
});

function openViewer() {
  if (!galleryImg.src) return;

  const rect = galleryImg.getBoundingClientRect();

  const overlay = document.createElement('div');
  overlay.classList.add('viewer-overlay');

  const clone = document.createElement('img');
  clone.src = projects[currentIndex].imageUrl;
  clone.classList.add('viewer-image');

  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';

  overlay.appendChild(clone);

  // ===== SVG NAV =====
    const nav = document.createElement('div');
    nav.classList.add('viewer-nav');

    nav.innerHTML = `
    <button class="viewer-btn viewer-prev">
        <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18"></circle>
        <path d="M22 10 L14 18 L22 26"></path>
        </svg>
    </button>

    <button class="viewer-btn viewer-next">
        <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18"></circle>
        <path d="M14 10 L22 18 L14 26"></path>
        </svg>
    </button>

    <button class="viewer-btn viewer-close">
        <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18"></circle>
        <path d="M12 12 L24 24 M24 12 L12 24"></path>
        </svg>
    </button>
    `;

    overlay.appendChild(nav);

    const prevBtn = nav.querySelector('.viewer-prev');
    const nextBtn = nav.querySelector('.viewer-next');
    const closeBtn = nav.querySelector('.viewer-close');

  document.body.appendChild(overlay);

  clone.getBoundingClientRect();

  overlay.classList.add('active');
  updatePosition();

  window.addEventListener('resize', updatePosition);

  function updatePosition() {
    const targetHeight = window.innerHeight * 0.8;

    const naturalRatio =
      clone.naturalWidth / clone.naturalHeight;

    const finalHeight = targetHeight;
    const finalWidth = finalHeight * naturalRatio;

    clone.style.top = '50%';
    clone.style.left = '50%';
    clone.style.width = finalWidth + 'px';
    clone.style.height = finalHeight + 'px';
    clone.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  // ===== Навигация =====

  function showImage(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;

    currentIndex = index;
    clone.src = projects[currentIndex].imageUrl;
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // ESC закрытие
  function handleKey(e) {
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  }

  document.addEventListener('keydown', handleKey);

  // Закрытие
  function closeViewer() {
    window.removeEventListener('resize', updatePosition);
    overlay.classList.remove('active');
    clone.style.transform = 'translate(0,0) scale(1)';

    setTimeout(() => {
      overlay.remove();
      document.removeEventListener('keydown', handleKey);
    }, 500);
  }

  closeBtn.addEventListener('click', closeViewer);
}