import { createSelector } from 'reselect';
import _ from 'lodash';
import { parseLabelString } from './helper';

const fontsSelector = (state) => state.fonts;
export const mapFontsSelector = createSelector(
  [fontsSelector], (fonts) => {
    const { fontsData, activeFonts } = fonts;

    const subsets = fontsData.reduce((result, current) => {
      result.push(...current.subsets)
      return _.uniq(result)
    }, ['all languages']).sort();

    const subsetsOptions = subsets.map((item) => ({
      value: item,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    }))

    const active = fontsData.reduce((result, current) => {
      for (const key in activeFonts) {
        if (activeFonts[key].font_id === current.id) {
          result.push({
            id: Number(current.id),
            family: current.family,
            // select
            value: current.family,
            label: current.family,
            subsets: current.subsets,
            variants: current.variants.map((item) => ({
              value: Object.keys(item)[0],
              link: item[Object.keys(item)[0]].source_link,
              label: parseLabelString(Object.keys(item)[0]).label,
              weight: parseLabelString(Object.keys(item)[0]).weight,
              style: parseLabelString(Object.keys(item)[0]).style,
            })),
            locked: activeFonts[key].locked,
          })
        }
      }
      return result
    }, []);

    return {
      ...fonts,
      subsets,
      subsetsOptions,
      fontsData,
      activeFonts: active,
    }
  },
);
