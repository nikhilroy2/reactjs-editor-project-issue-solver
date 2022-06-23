import React from 'react';
import './_empty-image.scss';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import { ReactComponent as IconEmptyBackground } from '../../../assets/img/empty_background.svg';

/**
 * Image - загрузка картинок с файлового менеджера
 *
 * @component
 * @category Components
 * @subcategory Elements
 *
 */
const EmptyImage = ({ onOpenFilesManager }) => (
  <Tooltip text="Open file manager">
    <div className="editor__elements-empty-image" onClick={() => onOpenFilesManager(true)}>
      <div className="editor__elements-empty-image-container">
        <div className="editor__elements-empty-image-container-icon">
          <IconEmptyBackground />
        </div>
        <div className="editor__elements-empty-image-container-title">Open media</div>
      </div>
    </div>
  </Tooltip>
);

EmptyImage.defaultProps = {

};

EmptyImage.propTypes = {
  /**
   * Новая картинка
   */
  onOpenFilesManager: PropTypes.func.isRequired,
};

export default EmptyImage;
