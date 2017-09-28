/* eslint-disable no-undef */
window.onload = () => {
  const windowWidth = window.innerWidth;
  let rem;
  if (windowWidth < 980) {
    rem = (windowWidth / 980) * 94;
  } else {
    rem = 94;
  }
  const html = document.getElementsByTagName('html')[0];
  html.style.fontSize = `${rem}px`;

  const dpr = window.devicePixelRatio;
  const meta = document.createElement('meta');
  const initialScale = 1 / dpr;
  const maximumScale = 1 / dpr;
  const minimumScale = 1 / dpr;
  meta.setAttribute('name', 'viewport');
  /* eslint-disable max-len */
  meta.setAttribute('content', `width=device-width, user-scalable=no, initial-scale=${initialScale}, maximum-scale=${maximumScale}, minimum-scale=${minimumScale}`);
  document.head.appendChild(meta);

  document.querySelector('#app').addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });

  document.querySelector('#app').addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });

  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  window.onresize = () => {
    const windowWidth = window.innerWidth;
    let rem;
    if (windowWidth < 980) {
      rem = (windowWidth / 980) * 94;
    } else {
      rem = 94;
    }
    const html = document.getElementsByTagName('html')[0];
    html.style.fontSize = `${rem}px`;
  };
};
