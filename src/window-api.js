import ScrollApi from './scroll-api.js';

const windowApi = new ScrollApi();
if (global.document) {
  windowApi.setDomElement(global.document.documentElement, global.document.body);
  let atTheEnd = false;
  const handleAtEnd = () => {
    const distanceToEnd = windowApi.getDistanceToBottom(global.window.innerHeight);
    if (!atTheEnd) {
      if (distanceToEnd <= 0) {
        windowApi.triggerEvent('end', {});
        atTheEnd = true;
      }
    } else if (distanceToEnd > 0) {
      atTheEnd = false;
    }
  };
  global.document.addEventListener('scroll', (evt) => {
    windowApi.triggerEvent('scroll', evt);
  });
  windowApi.addEventListener('scroll', handleAtEnd);
}

export default windowApi.getPublicApi({
  scrollToStart: windowApi.scrollToTop,
  scrollToEnd: windowApi.scrollToBottom,
  getDistanceToStart: windowApi.getDistanceToTop,
  getDistanceToEnd: windowApi.getDistanceToBottom,
});
