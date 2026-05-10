(() => {
  const triggers = document.querySelectorAll('.hero-video-trigger');

  if (!triggers.length) {
    return;
  }

  let modal = document.querySelector('.video-modal');
  let iframeHost = null;
  let closeButton = null;
  let lastFocusedElement = null;
  let backgroundElements = [];

  const createModal = () => {
    modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="video-modal__backdrop" data-video-modal-close></div>
      <div class="video-modal__content" role="dialog" aria-modal="true" aria-label="Project video">
        <button class="video-modal__close" type="button" aria-label="Close video" data-video-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    document.body.appendChild(modal);
  };

  const ensureModal = () => {
    if (!modal) {
      createModal();
    }

    iframeHost = modal.querySelector('.video-modal__content');
    closeButton = modal.querySelector('.video-modal__close');
  };

  const buildEmbedUrl = videoId => (
    `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`
  );

  const setBackgroundInteractivity = isInteractive => {
    if (isInteractive) {
      backgroundElements.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute('aria-hidden');
        } else {
          element.setAttribute('aria-hidden', ariaHidden);
        }
      });

      backgroundElements = [];
      return;
    }

    backgroundElements = Array.from(document.body.children)
      .filter(element => element !== modal)
      .map(element => ({
        element,
        inert: element.inert,
        ariaHidden: element.hasAttribute('aria-hidden')
          ? element.getAttribute('aria-hidden')
          : null
      }));

    backgroundElements.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
  };

  const closeVideo = () => {
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');
    document.body.classList.remove('video-open');
    setBackgroundInteractivity(true);

    const iframe = modal.querySelector('.video-modal__iframe');

    if (iframe) {
      iframe.remove();
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const openVideo = trigger => {
    const videoId = trigger.dataset.youtubeId;

    if (!videoId) {
      return;
    }

    ensureModal();

    const oldIframe = modal.querySelector('.video-modal__iframe');

    if (oldIframe) {
      oldIframe.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.className = 'video-modal__iframe';
    iframe.src = buildEmbedUrl(videoId);
    iframe.title = trigger.dataset.youtubeTitle || 'Project video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    lastFocusedElement = document.activeElement;
    iframeHost.appendChild(iframe);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');
    document.body.classList.add('video-open');

    if (closeButton) {
      closeButton.focus();
    }

    setBackgroundInteractivity(false);
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openVideo(trigger);
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('[data-video-modal-close]')) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeVideo();
    }
  });
})();
