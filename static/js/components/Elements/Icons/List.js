/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListRender = ({
  index, key, style, ...props
}) => {
  const {
    // eslint-disable-next-line
    chunkList, currentIcon, onChange, chunkListLength,
    // eslint-disable-next-line
  } = props.parent.props;

  return (
    <div key={key} style={style}>
      <div className="editor__icon-list">
        {chunkList[index].map((el) => el.map((item, index) => (
          <div
            style={{ width: `${100 / chunkListLength}%` }}
            className={classNames('editor__icon-list-item animate-transition-05', {
              'editor__icon-list-item-active': item.value === currentIcon,
            })}
            key={`icon_list_${index}`}
            onClick={() => onChange(item.value)}
          >
            <span className={item.value} />
          </div>
        )))}
      </div>
    </div>
  );
};

ListRender.propTypes = {
  index: PropTypes.number,
  key: PropTypes.number,
  style: PropTypes.object,
};

export default ListRender;
