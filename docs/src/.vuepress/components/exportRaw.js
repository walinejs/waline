const fakeClick = (obj) => {
  const ev = document.createEvent('MouseEvents');

  ev.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );

  obj.dispatchEvent(ev);
};

export const exportRaw = (name, data) => {
  const urlObject = window.URL || window.webkitURL || window;
  const export_blob = new Blob([data]);
  const save_link = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a'
  );

  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;

  fakeClick(save_link);
};
