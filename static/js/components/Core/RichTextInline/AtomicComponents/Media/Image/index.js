import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './_media-image.scss'
import classNames from 'classnames';
import Toolbar from './Toolbar';

/**
 * Media type Image
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const MediaImage = ({ ...props }) => {
  const { src, styles, float } = props;
  const node = useRef(null);
  const [activeBounding, setBounding] = useState(false);

  const onClick = () => {
    setBounding(node.current.getBoundingClientRect())
  };

  useEffect(() => {
    if (activeBounding && node.current) {
      const oldBounds = activeBounding;
      const newBounds = node.current.getBoundingClientRect();
      if (newBounds.left !== oldBounds.left) {
        setBounding(node.current.getBoundingClientRect())
      }
    }
  }, [activeBounding]);

  return (
    <>
      <div
        className={classNames('editor-media-block', {
          'atomic-float-left': float === 'left',
          'atomic-float-right': float === 'right',
          'atomic-float-center': float === 'center',
          'atomic-float-justify': float === 'justify',
        })}
        onClick={onClick}
      >
        <img
          ref={node}
          src={src}
          style={styles}
          alt="Media"
        />
      </div>
      {activeBounding
        ? (
          <Toolbar
            atomicBounds={activeBounding}
            onClose={() => setBounding(false)}
            {...props}
          />
        ) : null}
    </>
  )
};

MediaImage.propTypes = {
  src: PropTypes.string,
  styles: PropTypes.object,
  float: PropTypes.string,
};

export default MediaImage;
