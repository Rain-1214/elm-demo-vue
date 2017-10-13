/* eslint-disable no-undef */
window.onload = () => {
  const windowWidth = document.documentElement.clientWidth;
  let rem;
  if (windowWidth > 640) {
    rem = 40;
  } else {
    rem = (windowWidth / 320) * 20;
  }
  document.documentElement.style.fontSize = `${rem}px`;

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
    const windowWidth = document.documentElement.clientWidth;
    let rem;
    if (windowWidth > 640) {
      rem = 40;
    } else {
      rem = (windowWidth / 320) * 20;
    }
    document.documentElement.style.fontSize = `${rem}px`;
  };
};
