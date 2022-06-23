import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Elements/Input';
import { escapeStringRegexp } from './helper';

const TranslateInput = ({
  onChangeTranslate, placeholder, search, name, value,
}) => {
  const [translateValue, setTranslateValue] = useState(value);

  useEffect(() => {
    if (value !== translateValue) {
      setTranslateValue(value);
    }
  }, [translateValue, value]);

  const highlighting = (string) => ({
    __html: string.replace(new RegExp(escapeStringRegexp(search.toLowerCase()), 'gi'), (match) => `<mark>${match}</mark>`),
  })

  const onChange = (e) => {
    setTranslateValue(e.target.value);
    onChangeTranslate(e.target.value);
  };

  return (
    <div className="editor-translations__body-forms-group">
      <div className="editor-translations__body-forms-label">
        {/* eslint-disable-next-line react/no-danger */}
        {search ? <span dangerouslySetInnerHTML={highlighting(name)} /> : name}
      </div>
      <Input
        name={name}
        placeholder={placeholder}
        height={36}
        value={translateValue}
        onChange={onChange}
      />
    </div>
  )
};

TranslateInput.defaultProps = {
  placeholder: '',
  search: '',
};

TranslateInput.propTypes = {
  onChangeTranslate: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  search: PropTypes.string,
};

export default TranslateInput;
