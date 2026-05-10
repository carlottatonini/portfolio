/* Navbar behavior is shared in js/components/navbar.js. */

const audiovisualIntroVideos = [
  'assets/videos/audiovisual/intro/kreuzweise_2026_intro.mp4',
  'assets/videos/audiovisual/intro/magdeburg_weichnasmarkt_intro.mp4',
  'assets/videos/audiovisual/intro/polonia_2025_intro.mp4',
  'assets/videos/audiovisual/intro/ogni_click_e_una_scelta_intro.mp4',
  'assets/videos/audiovisual/intro/intercept_intro.mp4'
];

function preloadAudiovisualIntroVideos() {
  const preloadedVideos = audiovisualIntroVideos.map(src => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.load();
    return video;
  });

  window.audiovisualIntroPreload = preloadedVideos;
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(preloadAudiovisualIntroVideos, { timeout: 1200 });
} else {
  window.addEventListener('load', preloadAudiovisualIntroVideos, { once: true });
}
