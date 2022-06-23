import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './_transform.scss';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/resizable';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Methods from '../../../utils/Methods/index';
import '../../../utils/rotable';
import { getSourceValue, getParentKey, getObjectSource } from '../../../utils/SourceValue';

const Transform = ({
  domElement, click, dataID, children,
}) => {
  const dispatch = useDispatch();

  const isResize = !!(domElement.transform && domElement.transform.resize);
  const isRotate = !!(domElement.transform && domElement.transform.rotate);
  const isWidth = !!(isResize && domElement.transform.resize.width);
  const isHeight = !!(isResize && domElement.transform.resize.height);

  const valueRotate = getSourceValue(domElement.transform.rotate.source, dataID);

  const [imageStyles, setImageStyles] = useState({
    active: false,
    rotate: false,
    size: false,
  });
  const { active, rotate, size } = imageStyles;

  const node = useRef(null);
  const nodeTooltip = useRef(null);
  const popupNode = useRef(null);

  const onChange = (source, value) => {
    const keys = getParentKey(source);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(value, keys.parentKey, dataID));
    } else {
      const newData = _.cloneDeep(Methods.getData(dataID));
      const changeData = getObjectSource(newData.data, keys.currentPath);
      changeData[keys.currentKey] = value;
      dispatch(dataChangeValues(newData.data[keys.parentKey], keys.parentKey, dataID));
    }
  };

  // eslint-disable-next-line
  const outSideClick = (e) => {
    if (nodeTooltip && nodeTooltip.current !== null && nodeTooltip.current.contains(e.target)) {
      return false;
    }

    if (popupNode && popupNode.current !== null && popupNode.current.contains(e.target)) {
      return false;
    }

    if (node.current && node.current.contains(e.target)) {
      return false;
    }

    document.removeEventListener('mousedown', outSideClick, false);

    if (active) {
      if (isResize) {
        $(node.current).resizable('destroy');
      }

      if (isRotate) {
        $(node.current).rotatable('destroy');
      }
    }

    setImageStyles((prevState) => ({
      ...prevState,
      active: false,
      rotate: false,
      size: false,
    }));
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', outSideClick, false);
      if (!$(node.current).is('.ui-resizable')) {
        if (isResize) {
          const regex = /[+-]?\d+(?:\.\d+)?/g;
          const initAngle = isRotate && valueRotate !== 'not found'
            ? !_.isNull(valueRotate.match(regex))
              ? parseInt(valueRotate.match(regex)[0], 10)
              : 0
            : 0;

          $(node.current).resizable({
            aspectRatio: true,
            degrees: initAngle,
            handles: 'ne, se, sw, nw',
            maxWidth: 750,
            resize: (event, ui) => {
              setTimeout(() => {
                node.current.firstChild.style.fontSize = `${ui.size.width}px`;
                const max = ui.size.width > ui.size.height ? ui.size.width : ui.size.height;
                node.current.firstChild.style.maxWidth = `${max}px`;
                if (isWidth) {
                  node.current.firstChild.style.width = `${max}px`;
                }
                if (isHeight) {
                  node.current.firstChild.style.height = `${max}px`;
                }
                node.current.style.width = `${max}px`;
                node.current.style.height = `${max}px`;
              }, 5);
            },
            stop: (event, ui) => {
              const max = ui.size.width > ui.size.height ? `${ui.size.width}px` : `${ui.size.height}px`;
              onChange(domElement.transform.resize.source, max);
            },
          });
        }

        if (isRotate) {
          const regex = /[+-]?\d+(?:\.\d+)?/g;
          const initAngle = isRotate && valueRotate !== 'not found'
            ? !_.isNull(valueRotate.match(regex))
              ? parseInt(valueRotate.match(regex)[0], 10)
              : 0
            : 0;

          $(node.current).rotatable({
            angle: true,
            degrees: initAngle,
            start() {},
            rotate() {
              node.current.style.transform = null;
            },
            stop(event, ui) {
              let given_angle;
              if (ui.angle.current < 0) {
                given_angle = ui.angle.current + 2 * Math.PI;
              } else {
                given_angle = ui.angle.current;
              }
              const new_angle = `${Math.round((given_angle * 180) / Math.PI)}deg`;

              onChange(domElement.transform.rotate.source, `rotate(${new_angle})`);
            },
          });
        }
      }
    }

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataID, active, rotate, size]);

  const onClick = () => {
    if (!active) {
      click();
      setImageStyles((prevState) => ({
        ...prevState,
        active: true,
      }));
    }
  };

  useEffect(() => {
    node.current.firstChild.style.transform = 'none';
  });

  return (
    <div
      onClick={() => onClick()}
      className={classNames('editor__action-element', {
        'editor__image-resizable': true,
        'editor__image-resizable-active': active,
      })}
    >
      <div
        ref={node}
        style={{
          transform: valueRotate,
        }}
        className="editor__action-element-hover"
      >
        {children}
      </div>
    </div>
  );
};

Transform.propTypes = {
  domElement: PropTypes.object,
  click: PropTypes.func,
  dataID: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export default Transform;
