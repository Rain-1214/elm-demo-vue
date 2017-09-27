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

  // set meat viewport
  const dpr = window.devicePixelRatio;
  const meta = document.createElement('meta');
  const initialScale = 1 / dpr;
  const maximumScale = 1 / dpr;
  const minimumScale = 1 / dpr;
  meta.setAttribute('name', 'viewport');
  /* eslint-disable max-len */
  meta.setAttribute('content', `width=device-width, user-scalable=no, initial-scale=${initialScale}, maximum-scale=${maximumScale}, minimum-scale=${minimumScale}`);
  document.head.appendChild(meta);

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
