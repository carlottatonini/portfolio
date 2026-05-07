/* ==========================================================================
   HERO VIDEO AUTOPLAY + FALLBACK
   ========================================================================== */

const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');
const videoToggle = document.querySelector('.video-toggle');
const audioToggle = document.querySelector('.audio-toggle');
const volumeSlider = document.querySelector('.volume-slider');

if (hero && heroVideo) {
  const defaultVolume = 0.5;

  heroVideo.volume = defaultVolume;

  if (volumeSlider) {
    volumeSlider.value = String(defaultVolume);
  }

  const updateVideoControls = () => {
    const isPaused = heroVideo.paused;
    const isMuted = heroVideo.muted || heroVideo.volume === 0;

    hero.classList.toggle('video-paused', isPaused);
    hero.classList.toggle('is-muted', isMuted);

    if (videoToggle) {
      videoToggle.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
    }

    if (audioToggle) {
      audioToggle.setAttribute('aria-label', isMuted ? 'Turn audio on' : 'Turn audio off');
    }

    if (volumeSlider && document.activeElement !== volumeSlider) {
      volumeSlider.value = String(heroVideo.volume);
    }
  };

  const showVideoFallback = () => {
    hero.classList.remove('video-ready');
    hero.classList.add('video-failed');
    updateVideoControls();
  };

  const revealVideo = () => {
    if (!hero.classList.contains('video-failed')) {
      hero.classList.add('video-ready');
    }

    updateVideoControls();
  };

  heroVideo.addEventListener('error', showVideoFallback);

  heroVideo.querySelectorAll('source').forEach(source => {
    source.addEventListener('error', showVideoFallback);
  });

  const playVideo = () => {
    const playPromise = heroVideo.play();

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(revealVideo)
        .catch(showVideoFallback);
    } else {
      revealVideo();
    }
  };

  if (videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        playVideo();
      } else {
        heroVideo.pause();
        updateVideoControls();
      }
    });
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const shouldUnmute = heroVideo.muted || heroVideo.volume === 0;

      if (shouldUnmute) {
        if (heroVideo.volume === 0) {
          heroVideo.volume = defaultVolume;
        }

        heroVideo.muted = false;

        if (heroVideo.paused) {
          playVideo();
        }
      } else {
        heroVideo.muted = true;
      }

      updateVideoControls();
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', event => {
      const volume = Number(event.target.value);

      heroVideo.volume = volume;
      heroVideo.muted = volume === 0;

      if (volume > 0 && heroVideo.paused) {
        playVideo();
      }

      updateVideoControls();
    });
  }

  heroVideo.addEventListener('play', updateVideoControls);
  heroVideo.addEventListener('pause', updateVideoControls);
  heroVideo.addEventListener('volumechange', updateVideoControls);
  heroVideo.addEventListener('playing', revealVideo, { once: true });

  if (heroVideo.readyState >= 2) {
    playVideo();
  } else {
    heroVideo.addEventListener('canplay', playVideo, { once: true });
  }

  updateVideoControls();
}
