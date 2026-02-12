export default (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      resolve(event.target.result);
    });
    reader.addEventListener('error', reject);
    // oxlint-disable-next-line unicorn/prefer-blob-reading-methods
    reader.readAsText(file);
  });
