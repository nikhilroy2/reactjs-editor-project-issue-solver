import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './_component.scss';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import {
  ModalHeader,
  ModalBody,
  ModalHeaderArrowBack,
} from '../../../../layouts/Modal';
import Collapse from '../../../../layouts/Collapse';
import {
  FormGroup,
  FormVertical,
  FormHorizontal,
} from '../../../../layouts/Form';
import Color from '../../../Elements/Color';
import RangeSlider from '../../../Elements/RangeSlider';
import RangeSliderRem from '../../../Elements/RangeSliderFontSize';
import BorderStyle from '../../../Elements/SelectBorders';
import BorderWidth from '../../../Elements/Borders/width';
import BorderRadius from '../../../Elements/Borders/radius';
import BoxShadow from '../../../Elements/BoxShadow';
import Switch from '../../../Elements/Switch';
import { componentsChangeData } from '../../../../redux/actions/Components';
import { getObjectSource, getParentKey } from '../../../../utils/SourceValue';
import Render from './Render';
import { getComponent } from './helper';
import { ReactComponent as IconPrev } from '../../../../assets/img/arrow-prev.svg';
import { Animate, AnimateHiddenDiv } from '../../../../layouts/Animate';
import Fonts from '../../../Popups/Fontsmanager/addFont';
import EmptySettings from '../EmptyStates/EmptySettings';
import FontWeight from '../../../Elements/FontWeight';

