import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './_image.scss';
import { ReactComponent as IconDelete } from '../../../../assets/img/delete.svg';
import { ReactComponent as IconPlus } from '../../../../assets/img/plus.svg';
import { ReactComponent as IconSelectItem } from '../../../../assets/img/files_manager/select_item.svg';
import { ReactComponent as IconSearch } from '../../../../assets/img/files_manager/search-image.svg';
import PixabayLoader from './pixabayLoader';
import Tooltip from '../../../Elements/Tooltip';

const Image = ({
  onSelectImage,
  onDeleteImage,
  type,
  image,
  url,
  uploadImage,
  failed,
  pending,
  complete,
  loader,
  blockedAll,
  itemsIsSet,
}) => {
  const stateOfLoad = complete || pending || failed || loader;
  const pixabay = type === 2;

  return (
    <div className="editor__image-wrapper-preview">
      <div
        className={classNames('editor__image-wrapper', {
          blocked: stateOfLoad,
          'blocked-is-set': itemsIsSet && !stateOfLoad,
          'blocked-all': blockedAll,
        })}
      >
        {stateOfLoad ? <PixabayLoader loader={loader} complete={complete} failed={failed} pending={pending} /> : null}
        <div className={classNames('editor__image-hide-wrapper')}>
          <Tooltip text="Show image in new tab">
            <IconSearch
              className="editor__image-hide-wrapper_open-icon"
              onClick={() => window.open(url, '_blank')}
            />
          </Tooltip>
          <div
            className={classNames('editor__image-hide-wrapper_icon-wrap', { button: pixabay })}
            onClick={pixabay ? uploadImage : null}
          >
            {!pixabay && (
              <>
                <Tooltip text="Confirm">
                  <IconSelectItem className="editor__image-hide-select-icon" onClick={onSelectImage} />
                </Tooltip>
                <Tooltip text="Delete">
                  <IconDelete className="editor__image-hide-remove-icon" onClick={onDeleteImage} />
                </Tooltip>
              </>
            )}
            {pixabay && (
              <Tooltip text="Add image" offset={12}>
                <IconPlus className="editor__image-hide-plus-icon" />
              </Tooltip>
            )}
          </div>
          <div className={classNames('editor__image-hide-wrapper_text', { download: pixabay })}>
            {pixabay ? 'Download' : 'Select'}
          </div>
        </div>
        <LazyLoadImage alt="Image" effect="blur" className="editor__image-wrapper__preview" src={image} />
      </div>
    </div>
  );
};

Image.propTypes = {
  onSelectImage: PropTypes.func,
  onDeleteImage: PropTypes.func,
  type: PropTypes.number,
  image: PropTypes.string,
  url: PropTypes.string,
  uploadImage: PropTypes.func,
  failed: PropTypes.bool,
  pending: PropTypes.bool,
  complete: PropTypes.bool,
  loader: PropTypes.bool,
  blockedAll: PropTypes.bool,
  itemsIsSet: PropTypes.object,
};

export default Image;
