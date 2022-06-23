import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { PopoverBody, PopoverHeader, PopoverHeaderBack } from '../../../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../../../layouts/Form';
import { getObjectSource, getParentKey } from '../../../../../utils/SourceValue';

import Color from '../../../../Elements/Color';
import RangeSlider from '../../../../Elements/RangeSlider';
import BorderWidth from '../../../../Elements/Borders/width';
import BorderRadius from '../../../../Elements/Borders/radius';
import BorderStyle from '../../../../Elements/SelectBorders';
import BoxShadow from '../../../../Elements/BoxShadow';
import Switch from '../../../../Elements/Switch';
import { dataChangeComponentData } from '../../../../../redux/actions/data/deps';
import { Animate, AnimateHiddenDiv } from '../../../../../layouts/Animate';
import Fonts from '../../../Fontsmanager/addFont';
import FontWeight from '../../../../Elements/FontWeight';
import RangeSliderRem from '../../../../Elements/RangeSliderFontSize';

const Component = ({
  dataID,
  blockID,
  componentName,
  currentComponentData,
  onBack,
  componentData,
  settings,
}) => {
  const components = useSelector((state) => state.components.data);
  const dispatch = useDispatch();
  const data = currentComponentData || componentData;

  const onChange = (source, value) => {
    const newData = _.cloneDeep(data);

    const keys = getParentKey({
      typeData: 'data',
      value: source,
    });

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      newData[keys.currentKey] = value;
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      newDataCurrentPath[keys.currentKey] = value;
    }
    dispatch(dataChangeComponentData(dataID, blockID, componentName, newData));
  };

  const onChangeFont = (fontOptions, value) => {
    const newData = _.cloneDeep(data);

    for (const key in fontOptions) {
      if (fontOptions.hasOwnProperty(key) && fontOptions[key]) {
        let newValue = value[key];
        if (key === 'font_style') {
          if (!value[key]) {
            newValue = 'normal';
          }
        }
        if (key === 'font_weight') {
          if (!value[key]) {
            newValue = '400';
          }
        }
        const keys = getParentKey({
          typeData: 'data',
          value: fontOptions[key],
        });

        if (keys.currentPath === 'default' || keys.currentPath === false) {
          newData[keys] = newValue;
        } else {
          const newDataFont = getObjectSource(newData, keys.currentPath);
          newDataFont[keys.currentKey] = newValue;
        }
      }
    }
    dispatch(dataChangeComponentData(dataID, blockID, componentName, newData));
  };

  const onChangeBorder = (sides, value) => {
    const newData = _.cloneDeep(data);

    for (const key in sides) {
      if (sides.hasOwnProperty(key) && sides[key]) {
        const keys = getParentKey({
          typeData: 'data',
          value: sides[key],
        });
        if (keys.currentPath === 'default' || keys.currentPath === false) {
          newData[keys.currentPath] = value[key];
        } else {
          const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
          newDataCurrentPath[keys.currentKey] = value[key];
        }
      }
    }

    dispatch(dataChangeComponentData(dataID, blockID, componentName, newData));
  };

  return (
    <>
      <PopoverHeader>
        <PopoverHeaderBack onClick={() => onBack(false)} />
        <Animate animate="animated slideInRight faster-3">{settings.title}</Animate>
      </PopoverHeader>
      <PopoverBody>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            {settings.data.map((item, index) => {
              const val = getObjectSource(data, item.value);
              switch (item.element) {
                case 'font':
                  const fontFamily = getObjectSource(data, item.font_family);
                  const fontId = getObjectSource(data, item.font_id);
                  const fontWeight = getObjectSource(data, item.font_weight);
                  const fontStyle = getObjectSource(data, item.font_style);

                  const fontIdDefault = item.fond_id_default
                    ? getObjectSource(components, item.fond_id_default)
                    : false;
                  const fontFamilyDefault = item.fond_family_default
                    ? getObjectSource(components, item.fond_family_default)
                    : false;

                  const onChangeOptions = {
                    font_weight: item.font_weight,
                    font_style: item.font_style,
                  };

                  if (fontFamily && fontFamily !== 'not found') {
                    onChangeOptions.font_family = item.font_family;
                  }
                  if (fontId && fontId !== 'not found') {
                    onChangeOptions.font_id = item.font_id;
                  }

                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <Fonts
                          fontFamily={fontFamily === 'not found' && fontFamilyDefault ? fontFamilyDefault : fontFamily}
                          fontId={fontId === 'not found' && fontIdDefault ? fontIdDefault : fontId}
                          fontFamilyDisabled={item.font_family_disabled || false}
                          fontWeight={fontWeight}
                          fontWeightDisabled={item.font_family_weight || false}
                          fontStyle={fontStyle}
                          onChange={(value) => onChangeFont(onChangeOptions, value)}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'color':
                  return (
                    <FormGroup key={index}>
                      <FormHorizontal label={item.label}>
                        <Color
                          value={val}
                          solid={item.solid}
                          gradient={item.gradient}
                          onChange={(value) => onChange(item.value, value)}
                        />
                      </FormHorizontal>
                    </FormGroup>
                  );
                case 'switch':
                  return (
                    <FormGroup key={index}>
                      <FormHorizontal label={item.label}>
                        <Switch value={val} onChange={(value) => onChange(item.value, value)} />
                      </FormHorizontal>
                    </FormGroup>
                  );
                case 'range_slider':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <RangeSlider
                          value={val}
                          onChange={(value) => onChange(item.value, value)}
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
                          value={val}
                          onChange={(value) => onChange(item.value, value)}
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          input
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_style':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderStyle value={val} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'box_shadow':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BoxShadow value={val} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_width':
                  const borderWidthFirstSide = getObjectSource(data, item.first_side);
                  const borderWidthSecondSide = getObjectSource(data, item.second_side);
                  const borderWidthThirdSide = getObjectSource(data, item.third_side);
                  const borderWidthFourthSide = getObjectSource(data, item.fourth_side);
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderWidth
                          value={val}
                          first_side={borderWidthFirstSide}
                          second_side={borderWidthSecondSide}
                          third_side={borderWidthThirdSide}
                          fourth_side={borderWidthFourthSide}
                          onChange={(value) => onChangeBorder(
                            {
                              first_side: item.first_side ? item.first_side : false,
                              second_side: item.second_side ? item.second_side : false,
                              third_side: item.third_side ? item.third_side : false,
                              fourth_side: item.fourth_side ? item.fourth_side : false,
                            },
                            value,
                          )}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'border_radius':
                  const borderRadiusFirstSide = getObjectSource(data, item.first_side);
                  const borderRadiusSecondSide = getObjectSource(data, item.second_side);
                  const borderRadiusThirdSide = getObjectSource(data, item.third_side);
                  const borderRadiusFourthSide = getObjectSource(data, item.fourth_side);
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <BorderRadius
                          value={val}
                          first_side={borderRadiusFirstSide}
                          second_side={borderRadiusSecondSide}
                          third_side={borderRadiusThirdSide}
                          fourth_side={borderRadiusFourthSide}
                          onChange={(value) => onChangeBorder(
                            {
                              first_side: item.first_side ? item.first_side : false,
                              second_side: item.second_side ? item.second_side : false,
                              third_side: item.third_side ? item.third_side : false,
                              fourth_side: item.fourth_side ? item.fourth_side : false,
                            },
                            value,
                          )}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'font_weight':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <FontWeight
                          value={val}
                          theme="dark"
                          onChange={(value) => onChange(item.value, value.value)}
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
    </>
  );
};

Component.propTypes = {
  dataID: PropTypes.number,
  blockID: PropTypes.number,
  componentName: PropTypes.string,
  currentComponentData: PropTypes.object,
  onBack: PropTypes.func,
  componentData: PropTypes.object,
  settings: PropTypes.object,
};

export default Component;
