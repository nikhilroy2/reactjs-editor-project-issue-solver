import React, {
  useEffect, useState, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import './_settings_background.scss';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../layouts/Form';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Color from '../../Elements/Color';
import Background from '../../Elements/Background';
import BackgroundSize from '../../Elements/BackgroundSize';
import Switch from '../../Elements/Switch';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import RangeSlider from '../../Elements/RangeSlider';
import { getSettingsBackground, getBlurPX } from './helper';
import { getSourceValue, getParentKey, getObjectSource } from '../../../utils/SourceValue';
import { getLandingValues } from '../../../utils/helpers';

const SettingsBackground = ({
  parentNode, blockID, dataID, onClose,
}) => {
  const dispatch = useDispatch();
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const componentsData = useSelector((state) => state.components.data);

  const target = usePortal();
  const node = useRef(null);
  const [position, setPosition] = useState(false);

  const outSideClick = (e) => {
    if (isOpenColorPicker) {
      return false;
    }
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
  });

  useEffect(() => {
    const position = getPosition(parentNode, node, {
      direction: 'center bottom',
      margin: 12,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (source, value) => {
    const block = _.cloneDeep(Methods.getData(dataID));
    const { data } = block;

    if (data) {
      const keys = getParentKey(source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(value, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(data, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = value;

        dispatch(dataChangeValues(data[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  const settings = getSettingsBackground(blockID, dataID);

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>Background settings</PopoverHeader>
      <PopoverBody>
        {settings ? (
          <>
            {settings.map((item, index) => {
              const value = getSourceValue(item.value, dataID);

              switch (item.element) {
                case 'color':
                  const landingValue = getLandingValues(componentsData, item.value, dataID);
                  return (
                    <FormGroup key={`${index}`}>
                      <FormHorizontal label={item.label}>
                        <Color
                          value={value || landingValue}
                          gradient={item.gradient}
                          solid={item.solid}
                          onChange={(value) => onChange(item.value, value)}
                        />
                      </FormHorizontal>
                    </FormGroup>
                  );
                case 'background':
                  return (
                    <FormGroup key={`${index}`}>
                      <FormVertical label={item.label}>
                        <Background
                          dataID={dataID}
                          values={item.values}
                          styles={item.styles}
                          onChange={(source, value) => onChange(source, value)}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'background_size':
                  return (
                    <FormGroup key={`${index}`}>
                      <FormVertical label={item.label}>
                        <BackgroundSize
                          dataID={dataID}
                          values={item.values}
                          onChange={(source, value) => onChange(source, value)}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'range_slider':
                  const val = getBlurPX(value);
                  return (
                    <FormGroup key={`${index}`}>
                      <FormVertical label={item.label}>
                        <RangeSlider
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          units={item.units}
                          value={val}
                          input={item.input}
                          onChange={(value) => onChange(item.value, `blur(${parseInt(value, 10)}px)`)}
                        />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'switch':
                  return (
                    <FormGroup key={`${index}`}>
                      <FormHorizontal label={item.label}>
                        <Switch
                          value={value === 'fixed'}
                          onChange={(value) => onChange(item.value, value ? 'fixed' : 'scroll')}
                        />
                      </FormHorizontal>
                    </FormGroup>
                  );
                default:
                  return null;
              }
            })}
          </>
        ) : (
          <div>Not settings</div>
        )}
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default SettingsBackground;
