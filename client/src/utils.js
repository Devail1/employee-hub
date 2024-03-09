export const isIOS = () => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);

  if (isIOS && navigator.maxTouchPoints > 0) {
    return true;
  }

  return false;
};
