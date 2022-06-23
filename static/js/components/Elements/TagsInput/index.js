import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './_tags-input.scss';
import classNames from 'classnames';

import { ReactComponent as Close } from '../../../assets/img/close.svg';

const TagsInput = ({ dataTags, setValues, fieldName }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(dataTags ? dataTags.split(',') : []);
  const [activeFocus, setActiveFocus] = useState(false);

  const removeTag = (index) => {
    const newTags = [...tags];
    const filteredTags = newTags.filter((tag, i) => i !== index);
    setTags(filteredTags);
    setValues((prev) => ({ ...prev, [fieldName]: filteredTags.join(',') }));
    inputRef.current.focus();
  };

  const inputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 188 || e.key === ',') && inputValue && !/^ *$/.test(inputValue)) {
      if (
        tags.find((tag) => inputValue
          .toLowerCase()
          .trim()
          .split(',')
          .includes(tag.toLowerCase()))
      ) {
        return setInputValue('');
      }

      const addedTags = [
        ...tags,
        ...inputValue
          .split(',')
          .map((substr) => substr.trim())
          .filter((tag) => !!tag),
      ];
      setTags(addedTags);
      setValues((prev) => ({ ...prev, [fieldName]: addedTags.join(',') }));
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue) {
      removeTag(tags.length - 1);
    }

    return false;
  };

  const onChange = (e) => {
    if (e.target.value === ',') {
      return setInputValue('');
    }
    return setInputValue(e.target.value);
  };

  return (
    <div
      className={classNames('input-tag', {
        'input-tag__focus': activeFocus,
      })}
    >
      <ul className="input-tag__tags">
        {tags.map((tag, i) => (
          <li key={i}>
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              <Close />
            </button>
          </li>
        ))}
        <li className="input-tag__tags-input">
          <input
            type="text"
            value={inputValue}
            onChange={onChange}
            onKeyDown={inputKeyDown}
            ref={inputRef}
            onFocus={() => setActiveFocus(true)}
            onClick={() => setActiveFocus(true)}
            onBlur={() => setActiveFocus(false)}
          />
        </li>
      </ul>
    </div>
  );
};

TagsInput.propTypes = {
  dataTags: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  setValues: PropTypes.func,
  fieldName: PropTypes.string,
};

export default TagsInput;
