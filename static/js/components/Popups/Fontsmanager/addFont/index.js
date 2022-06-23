import './_add-font.scss';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import NewSelect from '../../../Elements/Select';
import Tooltip from '../../../Elements/Tooltip';

import { mapFontsSelector } from '../../../../redux/selectors/fonts';
import { getStartValues } from './helper';
import Fonts from '..';

const FontSelect = ({
  fontFamilyDisabled, fontWeight, fontWeightDisabled, fontStyle, fontId, onChange,
}) => {
  const fonts = useSelector((state) => mapFontsSelector(state));
  const { activeFonts } = fonts;

  const startValues = getStartValues(fontWeight, fontStyle, fontId, activeFonts);

  const [init, setInit] = useState(false);
  const [familyValue, setFamily] = useState(startValues.family);
  const [variants, setVariants] = useState(startValues.variants);
  const [variantValue, setVariantValue] = useState(startValues.variant);
  const [isOpenFonts, setOpenFonts] = useState(false);

  const handleChangeFamily = (option) => {
    if (!init) {
      setInit(true);
    }
    setFamily(option);
    setVariants(option.variants);
    setVariantValue(option.variants[0]);
  };

  const handleChangeVariant = (option) => {
    if (!init) {
      setInit(true);
    }
    setVariantValue(option);
  };

  useEffect(() => {
    if (init) {
      const obj = {
        font_family: familyValue.family,
        font_id: familyValue.id,
        font_weight: variantValue.weight,
        font_style: variantValue.style,
      };
      onChange(obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyValue, variants, variantValue, init]);

  return (
    <>
      <div className="editor__add-font">
        <div className="add-font__title">
          <Tooltip text="Add font">
            <div className="add-font_button" onClick={() => setOpenFonts(true)}>
              + ADD FONT
            </div>
          </Tooltip>
        </div>
        <div className="editor__fonts-select_wrap">
          <NewSelect
            noOptText="No fonts"
            options={activeFonts}
            activeValue={familyValue}
            handleChangeSelect={handleChangeFamily}
            isSearchable
            isDisabled={fontFamilyDisabled}
          />
          <NewSelect
            noOptText="No variants"
            options={variants}
            activeValue={variantValue}
            handleChangeSelect={handleChangeVariant}
            isSearchable
            isDisabled={fontWeightDisabled}
          />
        </div>
      </div>
      {isOpenFonts ? (
        <div id="open-font-modal">
          <Fonts onClose={() => setOpenFonts(false)} />
        </div>
      ) : null}
    </>
  );
};

FontSelect.defaultProps = {
  fontFamilyDisabled: false,
  fontWeightDisabled: false,
  fontStyle: 'italic',
  fontWeight: 500,
  fontId: 1,
  onChange: () => ({}),
};

FontSelect.propTypes = {
  fontWeight: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  fontStyle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fontId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontFamilyDisabled: PropTypes.bool,
  fontWeightDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FontSelect;
