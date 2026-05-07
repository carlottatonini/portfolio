document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     CAMBIO SFONDO SMOOTH AL PASSAGGIO DEL MOUSE
     ========================================================================== */

  const projectItems = document.querySelectorAll('.bottom-left li[data-bg]');
  const bottomLeft = document.querySelector('.bottom-left');

  const backgroundOne = document.querySelector('.background-preview-1');
  const backgroundTwo = document.querySelector('.background-preview-2');

  if (!projectItems.length || !bottomLeft || !backgroundOne || !backgroundTwo) {
    console.warn('Hover background non attivo: controlla .bottom-left, li[data-bg] e .background-preview.');
    return;
  }

  let activeBackground = backgroundOne;
  let inactiveBackground = backgroundTwo;
  let currentBackground = '';

  function preloadImage(src) {
    const img = new Image();

    img.onload = () => {
      console.log(`Immagine caricata correttamente: ${src}`);
    };

    img.onerror = () => {
      console.warn(`Immagine NON trovata o percorso errato: ${src}`);
    };

    img.src = src;
  }

  projectItems.forEach(item => {
    const bg = item.dataset.bg;

    if (bg) {
      preloadImage(bg);
    }

    item.addEventListener('mouseenter', () => {
      const newBackground = item.dataset.bg;

      if (!newBackground || newBackground === currentBackground) {
        return;
      }

      currentBackground = newBackground;

      inactiveBackground.style.backgroundImage = `url("${newBackground}")`;
      inactiveBackground.style.backgroundSize = item.dataset.bgSize || 'cover';
      inactiveBackground.style.backgroundPosition = item.dataset.bgPosition || 'center center';

      requestAnimationFrame(() => {
        inactiveBackground.classList.add('active');
        activeBackground.classList.remove('active');

        const temporaryBackground = activeBackground;
        activeBackground = inactiveBackground;
        inactiveBackground = temporaryBackground;
      });
    });
  });

  bottomLeft.addEventListener('mouseleave', () => {
    backgroundOne.classList.remove('active');
    backgroundTwo.classList.remove('active');
    currentBackground = '';
  });
});
