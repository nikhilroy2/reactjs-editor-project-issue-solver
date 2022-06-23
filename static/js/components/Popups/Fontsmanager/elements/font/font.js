import './_font.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { uploadFont, removeFont } from '../../../../../redux/actions/Fonts';
import {
  getIcon, getLockedBlock, exampleText, checkIsFontAdded,
} from '../../config';
import { ReactComponent as Basket } from '../../../../../assets/img/basket.svg';
import Tooltip from '../../../../Elements/Tooltip';

const Font = ({
  type, status, title, id, subset, stylesCount,
}) => {
  const [itemStatus, setItemStatus] = useState('');

  const dispatch = useDispatch();
  const isAdded = checkIsFontAdded(id);
  const locked = useMemo(() => getLockedBlock(id), [id])

  useEffect(() => {
    if (status === 'success' && itemStatus === 'pending') {
      setItemStatus(status);
    }
    setItemStatus('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const addFont = () => {
    setItemStatus('pending');
    dispatch(uploadFont(id));
  };

  const deleteFont = () => {
    setItemStatus('pending');
    dispatch(removeFont(id));
  };

  return (
    <div className={classNames('editor__font-block', { locked })}>
      {isAdded && !locked
        ? (
          <div className="editor__font-block-delete">
            <Tooltip text="Delete">
              <Basket onClick={deleteFont} />
            </Tooltip>
          </div>
        ) : null}
      <div className="editor__font-block_title">{title}</div>
      <div className="editor__font-block_text" style={{ fontFamily: title }}>
        {exampleText[subset]}
      </div>
      <div className="editor__font-block_counter-wrap">
        <div className="editor__font-block_counter">
          {stylesCount}
          {' '}
          styles
        </div>
        {getIcon(type, itemStatus || status, addFont, deleteFont)}
      </div>
    </div>
  );
};

Font.defaultProps = {
  type: 'my',
  status: '',
  title: 'Anton',
  stylesCount: 2,
};

Font.propTypes = {
  id: PropTypes.number,
  subset: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  stylesCount: PropTypes.number,
};

export default Font;
