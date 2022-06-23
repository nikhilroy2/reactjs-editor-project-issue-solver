import React, { useEffect, useRef, useState } from 'react';
import './_image.scss';
import PropTypes from 'prop-types';
import { ReactComponent as UPLOAD } from '../../../assets/img/upload.svg';
import Filesmanager from '../../Popups/Filesmanager';
import Methods from '../../../utils/Methods';
import EmptyImage from '../EmptyImage';
import Tooltip from '../Tooltip';
import { ReactComponent as IconDelete } from '../../../assets/img/delete.svg';

/**
 * Image - загрузка картинок с файлового менеджера
 *
 * @component
 * @category Components
 * @subcategory Elements
 *
 */
const Image = ({ value, onChange }) => {
  const [isOpenFilesmanager, setOpenFilesmanager] = useState(false);
  const node = useRef(null);

  const [image, setImage] = useState(false);

  useEffect(() => {
    if (value && value !== 'not found') {
      if (value.id) {
        const file = Methods.getFile(value.id);
        if (file) {
          setImage(file.url);
        }
      }
    }
  }, [value]);

  const onSelectImage = (value) => {
    onChange({
      id: value.id,
      type: 'filesmanager',
    });
    setOpenFilesmanager(false);
  };

  const onDelete = () => {
    onChange(false);
    setImage(false);
  };

  return (
    <div className="editor__elements-image">
      {image ? (
        <div className="editor__elements-image-delete" onClick={() => onDelete()}>
          <Tooltip text="Delete image">
            <IconDelete className="animate-transition-03" />
          </Tooltip>
        </div>
      ) : null}
      {image ? (
        <Tooltip text="Replace image">
          <div
            className="editor__elements-image-container"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setOpenFilesmanager(true)}
          >
            <div className="editor__elements-image-upload-label animate-transition-03">
              <UPLOAD />
              {' '}
              Replace image
            </div>
          </div>
        </Tooltip>
      ) : (
        <EmptyImage onOpenFilesManager={() => setOpenFilesmanager(true)} />
      )}
      {isOpenFilesmanager ? (
        <Filesmanager rootNode={node} onImageSelection={onSelectImage} onClose={() => setOpenFilesmanager(false)} />
      ) : null}
    </div>
  );
};

Image.defaultProps = {};

Image.propTypes = {
  /**
   * Объект с ID изображения
   */
  value: PropTypes.object.isRequired,
  /**
   * Новая картинка
   */
  onChange: PropTypes.func.isRequired,
};

export default Image;
