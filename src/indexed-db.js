import localforage from 'localforage';

localforage.config({
  name: 'files-db',
  driver: localforage.INDEXEDDB,
});

async function addPreview(file) {
  const url = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = url;
  img.style.maxWidth = '100px';
  document.getElementById('img-preview').append(img);
}

document.getElementById('file-input').addEventListener('change', ($event) => {
  const file = $event.target.files[0];
  localforage.setItem(file.name, file);
  addPreview(file);
});

document.addEventListener('DOMContentLoaded', async () => {
  const files = await localforage.keys();

  files.forEach(async (key) => {
    const savedFile = await localforage.getItem(key);
    addPreview(savedFile);
  });
});
