import React, {
  useEffect, useState, useRef,
} from 'react';
import './_settings_block.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { FormGroup, FormVertical } from '../../../layouts/Form';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Container from '../../Elements/Container';
import BlockHeight from '../../Elements/BlockHeight';
import CardsRow from '../../Elements/CardsRow';
import CardsAlign from '../../Elements/CardsAlign';
import CardsJustify from '../../Elements/CardsJustify';
import FaqRow from '../../Elements/FaqRow';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { getObjectSource, getSourceValue, getParentKey } from '../../../utils/SourceValue';

const SettingsBlock = ({
  dataID, onClose, parentNode,
}) => {
  const dispatch = useDispatch();

  const target = usePortal();
  const node = useRef(null);
  const [position, setPosition] = useState(false);

  const block = Methods.getData(dataID);

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
  });

  useEffect(() => {
    const position = getPosition(parentNode, node, {
      direction: 'center bottom',
      margin: 24,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (source, value) => {
    if (source && _.isObject(source) && source.hasOwnProperty('typeData')) {
      const keys = getParentKey(source);
      const isNotCurrentPath = keys.currentPath === 'default' || keys.currentPath === false;
      const newData = _.cloneDeep(block.data);

      if (isNotCurrentPath) {
        dispatch(dataChangeValues(value, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = value;

        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>Block settings</PopoverHeader>
      <PopoverBody>
        {block && block.settings && block.settings.main ? (
          <>
            {block.settings.main.map((item, index) => {
              const value = getSourceValue(item.value, dataID);

              switch (item.element) {
                case 'block_structure':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <Container value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'block_height':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <BlockHeight value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'cards_column':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <CardsRow value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'faq_row':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <FaqRow value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'cards_align':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <CardsAlign value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                case 'cards_justify':
                  return (
                    <FormGroup key={`settings_${index}`}>
                      <FormVertical label={item.label || false}>
                        <CardsJustify value={value} onChange={(value) => onChange(item.value, value)} />
                      </FormVertical>
                    </FormGroup>
                  );
                default:
                  return false;
              }
            })}
          </>
        ) : null}
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default SettingsBlock;
