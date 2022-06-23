import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import './_translation.scss';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import usePortal from '../../../utils/usePortal';
import { ReactComponent as Dots } from '../../../assets/img/dots.svg';
import { ReactComponent as Close } from '../../../assets/img/close.svg';
import Select from '../../Elements/Select';
import { languagesTranslationMode } from '../../../redux/actions/Languages';
import { getAddedLanguagesList, getActiveLanguage, getDefaultLanguage } from './helper';

const Translation = () => {
  const dispatch = useDispatch();
  const { mode, data } = useSelector((state) => state.languages);
  const [options] = useState(getAddedLanguagesList(data));
  const [value] = useState(getActiveLanguage(data, mode));
  const defaultLanguage = useMemo(() => getDefaultLanguage(data), [data]);

  const target = usePortal();
  const node = useRef(null);

  useEffect(() => {
    $(node.current).draggable({
      handle: '.translation-mode__drag',
      scroll: false,
      containment: [80, 0, window.innerWidth - 310, window.innerHeight],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeMode = (value) => {
    if (defaultLanguage && defaultLanguage.code === value) {
      onChangeMode(null)
    } else {
      dispatch(languagesTranslationMode(value));
    }
  };

  if (mode) {
    return createPortal(
      <div className="translation-mode" ref={node}>
        <div className="translation-mode__body">
          <div className="translation-mode__drag">
            <Dots />
          </div>
          <div className="translation-mode__description">
            Translation in to
          </div>
          <div className="translation-mode__select">
            <Select
              options={options}
              value={value}
              menuPlacement="top"
              handleChangeSelect={(language) => onChangeMode(language.value)}
            />
          </div>
          <div className="translation-mode__close" onClick={() => onChangeMode(null)}>
            <Close />
          </div>
        </div>
      </div>,
      target,
    );
  }
  return null;
};

Translation.propTypes = {

};

export default Translation;
