import Methods from '../../../utils/Methods/index';
import { getSourceValue } from '../../../utils/SourceValue';

export const getBlurPX = (blur) => {
  const string = blur;
  const regex = /[0-9]*\.?[0-9]+(px|%)?/i;
  const matches = string.match(regex);
  return matches[0];
};

export const getSettingsBackground = (blockID, dataID) => {
  if (blockID && dataID) {
    const block = Methods.getData(dataID);

    if (block && block.data) {
      if (block.data) {
        const { background } = block.data.styles;
        const styles = {};

        if (background.background_image) {
          Object.keys(background).forEach((key) => {
            const val = getSourceValue(
              {
                typeData: 'data',
                value: `styles.background.${key}`,
              },
              dataID,
            );

            if (val !== 'not found') {
              switch (key) {
                case 'background_position':
                  styles.backgroundPosition = val;
                  break;
                case 'background_size':
                  styles.backgroundSize = val;
                  break;
                case 'background_repeat':
                  styles.backgroundRepeat = val;
                  break;
                default:
                  break;
              }
            }
          });
        }

        const settings = [];
        Object.keys(background).forEach((key) => {
          switch (key) {
            case 'background_color':
              settings.push({
                label: 'Background color',
                element: 'color',
                gradient: false,
                solid: true,
                value: {
                  typeData: 'data',
                  value: `styles.background.${key}`,
                },
              });
              break;
            case 'background_image':
              settings.push({
                label: 'Background image',
                element: 'background',
                values: {
                  background: {
                    typeData: 'data',
                    value: `styles.background.${key}`,
                  },
                  position: background.background_position
                    ? {
                      typeData: 'data',
                      value: 'styles.background.background_position',
                    }
                    : false,
                },
                styles,
              });
              break;
            case 'background_size':
              settings.push({
                label: 'Background size',
                element: 'background_size',
                values: {
                  size: {
                    typeData: 'data',
                    value: `styles.background.${key}`,
                  },
                  repeat: background.background_repeat
                    ? {
                      typeData: 'data',
                      value: 'styles.background.background_repeat',
                    }
                    : false,
                },
                units: '%',
                step: 0,
                min: 0,
                max: 500,
              });
              break;
            case 'background_overlay_color':
              settings.push({
                label: 'Color overlay',
                element: 'color',
                gradient: true,
                solid: true,
                value: {
                  typeData: 'data',
                  value: `styles.background.${key}`,
                },
              });
              break;
            case 'background_attachment':
              settings.push({
                label: 'Use parallax effect',
                element: 'switch',
                value: {
                  typeData: 'data',
                  value: `styles.background.${key}`,
                },
              });
              break;
            case 'background_blur':
              settings.push({
                label: 'Blur',
                element: 'range_slider',
                value: {
                  typeData: 'data',
                  value: `styles.background.${key}`,
                },
                min: 0,
                max: 5,
                step: 1,
                input: true,
              });
              break;
            default:
              break;
          }
        });

        return settings;
      }
    }
  }

  return false;
};
