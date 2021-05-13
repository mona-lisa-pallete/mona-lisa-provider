function getScrollWidth() {
  if (document.body.clientHeight === document.body.scrollHeight) {
    return 0;
  }
  const oDiv = document.createElement('DIV');
  oDiv.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;';
  const noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = 'scroll';
  const scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll - scroll;
}

export { getScrollWidth };
