import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as IconNone } from '../../../../assets/img/no_shadow.svg';

const BorderElement = ({
  className, title, none, active, styleConfig, onClick,
}) => {
  const styles = {
    borderStyle: title,
    ...styleConfig,
  }

  return (
    <div
      style={styles}
      className={classNames('elements-select_borders_list__item', className, { active })}
      onClick={onClick}
    >
      {none
        ? <IconNone className={classNames('elements-select_borders_list__item-icon', { active })} />
        : null}
      {title}
    </div>
  )
}

BorderElement.propTypes = {
  className: 'border-none',
  title: 'None',
  styleConfig: {},
}

BorderElement.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  styleConfig: PropTypes.object,
  none: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default BorderElement
