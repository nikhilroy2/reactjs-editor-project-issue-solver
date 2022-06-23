/*eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './_languages-list.scss';
import { createPortal } from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import usePortal from '../../../utils/usePortal';
import {Popover, PopoverBody, PopoverFooter, PopoverHeader} from '../../../layouts/Popover';
import getPosition from '../../../utils/getPosition';
import Button from '../../Elements/Button';
import Select from "../../Elements/Select";
import {FormGroup, FormVertical} from "../../../layouts/Form";
import { languagesPopupCloseAddLanguage, languagesAdd } from "../../../redux/actions/Languages";
import Spinner from "../../../layouts/Loaders/Spinner";
import { getLanguagesList } from './helper';
import Alert from '../../Elements/Alert';

const PopupLanguagesList = ({ rootNode, refNode, list, onClose}) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const mainNode = refNode || node;
  const { popupAddLanguage, languages, data } = useSelector(state => state.languages);

  const target = usePortal();
  const [options] = useState(getLanguagesList(languages, data));
  const [position, setPosition] = useState(false);
  const [language, setLanguage] = useState({
    label: 'Select language',
    value: ''
  });

  const onAddLanguage = () => {
    dispatch(languagesAdd(language.value));
  };

  const onChangeLanguage = (value) => {
    setLanguage(value);
  };

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    document.removeEventListener('mousedown', outSideClick, false);
    return dispatch(languagesPopupCloseAddLanguage());
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    const position = getPosition(rootNode, mainNode, {
      direction: 'right',
      margin: 2,
    });
    setPosition(position);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return createPortal(
    <Popover ref={mainNode} position={position} width={332}>
      <PopoverHeader>Add new language</PopoverHeader>
      {popupAddLanguage.isLoading ?
        <div className="languages-list__loader">
          <Spinner theme={'dark'}/>
        </div> : null
      }
      <PopoverBody>
        <Alert type={'primary'} content={'No translations are included for this language. Please add your own translations.'} />
        <FormGroup>
          <FormVertical label={'Language'}>
            <Select
              options={options}
              activeValue={language}
              handleChangeSelect={onChangeLanguage}
            />
          </FormVertical>
        </FormGroup>
      </PopoverBody>
      <PopoverFooter>
        <div className={'w-100 text-right'}>
          <Button size={'sm'} onClick={onAddLanguage}>
            Add language
          </Button>
        </div>
      </PopoverFooter>
    </Popover>,
    target,
  );
};

PopupLanguagesList.defaultProps = {};

PopupLanguagesList.propTypes = {};

export default PopupLanguagesList;
