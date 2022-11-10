export function isMobileView() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}