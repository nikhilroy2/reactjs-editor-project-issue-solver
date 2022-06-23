import '../scss/_collapse_title.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from '../../../components/Elements/Tooltip';
import { ReactComponent as ArrowOpen } from '../../../assets/img/arrow-down.svg';

const CollapseTitle = ({
  title, isOpen, reverse, onClick,
}) => (
  <div
    className={classNames(
      'editor__collapse-title',
      { open: isOpen },
      { 'reverse-open': isOpen && reverse },
      { 'reverse-default': !isOpen && reverse },
    )}
    onClick={onClick}
  >
    <div className="editor__collapse-title_text">{title}</div>
    <Tooltip text={`${isOpen ? 'Hide' : 'Show'}`}>
      <ArrowOpen className={classNames('editor__collapse-title_icon', { up: isOpen, down: !isOpen })} />
    </Tooltip>
  </div>
);

CollapseTitle.defaultProps = {
  title: 'Public',
  isOpen: false,
  reverse: false,
};

CollapseTitle.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  reverse: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CollapseTitle;
