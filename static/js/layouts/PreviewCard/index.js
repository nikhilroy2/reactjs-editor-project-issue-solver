import './_card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as IconBrush } from '../../assets/img/brush.svg';
import Spinner from '../Loaders/Spinner';
import Tooltip from '../../components/Elements/Tooltip';

const PreviewCard = ({
  active, title, id, preview, isFetchingId, onClick, onOpenSettings,
}) => (
  <div className="editor__card-uniq">
    <div className="editor__card-uniq_image">
      <div className="editor__card-uniq_image--bg">
        <div
          className="editor__card-uniq_image--preview"
          style={{ backgroundImage: preview ? `url("${preview}")` : 'none' }}
        />
      </div>
      <div
        onClick={!isFetchingId ? onOpenSettings : null}
        className={classNames('editor__card-uniq_image-hide active', {
          default: !active,
          active,
          'editor__card-uniq_image-hide-active': isFetchingId && isFetchingId === id,
          'editor__card-uniq_image-hide-display-none': isFetchingId && isFetchingId !== id && !active,
        })}
      >
        {active ? (
          <div className="editor__card-uniq_image-hide_active-button">
            {isFetchingId ? (
              <span>Loading...</span>
            ) : (
              <>
                <IconBrush className="styles-brush" />
                <span>Edit components</span>
              </>
            )}
          </div>
        ) : (
          <Tooltip text={`Activate ${title} style`}>
            <button
              className={classNames({
                'editor__card-uniq_image-hide_default-button': !isFetchingId,
                'editor__card-uniq_image-hide_loading-button': isFetchingId && isFetchingId === id,
              })}
              onClick={!isFetchingId ? onClick : null}
            >
              {isFetchingId && isFetchingId === id ? <Spinner /> : 'Activate'}
            </button>
          </Tooltip>
        )}
      </div>
    </div>
    <div className="editor__card-uniq_label-wrap">
      <div className="editor__card-uniq_label">{title}</div>
      {/*   {active &&
          <IconSettings className='editor__card-uniq_settings-svg' />
        } */}
    </div>
  </div>
);

PreviewCard.defaultProps = {
  active: false,
  title: 'Lumen',
};

PreviewCard.propTypes = {
  id: PropTypes.number,
  isFetchingId: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.string,
  preview: PropTypes.string,
  onClick: PropTypes.func,
  onOpenSettings: PropTypes.func,
};

export default PreviewCard;
