import React, { useEffect, useState } from 'react';
import './_video-link.scss';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';
import urlParser from 'js-video-url-parser';
import { FormGroup, FormVertical } from '../../../layouts/Form';
import Input from '../Input';
import Select from '../Select';

const options = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
];

/**
 * VideoLink - Поля для добавления ссылки на видео
 *
 * @component
 * @category Components
 * @subcategory Elements
 *
 */
const VideoLink = ({
  url, type, onChangeType, onChangeUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [debounceUrl] = useDebounce(inputUrl, 500);
  const [error, setError] = useState('');

  const validate = () => {
    const valid = urlParser.parse(debounceUrl);
    if (valid) {
      if (valid.provider === type) {
        setError('');
        return true;
      } if (valid.provider !== type) {
        setError(`Change link type to ${valid.provider} or change url`);
      }
    } else if (debounceUrl) {
      setError('Incorrect link');
    } else {
      setError('');
      return true;
    }
    return false;
  };

  useEffect(() => {
    const valid = validate();
    if (valid) {
      if (url !== debounceUrl) {
        onChangeUrl(debounceUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    const isValid = validate();
    if (isValid) {
      onChangeUrl(debounceUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceUrl]);

  const handleChangeType = (object) => {
    onChangeType(object.value);
  };

  const changeUrl = (value) => {
    setInputUrl(value);
  };

  return (
    <>
      <FormGroup>
        <FormVertical label="Link type">
          <Select
            options={options}
            handleChangeSelect={handleChangeType}
            activeValue={options.find((o) => o.value === type)}
            isSearchable={false}
          />
        </FormVertical>
      </FormGroup>
      <FormGroup>
        <FormVertical label="URL">
          <Input error={error} value={inputUrl} onChange={(e) => changeUrl(e.target.value)} />
        </FormVertical>
      </FormGroup>
    </>
  );
};

VideoLink.defaultTypes = {
  url: '',
  type: 'youtube',
};
VideoLink.propTypes = {
  /**
   * URL видео
   */
  url: PropTypes.string,
  /**
   * Тип ссылки Youtube/Vimeo
   */
  type: PropTypes.string,
  /**
   * Изменить тип ссылку
   */
  onChangeType: PropTypes.func.isRequired,
  /**
   * Изменить url
   */
  onChangeUrl: PropTypes.func.isRequired,
};

export default VideoLink;
