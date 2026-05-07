(() => {
  const triggers = document.querySelectorAll('.hero-video-trigger');

  if (!triggers.length) {
    return;
  }

  let modal = document.querySelector('.video-modal');
  let iframeHost = null;
  let closeButton = null;
  let lastFocusedElement = null;

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

  const closeVideo = () => {
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');

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

    iframeHost.appendChild(iframe);
    lastFocusedElement = document.activeElement;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');

    if (closeButton) {
      closeButton.focus();
    }
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
