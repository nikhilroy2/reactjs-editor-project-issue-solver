import { base64StringToBlob } from 'blob-util';

function getBase64Image(url) {
  const promise = new Promise(((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    // eslint-disable-next-line
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ''));
    };
    // eslint-disable-next-line
    img.onerror = function (e) {
      reject(e);
    };

    img.src = url;
  }));

  return promise;
}

export const toFileFromBase64 = (url, name, type) => getBase64Image(url)
  .then((response) => {
    const contentType = type === 'vector/svg' ? 'image/png' : 'image/jpg';
    const blob = base64StringToBlob(response, contentType);
    const file = new File([blob], name, {
      type: blob.type,
    });
    return Promise.resolve(file);
  })
  .catch((error) => Promise.reject(error));
