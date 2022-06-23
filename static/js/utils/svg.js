/* eslint-disable */
export const getSvgString = (svg, color) => svg.replace(/(\{\{)(.*?)(\}\})/gi, (val) => {
  if (val) {
    return color;
  }
});

export const createBase64Divider = (color, svg) => {
  if (color && svg) {
    try {
      const svgString = getSvgString(svg, color);
      const placeholder = document.createElement('div');
      placeholder.innerHTML = svgString;

      const svgNode = placeholder.firstChild;
      const canvas = document.createElement('canvas');
      const body = document.getElementsByTagName('body')[0];
      let canvasTmp;
      let svg_xml;
      let ctx;
      let img;

      canvas.id = 'canvas';
      canvas.width = svgNode.getBoundingClientRect().width;
      canvas.height = svgNode.getBoundingClientRect().height;

      body.appendChild(canvas);
      canvasTmp = document.getElementById('canvas');

      svg_xml = (new XMLSerializer()).serializeToString(svgNode);
      ctx = canvasTmp.getContext('2d');
      img = new Image();

      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };

      img.src = `data:image/svg+xml;base64,${btoa(svg_xml)}`;

      canvasTmp.remove();
      return `url(${img.src})`;
    } catch (error) {
      const { message } = error;

      if (message) {
        console.error(message);
      }
    }
  }

  return new Error('Not found color, svg')
};
