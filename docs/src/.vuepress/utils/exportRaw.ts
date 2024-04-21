const fakeClick = (element: HTMLElement): void => {
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
    null,
  );

  element.dispatchEvent(ev);
};

export const exportRaw = (name: string, data: BlobPart): void => {
  const urlObject = window.URL || window.webkitURL || window;
  const saveAnchor = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a',
  ) as HTMLAnchorElement;

  saveAnchor.href = urlObject.createObjectURL(new Blob([data]));
  saveAnchor.download = name;

  fakeClick(saveAnchor);
};
