/**
 * 
 * @returns If it returns true the device is mobile, otherwise it is desktop or laptop
 */
export function checkDevice() {
  // Why not use `navigator.userAgent.match()`?
  // If a new browser is released, or if one of the current mobile browsers changes its `user agent` value, it may break site functionality.
  if (
    screen.width < 640
    || screen.height < 480
    || screen.width < 1024
    || screen.height < 768
  ){
    return true; // está utilizando celular
  }
  else {
    return false; // não é celular
  }
}
