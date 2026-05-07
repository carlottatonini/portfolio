/* CAMBIO SFONDO / VIDEO SMOOTH AL PASSAGGIO DEL MOUSE SUI NOMI IN BASSO A SINISTRA */

const projectItems = document.querySelectorAll('.bottom-left li');
const bottomLeft = document.querySelector('.bottom-left');

const backgroundOne = document.querySelector('.background-preview-1');
const backgroundTwo = document.querySelector('.background-preview-2');

if (projectItems.length > 0 && bottomLeft && backgroundOne && backgroundTwo) {
  const videoOne = document.createElement('video');
  const videoTwo = document.createElement('video');
  const previewLayers = [
    { image: backgroundOne, video: videoOne },
    { image: backgroundTwo, video: videoTwo }
  ];

  previewLayers.forEach(({ video }) => {
    video.className = 'video-preview';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(video, bottomLeft);
  });

  let activeLayer = previewLayers[0];
  let inactiveLayer = previewLayers[1];
  let currentHoverId = 0;
  let cleanupId = 0;
  const previewTransitionMs = 900;

  function hideVideo(layer) {
    layer.video.classList.remove('active');
    layer.video.pause();
    layer.video.removeAttribute('src');
    layer.video.load();
  }

  function showFallback(layer, imageSrc) {
    layer.image.style.backgroundImage = `url("${imageSrc}")`;
    layer.image.classList.add('active');
  }

  function clearImage(layer) {
    layer.image.classList.remove('active');
    layer.image.style.backgroundImage = '';
  }

  function resetLayer(layer) {
    clearImage(layer);
    hideVideo(layer);
  }

  function crossfadeToLayer(nextLayer) {
    const previousLayer = activeLayer;
    const thisCleanupId = cleanupId + 1;
    cleanupId = thisCleanupId;

    activeLayer = nextLayer;
    inactiveLayer = previousLayer;

    requestAnimationFrame(() => {
      previousLayer.image.classList.remove('active');
      previousLayer.video.classList.remove('active');
    });

    window.setTimeout(() => {
      if (cleanupId === thisCleanupId && inactiveLayer === previousLayer) {
        resetLayer(previousLayer);
      }
    }, previewTransitionMs);
  }

  projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const newBackground = item.getAttribute('data-bg');
      const newVideo = item.getAttribute('data-video');

      if (newBackground) {
        currentHoverId += 1;
        const hoverId = currentHoverId;
        const nextLayer = inactiveLayer;

        resetLayer(nextLayer);

        if (!newVideo) {
          showFallback(nextLayer, newBackground);
          crossfadeToLayer(nextLayer);
          return;
        }

        const videoLayer = nextLayer.video;

        videoLayer.src = newVideo;
        videoLayer.load();

        const showVideoWhenReady = () => {
          if (hoverId !== currentHoverId) {
            return;
          }

          videoLayer.play()
            .then(() => {
              if (hoverId === currentHoverId) {
                videoLayer.classList.add('active');
                nextLayer.image.classList.remove('active');
                crossfadeToLayer(nextLayer);
              }
            })
            .catch(() => {
              videoLayer.classList.remove('active');
              if (hoverId === currentHoverId) {
                showFallback(nextLayer, newBackground);
                crossfadeToLayer(nextLayer);
              }
            });
        };

        if (videoLayer.readyState >= 3) {
          showVideoWhenReady();
        } else {
          videoLayer.addEventListener('canplay', showVideoWhenReady, { once: true });
          videoLayer.addEventListener('error', () => {
            videoLayer.classList.remove('active');
            if (hoverId === currentHoverId) {
              showFallback(nextLayer, newBackground);
              crossfadeToLayer(nextLayer);
            }
          }, { once: true });
        }
      }
    });
  });

  bottomLeft.addEventListener('mouseleave', () => {
    currentHoverId += 1;
    cleanupId += 1;
    previewLayers.forEach(layer => {
      resetLayer(layer);
    });
  });
}
