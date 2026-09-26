export const exportRaw = (name: string, data: BlobPart): void => {
  const saveAnchor = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a',
  ) as HTMLAnchorElement;

  saveAnchor.href = window.URL.createObjectURL(new Blob([data]));
  saveAnchor.download = name;

  const event = new MouseEvent('click', {
    relatedTarget: window,
  });

  saveAnchor.dispatchEvent(event);
};
