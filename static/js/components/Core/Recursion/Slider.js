import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { getSourceValue } from '../../../utils/SourceValue';

// eslint-disable-next-line
const SlickSlider = forwardRef((props, ref) => {
  const { domElement, children, dataID } = props;

  if (domElement) {
    if (domElement.slider) {
      const { settings, data } = domElement.slider;
      const defaultSettings = {
        draggable: false,
      };

      const dataSettings = getSourceValue(settings.source, dataID);
      const dataSlider = getSourceValue(data.source, dataID);

      const isSettings = dataSettings !== 'Not found' ? dataSettings : false;

      const isSlidesToShow = isSettings.slidesToShow || false;
      const isInfinite = isSettings.infinite || false;

      if (isInfinite && isSlidesToShow) {
        defaultSettings.infinite = dataSlider.length >= parseInt(isSettings.slidesToShow, 10);
      }

      const params = {
        ...dataSettings,
        ...defaultSettings,
        autoplaySpeed: Number(dataSettings.autoplaySpeed) || Number(defaultSettings.autoplaySpeed),
      };

      return <Slider {...params}>{children}</Slider>;
    }
  }

  return null;
});

SlickSlider.propTypes = {
  domElement: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  dataID: PropTypes.node,
};

export default SlickSlider;