const Component = ({ component, onClose, onOpenList }) => {
  const data = useSelector((state) => state.components.data);
  const configuration = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [customItem, setCustomItem] = useState('default');

  const onChange = (key, value) => {
    const newData = _.cloneDeep(data[component.key].data);

    const keys = getParentKey({
      typeData: 'data',
      value: key,
    });

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      newData[keys.parentKey] = value;
    } else {
      const newDataFont = getObjectSource(newData, keys.currentPath);
      newDataFont[keys.currentKey] = value;
    }
    dispatch(componentsChangeData(newData, false, component.key));
  };

  const onChangeBorder = (sides, value) => {
    const newData = _.cloneDeep(data[component.key].data);

    for (const key in sides) {
      if (sides.hasOwnProperty(key) && sides[key]) {
        const keys = getParentKey({
          typeData: 'data',
          value: sides[key],
        });

        if (keys.currentPath === 'default' || keys.currentPath === false) {
          newData[keys] = value[key];
        } else {
          const newDataBorder = getObjectSource(newData, keys.currentPath);
          newDataBorder[keys.currentKey] = value[key];
        }
      }
    }

    dispatch(componentsChangeData(newData, false, component.key));
  };

  const onChangeFont = (fontOptions, value) => {
    const newData = _.cloneDeep(data[component.key].data);

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
    dispatch(componentsChangeData(newData, false, component.key));
  };

  const componentSettings = getComponent(data, component.key);

  const [isOpen, setOpen] = useState(
    componentSettings.settings[customItem].map(() => false),
  );

  const onClick = (index) => () => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setOpen(newIsOpen);
  };

  useEffect(() => {
    setOpen((prevState) => prevState.map(() => false));
  }, [customItem]);

  return (
    <>
      <ModalHeader onClose={onClose}>
        <ModalHeaderArrowBack onClick={onOpenList} />
        <Animate animate="animated slideInRight faster-3">
          {`Edit ${component.title}`}
        </Animate>
      </ModalHeader>
      <ModalBody>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            <div className="editor__component scrollbar-light">
              <div className="editor__component-preview body">
                {componentSettings.template.all ? (
                  <Render
                    activeItem={customItem}
                    domElement={componentSettings.template.all}
                    data={componentSettings.data}
                    onClick={(value) => setCustomItem(value)}
                  />
                ) : (
                  'Not preview'
                )}
              </div>
              <SwitchTransition>
                <CSSTransition
                  timeout={300}
                  key={customItem}
                  addEndListener={(node, done) => {
                    node.addEventListener('transitionend', done, false);
                  }}
                  classNames={{
                    enter: 'animated faster-1',
                    enterActive: 'slideInRight',
                    appear: 'animated faster-1',
                    appearActive: 'slideInRight',
                    exit: 'animated faster-1',
                    exitActive: 'slideOutRight',
                  }}
                >
                  <div className="editor__component-settings-block">
                    {customItem !== 'default' ? (
                      <div className="editor__component-settings-header">
                        <div
                          className="editor__component-settings-back"
                          onClick={() => setCustomItem('default')}
                        >
                          <div className="editor__component-settings-back-icon">
                            <IconPrev />
                          </div>
                          <div className="editor__component-settings-back-title">
                            Back
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {customItem === 'default'
                    && componentSettings.settings[customItem].length ? (
                      <div className="editor__component-settings-header">
                        <div className="editor__component-settings-back">
                          <div className="editor__component-settings-back-title editor__component-settings-base">
                            General
                          </div>
                        </div>
                      </div>
                      ) : null}
                    <div className="editor__component-settings">
                      <>
                        {componentSettings.settings[customItem].length ? (
                          componentSettings.settings[customItem].map(
                            (category, index) => {
                              if (category.show) {
                                if (category.show.type === 'config') {
                                  if (configuration[category.show.value]) {
                                    return null;
                                  }
                                }
                              }
                              return (
                                <Collapse
                                  title={category.title}
                                  isOpen={isOpen[index]}
                                  onClick={onClick(index)}
                                >
                                  <div className="editor__sidebar-pages__collapse-body">
                                    <div className="editor__component-settings-body">
                                      {category.data.map((item) => {
                                        const val = getObjectSource(
                                          componentSettings.data,
                                          item.value,
                                        );
                                        switch (item.element) {
                                          case 'font':
                                            const fontFamily = getObjectSource(
                                              componentSettings.data,
                                              item.font_family,
                                            );
                                            const fontId = getObjectSource(
                                              componentSettings.data,
                                              item.font_id,
                                            );
                                            const fontWeight = getObjectSource(
                                              componentSettings.data,
                                              item.font_weight,
                                            );
                                            const fontStyle = getObjectSource(
                                              componentSettings.data,
                                              item.font_style,
                                            );

                                            const fontIdDefault = item.fond_id_default
                                              ? getObjectSource(
                                                data,
                                                item.fond_id_default,
                                              )
                                              : false;
                                            const fontFamilyDefault = item.fond_family_default
                                              ? getObjectSource(
                                                data,
                                                item.fond_family_default,
                                              )
                                              : false;

                                            const onChangeOptions = {
                                              font_weight: item.font_weight,
                                              font_style: item.font_style,
                                            };

                                            if (
                                              fontFamily
                                              && fontFamily !== 'not found'
                                            ) {
                                              onChangeOptions.font_family = item.font_family;
                                            }
                                            if (
                                              fontId
                                              && fontId !== 'not found'
                                            ) {
                                              onChangeOptions.font_id = item.font_id;
                                            }

                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <Fonts
                                                    fontFamily={
                                                      fontFamily
                                                      === 'not found'
                                                        && fontFamilyDefault
                                                        ? fontFamilyDefault
                                                        : fontFamily
                                                    }
                                                    fontId={
                                                      fontId
                                                      === 'not found'
                                                      && fontIdDefault
                                                        ? fontIdDefault
                                                        : fontId
                                                    }
                                                    fontFamilyDisabled={
                                                      item.font_family_disabled
                                                      || false
                                                    }
                                                    fontWeight={fontWeight}
                                                    fontWeightDisabled={
                                                      item.font_family_weight
                                                      || false
                                                    }
                                                    fontStyle={fontStyle}
                                                    onChange={(value) => onChangeFont(
                                                      onChangeOptions,
                                                      value,
                                                    )}
                                                  />
                                                </FormVertical>
                                              </FormGroup>
                                            );
                                          case 'color':
                                            return (
                                              <FormGroup>
                                                <FormHorizontal
                                                  label={item.label}
                                                >
                                                  <Color
                                                    value={val}
                                                    gradient={
                                                      item.gradient || false
                                                    }
                                                    onChange={(value) => onChange(item.value, value)}
                                                  />
                                                </FormHorizontal>
                                              </FormGroup>
                                            );
                                          case 'switch':
                                            return (
                                              <FormGroup>
                                                <FormHorizontal
                                                  label={item.label}
                                                >
                                                  <Switch
                                                    value={val}
                                                    onChange={(value) => onChange(item.value, value)}
                                                  />
                                                </FormHorizontal>
                                              </FormGroup>
                                            );
                                          case 'box_shadow':
                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <BoxShadow
                                                    value={val}
                                                    onChange={(value) => onChange(item.value, value)}
                                                  />
                                                </FormVertical>
                                              </FormGroup>
                                            );
                                          case 'range_slider':
                                            return (
                                              <FormGroup>
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
                                              <FormGroup>
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
                                            )
                                          case 'font_weight':
                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <FontWeight
                                                    value={val}
                                                    onChange={(value) => onChange(item.value, value.value)}
                                                  />
                                                </FormVertical>
                                              </FormGroup>
                                            )
                                          case 'border_style':
                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <BorderStyle
                                                    value={val}
                                                    onChange={(value) => onChange(item.value, value)}
                                                  />
                                                </FormVertical>
                                              </FormGroup>
                                            );
                                          case 'border_width':
                                            const borderWidthFirstSide = getObjectSource(
                                              componentSettings.data,
                                              item.first_side,
                                            );
                                            const borderWidthSecondSide = getObjectSource(
                                              componentSettings.data,
                                              item.second_side,
                                            );
                                            const borderWidthThirdSide = getObjectSource(
                                              componentSettings.data,
                                              item.third_side,
                                            );
                                            const borderWidthFourthSide = getObjectSource(
                                              componentSettings.data,
                                              item.fourth_side,
                                            );
                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <BorderWidth
                                                    value={val}
                                                    first_side={
                                                      borderWidthFirstSide
                                                    }
                                                    second_side={
                                                      borderWidthSecondSide
                                                    }
                                                    third_side={
                                                      borderWidthThirdSide
                                                    }
                                                    fourth_side={
                                                      borderWidthFourthSide
                                                    }
                                                    onChange={(value) => onChangeBorder(
                                                      {
                                                        first_side:
                                                            item.first_side
                                                            || false,
                                                        second_side:
                                                            item.second_side
                                                            || false,
                                                        third_side:
                                                            item.third_side
                                                            || false,
                                                        fourth_side:
                                                            item.fourth_side
                                                            || false,
                                                      },
                                                      value,
                                                    )}
                                                  />
                                                </FormVertical>
                                              </FormGroup>
                                            );
                                          case 'border_radius':
                                            const borderRadiusFirstSide = getObjectSource(
                                              componentSettings.data,
                                              item.first_side,
                                            );
                                            const borderRadiusSecondSide = getObjectSource(
                                              componentSettings.data,
                                              item.second_side,
                                            );
                                            const borderRadiusThirdSide = getObjectSource(
                                              componentSettings.data,
                                              item.third_side,
                                            );
                                            const borderRadiusFourthSide = getObjectSource(
                                              componentSettings.data,
                                              item.fourth_side,
                                            );
                                            return (
                                              <FormGroup>
                                                <FormVertical label={item.label}>
                                                  <BorderRadius
                                                    value={val}
                                                    first_side={
                                                      borderRadiusFirstSide
                                                    }
                                                    second_side={
                                                      borderRadiusSecondSide
                                                    }
                                                    third_side={
                                                      borderRadiusThirdSide
                                                    }
                                                    fourth_side={
                                                      borderRadiusFourthSide
                                                    }
                                                    onChange={(value) => onChangeBorder(
                                                      {
                                                        first_side:
                                                            item.first_side
                                                            || false,
                                                        second_side:
                                                            item.second_side
                                                            || false,
                                                        third_side:
                                                            item.third_side
                                                            || false,
                                                        fourth_side:
                                                            item.fourth_side
                                                            || false,
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
                                    </div>
                                  </div>
                                </Collapse>
                              )
                            },
                          )
                        ) : (
                          <EmptySettings />
                        )}
                      </>
                    </div>
                  </div>
                </CSSTransition>
              </SwitchTransition>
            </div>
          </Animate>
        </AnimateHiddenDiv>
      </ModalBody>
    </>
  );
};

Component.propTypes = {
  component: PropTypes.object,
  onClose: PropTypes.func,
  onOpenList: PropTypes.func,
};

export default Component;
