const html = document.querySelector("html");

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


export function menuSwitch( event ) {
  (hasClass(html, 'menu_open'))?html.classList.remove("menu_open"):html.classList.add("menu_open");
}

export function menuScroll( event ) {
  menuSwitch();
  // try to add smooth scroll event
}
export function outMenuClick( event ) {
  menuSwitch();
}
