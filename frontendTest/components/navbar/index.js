const html = document.querySelector("html");

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


export function menuSwitch( event ) {
  (hasClass(html, 'menu_open'))?html.classList.remove("menu_open"):html.classList.add("menu_open");
}

export function menuScroll( event ) {
  menuSwitch();
  // event.preventDefault();

  // const full_url = this.href
  // const parts = full_url.split("#")
  // const trgt = parts[1]
  // const target_top = document.querySelector(`#${trgt}`).offsetTop

}
