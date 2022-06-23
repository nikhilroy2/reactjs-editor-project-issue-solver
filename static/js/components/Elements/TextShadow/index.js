import React, { useState } from 'react';
import './_text_shadow.scss';
import classNames from 'classnames';
import { parse, stringify } from 'css-box-shadow';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import RangeSlider from '../RangeSlider';
import Color from '../Color';
import { FormGroup, FormHorizontal, FormVertical } from '../../../layouts/Form';
import { ReactComponent as IconNoShadow } from '../../../assets/img/no_shadow.svg';

const boxShadowBlanks = [
  {
    value: 'none',
  },
  {
    value: '0 2px 4px #000',
  },
  {
    value: '0 4px 8px #000',
  },
  {
    value: '0 6px 12px #000',
  },
  {
    value: '0 8px 16px #000',
  },
  {
    value: '0 8px 24px #000',
  },
  {
    value: '0 8px 24px #000',
  },
  {
    value: '0 8px 32px #000',
  },
];

const isNone = (value) => value === 'none';

const TextShadow = ({ icon, value, onChange }) => {
  const [textShadowValue, setBoxShadowValue] = useState(isNone(value) ? 'none' : parse(value)[0]);

  const onChangeShadowRange = (key, value) => {
    const newShadow = {
      ...textShadowValue,
      [key]: value,
    };
    const stringBoxShadow = stringify([newShadow]);
    onChange(stringBoxShadow);
    setBoxShadowValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onChangePattern = (value) => {
    if (value === 'none') {
      setBoxShadowValue(() => {
        onChange(value);
        return value;
      });
    } else {
      const newShadow = parse(value)[0];
      const stringBoxShadow = stringify([newShadow]);
      setBoxShadowValue(() => {
        onChange(stringBoxShadow);
        return newShadow;
      });
    }
  };

  return (
    <div className="editor__elements-text_shadow">
      <div className="editor__elements-text_shadow-blanks">
        {boxShadowBlanks.map((item, index) => (
          <div className="editor__elements-text_shadow-blank-item-col" key={`shadow-blank_${index}`}>
            <div
              className={classNames(
                'editor__elements-text_shadow-blank-item animate-transition-05',
                {
                  'editor__elements-box_shadow-blank-item-active':
                      (isNone(textShadowValue) && item.value === 'none') || stringify([textShadowValue]) === item.value,
                },
              )}
              onClick={() => onChangePattern(item.value)}
            >
              <div
                className={
                    item.value === 'none'
                      ? 'editor__elements-text_shadow-blank-item-null'
                      : `${icon} editor__elements-text_shadow-blank-item-qub`
                  }
                style={{ textShadow: item.value }}
              >
                {item.value === 'none' ? <IconNoShadow /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimateHeight duration={500} height={isNone(textShadowValue) ? 0 : 'auto'}>
        <div className="editor__elements-text_shadow-settings">
          <FormGroup>
            <FormVertical label="Shadow X position">
              <RangeSlider
                value={textShadowValue.offsetX}
                min={0}
                max={250}
                step={1}
                onChange={(value) => onChangeShadowRange('offsetX', value)}
                input
              />
            </FormVertical>
          </FormGroup>
          <FormGroup>
            <FormVertical label="Shadow Y position">
              <RangeSlider
                value={textShadowValue.offsetY}
                min={0}
                max={250}
                step={1}
                onChange={(value) => onChangeShadowRange('offsetY', value)}
                input
              />
            </FormVertical>
          </FormGroup>
          <FormGroup>
            <FormVertical label="Shadow blur strength">
              <RangeSlider
                value={textShadowValue.blurRadius}
                min={0}
                max={250}
                step={1}
                onChange={(value) => onChangeShadowRange('blurRadius', value)}
                input
              />
            </FormVertical>
          </FormGroup>
          <FormGroup>
            <FormHorizontal label="Shadow color">
              <Color value={textShadowValue.color} onChange={(value) => onChangeShadowRange('color', value)} />
            </FormHorizontal>
          </FormGroup>
        </div>
      </AnimateHeight>
    </div>
  );
};

TextShadow.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextShadow.defaultProps = {
  icon: 'fal fa-image',
};

export default TextShadow;
