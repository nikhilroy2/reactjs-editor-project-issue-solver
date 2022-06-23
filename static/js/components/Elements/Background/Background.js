import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { ReactComponent as IconDelete } from '../../../assets/img/delete.svg';
import Methods from '../../../utils/Methods/index';

const Background = ({
  valueBackground, valuePosition, defaultPosition, onStopChangeBackgroundPosition, onChangeBackgroundPosition, onDelete, styles,
}) => {
  const [background_image, setBackgroundImage] = useState(false);

  useEffect(() => {
    if (_.isObject(valueBackground)) {
      const background = Methods.getFile(valueBackground.id);
      setBackgroundImage(background);
    }
    if (_.isString(valueBackground)) {
      if (valueBackground === 'none') {
        setBackgroundImage({
          url: 'none',
        });
      } else {
        const matchImageUrl = valueBackground.replace(/url\((.*?)\)/i, '$1')
        if (matchImageUrl) {
          setBackgroundImage({
            url: matchImageUrl,
          });
        }
      }
    }
  }, [valueBackground]);

  let styleContainer = {
    ...styles,
    backgroundImage: `url(${background_image.url})`,
  };

  if (defaultPosition) {
    styleContainer = {
      ...styleContainer,
      backgroundPosition: `${defaultPosition.positionX}% ${defaultPosition.positionY}%`,
    }
  }

  return (
    <>
      <div className="editor__elements-background-delete" onClick={() => onDelete()}>
        <IconDelete className="animate-transition-03" />
      </div>
      <div className="editor__elements-background-container" style={styleContainer}>
        {valuePosition && defaultPosition
          ? (
            <Draggable
              handle=".editor__elements-background-container-handle"
              defaultPosition={{ x: defaultPosition.positionX, y: defaultPosition.positionY }}
              bounds="parent"
              onStop={onStopChangeBackgroundPosition}
              onDrag={onChangeBackgroundPosition}
              scale={1}
            >
              <div className="editor__elements-background-container-handle" />
            </Draggable>
          ) : null}
      </div>
    </>
  )
};

Background.propTypes = {
  valueBackground: PropTypes.object,
  valuePosition: PropTypes.object,
  defaultPosition: PropTypes.object,
  onStopChangeBackgroundPosition: PropTypes.func,
  onChangeBackgroundPosition: PropTypes.func,
  onDelete: PropTypes.func,
  styles: PropTypes.object,
};

export default Background;
