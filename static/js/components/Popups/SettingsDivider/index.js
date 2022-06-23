import './_settings_divider.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import AnimateHeight from 'react-animate-height';
import _ from 'lodash';

import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { FormGroup, FormHorizontal, FormVertical } from '../../../layouts/Form';
import RangeSlider from '../../Elements/RangeSlider';
import Flip from '../../Elements/Flip';
import Arrangement from '../../Elements/Arrangement';
import Color from '../../Elements/Color';
import SelectDividers from '../../Elements/SelectDividers';

import { dataChangeValues } from '../../../redux/actions/data/update';
import usePortal from '../../../utils/usePortal';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { findRotate, getRepeat } from '../../../utils/dividers';
import { createBase64Divider } from '../../../utils/svg';
import { dividersList } from './constants';
import { getParentKey, getObjectSource } from '../../../utils/SourceValue';
import { getLandingDividers } from './helper';

const SettingsDivider = ({
  dataID, onClose, parentNode, direction, dividerData, source,
}) => {
  const dispatch = useDispatch();
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const componentsData = useSelector((state) => state.components.data);

  const target = usePortal();
  const node = useRef(null);
  const [position, setPosition] = useState(false);

  const selectedDividerID = Number(dividerData.id);
  const newStyles = _.cloneDeep(dividerData);

  const findData = Methods.getData(dataID);
  const { currentPath, parentKey, currentKey } = getParentKey(source);
  const newData = _.cloneDeep(getObjectSource(findData.data, currentPath));

  const outSideClick = (e) => {
    if (!isOpenColorPicker) {
      if (node.current && node.current.contains(e.target)) {
        return false;
      }
      return onClose(false);
    }

    return true;
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  useEffect(() => {
    const position = getPosition(parentNode, node, {
      direction: direction === 'top' ? 'center bottom' : 'center top',
      margin: direction === 'top' ? 12 : 12,
    });
    setPosition(position);
  }, [direction, parentNode]);

  const onChangeDivider = (value, id) => {
    newStyles.id = id;

    if (value) {
      try {
        const { flip } = dividerData;
        const { fill } = dividerData;
        const getFlip = findRotate(flip);
        const landingFill = getLandingDividers(value, 'fill', direction, componentsData, dataID);
        const dividerFill = _.isNull(fill) && landingFill ? landingFill : (fill || '#ffffff');

        if (getFlip.x) {
          const svg = direction === 'top' ? value.bottom : value.top;
          newStyles.image = createBase64Divider(dividerFill, svg);
        } else {
          const svg = direction === 'top' ? value.top : value.bottom;
          newStyles.image = createBase64Divider(dividerFill, svg);
        }

        newData[currentKey] = newStyles;
        return dispatch(dataChangeValues(newData, parentKey, dataID));
      } catch (error) {
        return new Error(error.message);
      }
    } else {
      newStyles.image = 'none';
      newData[currentKey] = newStyles;

      return dispatch(dataChangeValues(newData, parentKey, dataID));
    }
  };

  const onChangeColor = (value) => {
    try {
      newStyles.fill = value;
      const { id } = dividerData;
      const { flip } = dividerData;
      const getFlip = findRotate(flip);
      const selectedDivider = dividersList.findIndex((item) => {
        if (Number(item.id) === Number(id)) {
          return true;
        }

        return false;
      });
      if (getFlip.x) {
        const svg = direction === 'top' ? dividersList[selectedDivider].source.bottom : dividersList[selectedDivider].source.top;
        newStyles.image = createBase64Divider(value, svg);
      } else {
        const svg = direction === 'top' ? dividersList[selectedDivider].source.top : dividersList[selectedDivider].source.bottom;
        newStyles.image = createBase64Divider(value, svg);
      }

      newData[currentKey] = newStyles;
      return dispatch(dataChangeValues(newData, parentKey, dataID));
    } catch (error) {
      return new Error(error.message);
    }
  };

  const onChangeHeight = (value) => {
    newStyles.height = value;
    newStyles.size = `${newStyles.size.split(' ')[0]} ${value}`;

    newData[currentKey] = newStyles;
    dispatch(dataChangeValues(newData, parentKey, dataID));
  };

  const onChangeRepeat = (value) => {
    newStyles.size = `${parseInt(value, 10)}% ${newStyles.size.split(' ')[1]}`;

    newData[currentKey] = newStyles;
    dispatch(dataChangeValues(newData, parentKey, dataID));
  };

  const onChangeArrangement = (value) => {
    newStyles.zIndex = value;

    newData[currentKey] = newStyles;
    dispatch(dataChangeValues(newData, parentKey, dataID));
  };

  const onChangeFlip = (value) => {
    try {
      const getFlip = findRotate(value);
      newStyles.flip = value;
      const { id } = dividerData;
      const { fill } = dividerData;
      const selectedDivider = dividersList.findIndex((item) => {
        if (Number(item.id) === Number(id)) {
          return true;
        }
        return false;
      });
      if (getFlip.x) {
        const svg = direction === 'top' ? dividersList[selectedDivider].source.bottom : dividersList[selectedDivider].source.top;
        newStyles.image = createBase64Divider(fill, svg);
      } else {
        const svg = direction === 'top' ? dividersList[selectedDivider].source.top : dividersList[selectedDivider].source.bottom;
        newStyles.image = createBase64Divider(fill, svg);
      }

      newData[currentKey] = newStyles;
      return dispatch(dataChangeValues(newData, parentKey, dataID));
    } catch (error) {
      return new Error(error.message);
    }
  };

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>Divider settings</PopoverHeader>
      <PopoverBody>
        <FormGroup>
          <FormVertical label="Style">
            <SelectDividers
              value={selectedDividerID}
              onChangeDivider={onChangeDivider}
              direction={direction}
              list={dividersList}
            />
          </FormVertical>
        </FormGroup>
        <AnimateHeight duration={300} height={selectedDividerID === 1 ? 0 : 'auto'}>
          {Object.keys(dividerData).map((item, index) => {
            const value = dividerData[item];

            switch (item) {
              case 'zIndex':
                return (
                  <FormGroup key={`settings_divider_${index}`}>
                    <FormVertical label="Arrangement">
                      <Arrangement value={value} onChange={onChangeArrangement} />
                    </FormVertical>
                  </FormGroup>
                );
              case 'fill':
                const landingValue = getLandingDividers(value, item, direction, componentsData, dataID);
                return (
                  <FormGroup key={`settings_divider_${index}`}>
                    <FormHorizontal label="Fill">
                      <Color value={value || landingValue} onChange={onChangeColor} solid />
                    </FormHorizontal>
                  </FormGroup>
                );
              case 'size':
                const repeatValue = getRepeat(value);
                return (
                  <FormGroup key={`settings_divider_${index}`}>
                    <FormVertical label="Repeat">
                      <RangeSlider value={repeatValue} max={100} min={1} units="%" onChange={onChangeRepeat} input />
                    </FormVertical>
                  </FormGroup>
                );
              case 'flip':
                const getFlip = findRotate(value);
                return (
                  <FormGroup key={`settings_divider_${index}`}>
                    <FormHorizontal label="Flip">
                      <Flip value={getFlip} flipX={getFlip.x} flipY={getFlip.y} onChange={onChangeFlip} />
                    </FormHorizontal>
                  </FormGroup>
                );
              case 'height':
                return (
                  <FormGroup key={`settings_divider_${index}`}>
                    <FormVertical label="Height">
                      <RangeSlider value={value} max={300} min={1} onChange={onChangeHeight} input />
                    </FormVertical>
                  </FormGroup>
                );
              default:
                return null;
            }
          })}
        </AnimateHeight>
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default SettingsDivider;
