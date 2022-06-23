import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { PopoverBody, PopoverHeader, PopoverHeaderBack } from '../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../layouts/Form';
import Color from '../../Elements/Color';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Methods from '../../../utils/Methods/index';
import BorderRadius from '../../Elements/Borders/radius';
import BorderWidth from '../../Elements/Borders/width';
import BorderStyle from '../../Elements/SelectBorders';
import BoxShadow from '../../Elements/BoxShadow';
import TextShadow from '../../Elements/TextShadow';
import IconRadius from '../../Elements/IconShape';
import RangeSlider from '../../Elements/RangeSlider';
import { Animate, AnimateHiddenDiv } from '../../../layouts/Animate';

const IconStyles = ({ onChangeActiveTab, dataID, settingIcon }) => {
  const dispatch = useDispatch();
  const styles = settingIcon.styles ? settingIcon.styles : false;

  const onChange = (source, value) => {
    const data = Methods.getData(dataID);
    const newData = data !== 'not found' ? _.cloneDeep(data.data) : false;

    if (newData) {
      const keys = getParentKey(source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(value, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = value;
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  const onChangeBorder = (sides, value) => {
    const newData = _.cloneDeep(Methods.getData(dataID).data);

    for (const key in sides) {
      if (sides.hasOwnProperty(key) && sides[key]) {
        const keys = getParentKey(sides[key]);

        if (keys.currentPath === 'default' || keys.currentPath === false) {
          newData[keys] = value[key];
        } else {
          const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
          newDataCurrentPath[keys.currentKey] = value[key];
          dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
        }
      }
    }
  };

  return (
    <>
      <PopoverHeader>
        <PopoverHeaderBack onClick={() => onChangeActiveTab(0)} />
        <Animate animate="animated slideInRight faster-3">Icon style</Animate>
      </PopoverHeader>
      <PopoverBody overflow>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            {styles.map((item, index) => {
              const val = item.value ? getSourceValue(item.value.source, dataID) : false;
              const defaultVal = item.default_value ? getSourceValue(item.default_value.source, dataID) : false;
              const value = val || defaultVal;

              switch (item.element) {
                case 'color':
                  return (
                    <FormGroup key={index}>
                      <FormHorizontal label={item.label}>
                        <Color
                          value={value}
                          onChange={(value) => onChange(item.value.source, value)}
                          gradient={item.gradient || false}
                          solid={item.solid || false}
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
                case 'text_shadow':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <TextShadow value={value} onChange={(value) => onChange(item.value.source, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'icon_radius':
                  return (
                    <FormGroup key={index}>
                      <FormVertical label={item.label}>
                        <IconRadius value={value} onChange={(value) => onChange(item.value.source, value)} />
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
                  const defaultBorderRadiusFirstSide = getSourceValue(item.default_first_side.source, dataID);
                  const borderRadiusFirstSide = currentBorderRadiusFirstSide || defaultBorderRadiusFirstSide;

                  const currentBorderRadiusSecondSide = getSourceValue(item.second_side.source, dataID);
                  const defaultBorderRadiusSecondSide = getSourceValue(item.default_second_side.source, dataID);
                  const borderRadiusSecondSide = currentBorderRadiusSecondSide || defaultBorderRadiusSecondSide;

                  const currentBorderRadiusThirdSide = getSourceValue(item.third_side.source, dataID);
                  const defaultBorderRadiusThirdSide = getSourceValue(item.default_third_side.source, dataID);
                  const borderRadiusThirdSide = currentBorderRadiusThirdSide || defaultBorderRadiusThirdSide;

                  const currentBorderRadiusFourthSide = getSourceValue(item.fourth_side.source, dataID);
                  const defaultBorderRadiusFourthSide = getSourceValue(item.default_fourth_side.source, dataID);
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
                  const defaultBorderWidthFirstSide = getSourceValue(item.default_first_side.source, dataID);
                  const borderWidthFirstSide = currentBorderWidthFirstSide || defaultBorderWidthFirstSide;

                  const currentBorderWidthSecondSide = getSourceValue(item.second_side.source, dataID);
                  const defaultBorderWidthSecondSide = getSourceValue(item.default_second_side.source, dataID);
                  const borderWidthSecondSide = currentBorderWidthSecondSide || defaultBorderWidthSecondSide;

                  const currentBorderWidthThirdSide = getSourceValue(item.third_side.source, dataID);
                  const defaultBorderWidthThirdSide = getSourceValue(item.default_third_side.source, dataID);
                  const borderWidthThirdSide = currentBorderWidthThirdSide || defaultBorderWidthThirdSide;

                  const currentBorderWidthFourthSide = getSourceValue(item.fourth_side.source, dataID);
                  const defaultBorderWidthFourthSide = getSourceValue(item.default_fourth_side.source, dataID);
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
    </>
  );
};

IconStyles.propTypes = {
  onChangeActiveTab: PropTypes.func,
  dataID: PropTypes.number,
  settingIcon: PropTypes.object,
};

export default IconStyles;
