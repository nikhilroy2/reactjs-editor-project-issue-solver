import React, { useEffect, useState, useRef } from 'react';
import './_settings_card.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../layouts/Form';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Color from '../../Elements/Color';
import Container from '../../Elements/Container';
import Alignment from '../../Elements/Alignment';
import RangeSlider from '../../Elements/RangeSlider';
import BoxShadow from '../../Elements/BoxShadow';
import Switch from '../../Elements/Switch';
import SelectButton from '../../Elements/SelectButton';
import BorderWidth from '../../Elements/Borders/width';
import BorderRadius from '../../Elements/Borders/radius';
import LogoType from '../../Elements/LogoType';
import VideoLink from '../../Elements/VideoLink';
import Image from '../../Elements/Image';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
// import BorderStyle from "../SettingsComponent/Component";
import BorderStyle from '../../Elements/SelectBorders';
import { fitsOnScreen } from '../../../utils/helpers';
import { depsChangeValues } from '../../../redux/actions/data/deps';
import FontWeight from '../../Elements/FontWeight';
import RangeSliderRem from '../../Elements/RangeSliderFontSize';

const SettingsCard = ({
  dataID, settings, rootNode, onClose,
}) => {
  const dispatch = useDispatch();
  const data = Methods.getData(dataID);
  const settingsData = settings || false;

  const target = usePortal();
  const node = useRef(null);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const [position, setPosition] = useState(false);
  const [fits, setFits] = useState(false);
  useEffect(() => {
    const position = getPosition(rootNode, node, {
      direction: 'center bottom',
      margin: 8,
    });
    setFits(true);
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootNode]);

  useEffect(() => {
    if (position && fits) {
      const fits = fitsOnScreen(node.current);
      if (!fits.right) {
        const position = getPosition(rootNode, node, {
          direction: 'right bottom',
          margin: 8,
        });
        setPosition(position);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fits]);

  const onChange = (source, value, request = false) => {
    if (source && _.isObject(source) && source.hasOwnProperty('typeData')) {
      const keys = getParentKey(source);
      const isNotCurrentPath = keys.currentPath === 'default' || keys.currentPath === false;
      switch (source.typeData) {
        case 'data':
          const newData = _.cloneDeep(data.data);

          if (isNotCurrentPath) {
            dispatch(dataChangeValues(value, keys.parentKey, dataID));
          } else {
            const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
            newDataCurrentPath[keys.currentKey] = value;

            dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
          }
          break;
        case 'deps':
          const newDeps = _.cloneDeep(data.deps);

          if (isNotCurrentPath) {
            dispatch(depsChangeValues(value, keys.parentKey, dataID, request));
          } else {
            const newDataCurrentPath = getObjectSource(newDeps, keys.currentPath);
            newDataCurrentPath[keys.currentKey] = value;

            dispatch(depsChangeValues(newDeps[keys.parentKey], keys.parentKey, dataID, request));
          }
          break;
        default:
          break;
      }
    }
  };

  const onChangeBorder = () => {};

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>Edit settings</PopoverHeader>
      <PopoverBody>
        {settingsData.map((item, index) => {
          const val = item.value && item.value.source ? getSourceValue(item.value.source, dataID) : false;
          const request = item.request;
          switch (item.element) {
            case 'color':
              return (
                <FormGroup key={index}>
                  <FormHorizontal label={item.label}>
                    <Color value={val} onChange={(value) => onChange(item.value.source, value, request)} />
                  </FormHorizontal>
                </FormGroup>
              );
            case 'block_structure':
              return (
                <FormGroup key={`settings_${index}`}>
                  <FormVertical label={item.label || false}>
                    <Container value={val} onChange={(value) => onChange(item.value.source, value)} />
                  </FormVertical>
                </FormGroup>
              );
            case 'logo_type':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <LogoType value={val} onChange={(value) => onChange(item.value.source, value)} />
                  </FormVertical>
                </FormGroup>
              );
            case 'video_link':
              const type = getSourceValue(item.type.source, dataID);
              const url = getSourceValue(item.url.source, dataID);
              return (
                <VideoLink
                  key={index}
                  onChangeType={(value) => onChange(item.type.source, value)}
                  onChangeUrl={(value) => onChange(item.url.source, value)}
                  type={type}
                  url={url}
                />
              );
            case 'image':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <Image value={val} onChange={(value) => onChange(item.value.source, value)} />
                  </FormVertical>
                </FormGroup>
              );
            case 'switch':
              return (
                <FormGroup key={index}>
                  <FormHorizontal label={item.label}>
                    <Switch value={val} onChange={(value) => onChange(item.value.source, value)} />
                  </FormHorizontal>
                </FormGroup>
              );
            case 'range_slider':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <RangeSlider
                      value={val}
                      onChange={(value) => onChange(item.value.source, value, request)}
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      input={item.input || false}
                      units={item.units ? item.units : false}
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
                      onChange={(value) => onChange(item.value.source, value, request)}
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      input={item.input || false}
                      units={item.units ? item.units : false}
                    />
                  </FormVertical>
                </FormGroup>
              );
            case 'border_style':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <BorderStyle value={val} onChange={(value) => onChange(item.value.source, value)} />
                  </FormVertical>
                </FormGroup>
              );
            case 'alignment':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <Alignment value={val} onChange={(value) => onChange(item.value.source, value)} />
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
                      onChange={(value) => onChangeBorder(item.value, value)}
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
                      onChange={(value) => onChangeBorder(item.value, value)}
                    />
                  </FormVertical>
                </FormGroup>
              );
            case 'select_buttons':
              return (
                <FormGroup key={index}>
                  <FormVertical label={item.label}>
                    <SelectButton
                      value={val}
                      options={item.options}
                      onChange={(value) => onChange(item.value.source, value)}
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
                      onChange={(value) => onChange(item.value.source, value.value)}
                    />
                  </FormVertical>
                </FormGroup>
              );
            default:
              return null;
          }
        })}
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default SettingsCard;
