import React, { useState } from 'react';
import './_box_shadow.scss';
import classNames from 'classnames';
import { parse, stringify } from 'css-box-shadow';
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
    value: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  },
  {
    value: '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
  },
  {
    value: '0 6px 12px 0 rgba(0, 0, 0, 0.12)',
  },
  {
    value: '0 8px 16px 0 rgba(0, 0, 0, 0.16)',
  },
  {
    value: '0 8px 24px 0 rgba(0, 0, 0, 0.24)',
  },
  {
    value: '0 8px 24px 0 rgba(0, 0, 0, 0.32)',
  },
  {
    value: '0 8px 32px 0 rgba(0, 0, 0, 0.32)',
  },
];

const isNone = (value) => value === 'none';

const BoxShadow = ({ onChange, value }) => {
  const [boxShadowValue, setBoxShadowValue] = useState(value !== 'none' ? parse(value)[0] : 'none');

  const onChangeShadowRange = (key, value) => {
    const newShadow = {
      ...boxShadowValue,
      [key]: value,
    };
    const stringBoxShadow = stringify([newShadow]);
    setBoxShadowValue((prevState) => {
      onChange(stringBoxShadow);
      return {
        ...prevState,
        [key]: value,
      };
    });
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
      setBoxShadowValue(newShadow);
      onChange(stringBoxShadow);
    }
  };

  return (
    <div className="editor__elements-box_shadow">
      <div className="editor__elements-box_shadow-blanks">
        {boxShadowBlanks.map((item, index) => (
          <div className="editor__elements-box_shadow-blank-item-col" key={`shadow-blank_${index}`}>
            <div
              className={classNames(
                'editor__elements-box_shadow-blank-item animate-transition-05',
                {
                  'editor__elements-box_shadow-blank-item-active':
                      (isNone(boxShadowValue) && item.value === 'none') || stringify([boxShadowValue]) === item.value,
                },
              )}
              onClick={() => onChangePattern(item.value)}
            >
              <div
                className={
                    item.value === 'none'
                      ? 'editor__elements-box_shadow-blank-item-null'
                      : 'editor__elements-box_shadow-blank-item-qub'
                  }
                style={{ boxShadow: item.value }}
              >
                {item.value === 'none' ? <IconNoShadow /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isNone(boxShadowValue) ? null : (
        <div className="editor__elements-box_shadow-settings">
          <FormGroup>
            <FormVertical label="Shadow X position">
              <RangeSlider
                value={boxShadowValue.offsetX}
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
                value={boxShadowValue.offsetY}
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
                value={boxShadowValue.blurRadius}
                min={0}
                max={250}
                step={1}
                onChange={(value) => onChangeShadowRange('blurRadius', value)}
                input
              />
            </FormVertical>
          </FormGroup>
          <FormGroup>
            <FormVertical label="Shadow spread strength">
              <RangeSlider
                value={boxShadowValue.spreadRadius}
                min={0}
                max={250}
                step={1}
                onChange={(value) => onChangeShadowRange('spreadRadius', value)}
                input
              />
            </FormVertical>
          </FormGroup>
          <FormGroup>
            <FormHorizontal label="Shadow color">
              <Color value={boxShadowValue.color} onChange={(value) => onChangeShadowRange('color', value)} />
            </FormHorizontal>
          </FormGroup>
        </div>
      )}
    </div>
  );
};

BoxShadow.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BoxShadow;
