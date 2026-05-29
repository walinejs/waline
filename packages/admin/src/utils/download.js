export default function download(data, filename, type) {
  const file = new Blob([data], { type });
  const link = document.createElement('a');
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(url);
  }, 0);
}
