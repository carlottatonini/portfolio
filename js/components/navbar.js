(function () {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  const projectHero = document.querySelector('main.project-page .hero');

  if (!hamburger || !menu || hamburger.dataset.navbarReady === 'true') {
    return;
  }

  hamburger.dataset.navbarReady = 'true';
  document.body.classList.toggle('project-subpage', Boolean(projectHero));

  const root = document.documentElement;
  const navbarHero = projectHero || document.querySelector('.hero');
  const usesScrollMaterialization = Boolean(navbarHero) && !document.body.classList.contains('home');
  const materializationDistanceRatio = 0.5;

  document.body.classList.toggle('navbar-materializing', usesScrollMaterialization);

  const ensureProjectScrollArrow = () => {
    if (!projectHero || projectHero.querySelector('.project-scroll-arrow')) {
      return;
    }

    const projectInfo = document.querySelector('main.project-page .project-info');
    const target = projectInfo || projectHero.nextElementSibling;

    if (!target) {
      return;
    }

    if (!target.id) {
      target.id = 'project-info';
    }

    const arrow = document.createElement('a');
    arrow.className = 'project-scroll-arrow';
    arrow.href = `#${target.id}`;
    arrow.setAttribute('aria-label', 'Scroll to project content');
    arrow.innerHTML = '<span></span>';

    projectHero.appendChild(arrow);
  };

  const setMenuState = isOpen => {
    menu.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
  };

  const updateNavbarTone = () => {
    const header = document.querySelector('.header');

    if (navbarHero && header && usesScrollMaterialization) {
      const heroRect = navbarHero.getBoundingClientRect();
      const heroTop = heroRect.top + window.scrollY;
      const materializationDistance = Math.max(heroRect.height * materializationDistanceRatio, 1);
      const progress = Math.min(Math.max((window.scrollY - heroTop) / materializationDistance, 0), 1);

      root.style.setProperty('--navbar-materialization-progress', progress.toFixed(3));
      root.style.setProperty('--navbar-materialization-offset', `${-10 * (1 - progress)}px`);
      document.body.classList.toggle('navbar-on-light', progress >= 1);
      return;
    }

    const bodyStyle = window.getComputedStyle(document.body);
    const hasBackgroundImage = bodyStyle.backgroundImage && bodyStyle.backgroundImage !== 'none';
    const shouldUseLightTone = !document.body.classList.contains('home') && !hasBackgroundImage;

    document.body.classList.toggle('navbar-on-light', shouldUseLightTone);
  };

  let toneFrame = null;

  const requestNavbarToneUpdate = () => {
    if (toneFrame) {
      return;
    }

    toneFrame = window.requestAnimationFrame(() => {
      toneFrame = null;
      updateNavbarTone();
    });
  };

  hamburger.addEventListener('click', () => {
    setMenuState(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  ensureProjectScrollArrow();
  updateNavbarTone();
  window.addEventListener('scroll', requestNavbarToneUpdate, { passive: true });
  window.addEventListener('resize', requestNavbarToneUpdate);
}());
