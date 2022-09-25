export default function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (evt) => resolve(evt.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
