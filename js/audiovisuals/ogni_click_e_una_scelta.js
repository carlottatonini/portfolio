const videoTrigger = document.querySelector('.video-trigger');
const videoModal = document.querySelector('.video-modal');
const videoFrame = document.querySelector('[data-youtube-frame]');
const videoCloseButtons = document.querySelectorAll('[data-video-close]');

let lastFocusedElement = null;

if (videoTrigger && videoModal && videoFrame) {
  const closeVideo = () => {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoFrame.setAttribute('src', '');
    document.body.classList.remove('video-open');

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const openVideo = (event) => {
    event.preventDefault();

    const embedUrl = videoTrigger.dataset.youtubeEmbed;

    if (!embedUrl) {
      return;
    }

    lastFocusedElement = document.activeElement;

    videoFrame.setAttribute('src', embedUrl);
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-open');

    const closeButton = videoModal.querySelector('.video-modal__close');

    if (closeButton) {
      closeButton.focus();
    }
  };

  videoTrigger.addEventListener('click', openVideo);

  videoCloseButtons.forEach((button) => {
    button.addEventListener('click', closeVideo);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideo();
    }
  });
}
