export default function download(data, filename, type) {
  const file = new Blob([data], { type: type });
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);

  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  setTimeout(() => {
    a.remove();
    window.URL.revokeObjectURL(url);
  }, 0);
}
