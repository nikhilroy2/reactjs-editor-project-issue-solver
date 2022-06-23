import urlParser from 'js-video-url-parser';
import Methods from '../../../utils/Methods';

const youtubeLink = (key) => `https://www.youtube.com/embed/${key}`;
const vimeoLink = (key) => `https://player.vimeo.com/video/${key}`;

export const validLink = (url, type) => {
  if (url) {
    const valid = urlParser.parse(url);
    if (valid && valid.provider === type) {
      switch (type) {
        case 'youtube':
          return youtubeLink(valid.id);
        case 'vimeo':
          return vimeoLink(valid.id);
        default:
          return false;
      }
    }
    return false;
  }
  return false;
};

export const getImagePoster = (file) => {
  if (file) {
    if (file.id) {
      const image = Methods.getFile(file.id);
      if (image) {
        return image.url;
      }
    }
  }
  return false;
};
