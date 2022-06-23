import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { PopoverBody, PopoverHeader, PopoverHeaderBack } from '../../../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../../../layouts/Form';
import { dataChangeValues } from '../../../../../redux/actions/data/update';
import Color from '../../../../Elements/Color';
import RangeSlider from '../../../../Elements/RangeSlider';
import BoxShadow from '../../../../Elements/BoxShadow';
import BorderWidth from '../../../../Elements/Borders/width';
import BorderRadius from '../../../../Elements/Borders/radius';
import BorderStyle from '../../../../Elements/SelectBorders';
import Methods from '../../../../../utils/Methods/index';
import { getObjectSource, getParentKey, getSourceValue } from '../../../../../utils/SourceValue';
import { Animate, AnimateHiddenDiv } from '../../../../../layouts/Animate';
import RangeSliderRem from '../../../../Elements/RangeSliderFontSize';

const SettingsCard = ({
  dataID, settings, onBack, onClose,
}) => {
  const dispatch = useDispatch();
  const data = Methods.getData(dataID);
  const settingsData = settings && settings.data ? settings.data : false;
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const node = useRef(null);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (isOpenColorPicker) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  const onChange = (source, value) => {
    const newData = _.cloneDeep(data.data);
    const keys = getParentKey(source);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(value, keys.parentKey, dataID));
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      newDataCurrentPath[keys.currentKey] = value;
      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
    }
  };

  const onChangeBorder = (sides, value) => {
    const newData = _.cloneDeep(Methods.getData(dataID).data);
    let parentKey = '';

    for (const key in sides) {
      if (sides.hasOwnProperty(key) && sides[key]) {
        const keys = getParentKey(sides[key]);
        parentKey = keys.parentKey;
        if (keys.currentPath === 'default' || keys.currentPath === false) {
          newData[keys.currentPath] = value[key];
        } else {
          const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
          newDataCurrentPath[keys.currentKey] = value[key];
        }
      }
    }

    if (parentKey) {
      dispatch(dataChangeValues(newData[parentKey], parentKey, dataID));
    }
  };

  return (
    <div ref={node}>
      <PopoverHeader>
        <PopoverHeaderBack onClick={() => onBack(false)} />
        <Animate animate="animated slideInRight faster-3">{settings.title}</Animate>
      </PopoverHeader>
      <PopoverBody>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            {settingsData.map((item, index) => {
              const val = item.value ? getSourceValue(item.value.source, dataID) : false;
              const defaultVal = item.default_value ? getSourceValue(item.default_value.source, dataID) : false;
              const value = val || defaultVal;

              switch (item.element) {
                case 'color':
                  return (
                    <FormGroup key={index}>
                      <FormHorizontal label={item.label}>
                        <Color
                          solid={item.solid}
                          gradient={item.gradient}
                          value={value}
                          onChange={(value) => onChange(item.value.source, value)}
                        />
                      </FormHorizontal>
                    </FormGroup>
                  );
                case 'range_slider':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <RangeSlider
                          value={value}
                          onChange={(value) => onChange(item.value.source, value)}
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          input
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'font_size':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <RangeSliderRem
                          value={value}
                          onChange={(value) => onChange(item.value.source, value)}
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          base={item.base}
                          input
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_style':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderStyle value={value} onChange={(value) => onChange(item.value.source, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'box_shadow':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BoxShadow value={value} onChange={(value) => onChange(item.value.source, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_radius':
                  const currentBorderRadiusFirstSide = getSourceValue(item.first_side.source, dataID);
                  const defaultBorderRadiusFirstSide = item.default_first_side
                    ? getSourceValue(item.default_first_side.source, dataID)
                    : false;
                  const borderRadiusFirstSide = currentBorderRadiusFirstSide || defaultBorderRadiusFirstSide;

                  const currentBorderRadiusSecondSide = getSourceValue(item.second_side.source, dataID);
                  const defaultBorderRadiusSecondSide = item.default_second_side
                    ? getSourceValue(item.default_second_side.source, dataID)
                    : false;
                  const borderRadiusSecondSide = currentBorderRadiusSecondSide || defaultBorderRadiusSecondSide;

                  const currentBorderRadiusThirdSide = getSourceValue(item.third_side.source, dataID);
                  const defaultBorderRadiusThirdSide = item.default_third_side
                    ? getSourceValue(item.default_third_side.source, dataID)
                    : false;
                  const borderRadiusThirdSide = currentBorderRadiusThirdSide || defaultBorderRadiusThirdSide;

                  const currentBorderRadiusFourthSide = getSourceValue(item.fourth_side.source, dataID);
                  const defaultBorderRadiusFourthSide = item.default_fourth_side
                    ? getSourceValue(item.default_fourth_side.source, dataID)
                    : false;
                  const borderRadiusFourthSide = currentBorderRadiusFourthSide || defaultBorderRadiusFourthSide;

                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderRadius
                          value="0px"
                          first_side={borderRadiusFirstSide}
                          second_side={borderRadiusSecondSide}
                          third_side={borderRadiusThirdSide}
                          fourth_side={borderRadiusFourthSide}
                          onChange={(value) => onChangeBorder(
                            {
                              first_side: item.first_side ? item.first_side.source : false,
                              second_side: item.second_side ? item.second_side.source : false,
                              third_side: item.third_side ? item.third_side.source : false,
                              fourth_side: item.fourth_side ? item.fourth_side.source : false,
                            },
                            value,
                          )}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_width':
                  const currentBorderWidthFirstSide = getSourceValue(item.first_side.source, dataID);
                  const defaultBorderWidthFirstSide = item.default_first_side
                    ? getSourceValue(item.default_first_side.source, dataID)
                    : false;
                  const borderWidthFirstSide = currentBorderWidthFirstSide || defaultBorderWidthFirstSide;

                  const currentBorderWidthSecondSide = getSourceValue(item.second_side.source, dataID);
                  const defaultBorderWidthSecondSide = item.default_second_side
                    ? getSourceValue(item.default_second_side.source, dataID)
                    : false;
                  const borderWidthSecondSide = currentBorderWidthSecondSide || defaultBorderWidthSecondSide;

                  const currentBorderWidthThirdSide = getSourceValue(item.third_side.source, dataID);
                  const defaultBorderWidthThirdSide = item.default_third_side
                    ? getSourceValue(item.default_third_side.source, dataID)
                    : false;
                  const borderWidthThirdSide = currentBorderWidthThirdSide || defaultBorderWidthThirdSide;

                  const currentBorderWidthFourthSide = getSourceValue(item.fourth_side.source, dataID);
                  const defaultBorderWidthFourthSide = item.default_fourth_side
                    ? getSourceValue(item.default_fourth_side.source, dataID)
                    : false;
                  const borderWidthFourthSide = currentBorderWidthFourthSide || defaultBorderWidthFourthSide;

                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderWidth
                          value="0px"
                          first_side={borderWidthFirstSide}
                          second_side={borderWidthSecondSide}
                          third_side={borderWidthThirdSide}
                          fourth_side={borderWidthFourthSide}
                          onChange={(value) => onChangeBorder(
                            {
                              first_side: item.first_side ? item.first_side.source : false,
                              second_side: item.second_side ? item.second_side.source : false,
                              third_side: item.third_side ? item.third_side.source : false,
                              fourth_side: item.fourth_side ? item.fourth_side.source : false,
                            },
                            value,
                          )}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                default:
                  return null;
              }
            })}
          </Animate>
        </AnimateHiddenDiv>
      </PopoverBody>
    </div>
  );
};

SettingsCard.propTypes = {
  dataID: PropTypes.number,
  settings: PropTypes.object,
  onBack: PropTypes.func,
  onClose: PropTypes.func,
};

export default SettingsCard;
