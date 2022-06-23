import { getObjectSource } from '../../../utils/SourceValue';

const landingKeys = ['landing', 'theme_2_landing', 'theme_3_landing'];

export const getLandingDividers = (currentData, key, direction, componentsData, dataID) => {
  if (componentsData) {
    const landingIndex = landingKeys.findIndex((componentKey) => !!componentsData[componentKey])
    const landing = landingIndex === -1 ? landingKeys[0] : landingKeys[landingIndex];

    if (componentsData[landing].data) {
      const { data } = componentsData[landing];

      if (data[dataID]) {
        const source = `styles.divider_${direction}.${key}`;
        const dividerData = getObjectSource(data[dataID], source);
        if (dividerData !== 'not found') {
          return dividerData;
        }
      }
    }
  }
  return false;
};
