import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './_form.scss';
import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';
import { ReactComponent as QUESTION } from '../../assets/img/question.svg';

export const Form = ({ children }) => {
  const node = useRef(null);

  return (
    <div className="editor__popover" ref={node}>
      {children}
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const FormCategory = ({ children }) => <div className="editor__form-category">{children}</div>;

FormCategory.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const FormCategoryTitle = ({ children }) => <div className="editor__form-category-title">{children}</div>;

FormCategoryTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
// eslint-disable-next-line
export const FormGroup = ({ children, className }) => <div className={`${'editor__form-group' + ' '}${className || ''}`}>{children}</div>;

FormGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  className: PropTypes.string,
};

export const FormVertical = ({ children, label, explanation }) => {
  const [isOpenQuestion, setOpenQuestion] = useState(false);

  return (
    <div className={classNames('editor__form-row-vertical')}>
      {label ? (
        <div
          className={classNames('editor__form-row-vertical-label', {
            'editor__form-row-vertical-label-open': isOpenQuestion,
          })}
        >
          {label}
          {explanation ? <QUESTION onClick={() => setOpenQuestion(!isOpenQuestion)} /> : null}
          {explanation ? (
            <AnimateHeight duration={300} height={isOpenQuestion ? 'auto' : 0}>
              <div className="editor__form-row-vertical-question">{explanation}</div>
            </AnimateHeight>
          ) : null}
        </div>
      ) : null}
      <div className="editor__form-row-vertical-content">{children}</div>
    </div>
  );
};

FormVertical.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  label: PropTypes.string,
  explanation: PropTypes.string,
};

export const FormHorizontal = ({ children, label }) => (
  <div className="editor__form-row-horizontal">
    <div className="editor__form-row-horizontal-label">{label}</div>
    <div className="editor__form-row-horizontal-content">{children}</div>
  </div>
);

FormHorizontal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  label: PropTypes.string,
};
