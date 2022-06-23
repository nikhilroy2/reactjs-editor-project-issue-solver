import React, {
  useEffect, useRef, useState,
} from 'react';
import './_background.scss';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { convertPosition } from './helper';
import EmptyBackground from './EmptyBackground';
import SettingsBackground from './Background';
import { getSourceValue } from '../../../utils/SourceValue';

const Background = ({
  dataID, values, onChange, styles,
}) => {
  const node = useRef(null);
  const [backgroundPosition, setBackgroundPosition] = useState(false);

  const valueBackground = values.background
    ? getSourceValue(values.background, dataID) !== 'not found'
      ? getSourceValue(values.background, dataID)
      : false
    : false;

  const valuePosition = values.position
    ? getSourceValue(values.position, dataID) !== 'not found'
      ? getSourceValue(values.position, dataID)
      : false
    : false;

  const onChangeBackgroundPosition = (param1, param2) => {
    const currentX = param2.x;
    const currentY = param2.y;
    setBackgroundPosition(convertPosition(currentX, currentY));
  };

  const onStopChangeBackgroundPosition = () => {
    const { positionX, positionY } = backgroundPosition;
    const stringPosition = `${Math.min(positionX, 100)}% ${Math.min(positionY, 100)}%`;
    onChange(values.position, stringPosition);
  };

  const onDelete = () => {
    onChange(values.background, 'none');
  };

  const onChangeBackground = (value) => {
    onChange(values.background, value);
  };

  useEffect(() => {
    if (valuePosition) {
      setBackgroundPosition(
        convertPosition(parseInt(valuePosition.split(' ')[0], 10), parseInt(valuePosition.split(' ')[1], 10), true),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {valueBackground || _.isNull(valueBackground) ? (
        <div className="editor__elements-background" ref={node}>
          {valueBackground === 'none' || _.isNull(valueBackground) ? (
            <EmptyBackground onChange={onChangeBackground} />
          ) : (
            <SettingsBackground
              valuePosition={valuePosition}
              valueBackground={valueBackground}
              defaultPosition={backgroundPosition}
              onStopChangeBackgroundPosition={onStopChangeBackgroundPosition}
              onChangeBackgroundPosition={onChangeBackgroundPosition}
              styles={styles}
              onDelete={onDelete}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

Background.propTypes = {
  values: PropTypes.object.isRequired,
  dataID: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default Background;
