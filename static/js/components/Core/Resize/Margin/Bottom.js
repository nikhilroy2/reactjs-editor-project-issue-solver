import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/resizable';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { getObjectSource, getParentKey, getSourceValue } from '../../../../utils/SourceValue';
import Methods from '../../../../utils/Methods/index';
import { dataChangeValues } from '../../../../redux/actions/data/update';

const Bottom = ({ value, dataID }) => {
  const node = useRef(null);
  const tooltipNode = useRef(null);
  const dispatch = useDispatch();

  const [val, setVal] = useState(getSourceValue(value, dataID));

  useEffect(() => {
    setVal(getSourceValue(value, dataID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSourceValue(value, dataID)]);

  useEffect(() => {
    $(node.current).resizable({
      handles: 's',
      minHeight: 0,
      maxHeight: 500,
      start: (event) => {
        event.target.classList.add('editor__resizebox-active');
        tooltipNode.current.classList.add('editor__resizebox-tooltip-active');
        node.current.parentNode.classList.add('active-node');
      },
      stop: (event, ui) => {
        event.target.classList.remove('editor__resizebox-active');
        tooltipNode.current.classList.remove('editor__resizebox-tooltip-active');
        node.current.parentNode.classList.remove('active-node');

        setTimeout(() => {
          const data = Methods.getData(dataID);
          const keys = getParentKey(value);
          const newData = _.cloneDeep(data.data);
          const px = `${ui.size.height > 0 ? ui.size.height : 0}px`;
          const oldPX = getSourceValue(value, dataID);

          if (px !== oldPX) {
            if (node.current && node.current.parentNode) {
              node.current.parentNode.style.marginBottom = null;
            }
            if (keys.currentPath === 'default' || keys.currentPath === false) {
              dispatch(dataChangeValues(px, keys.parentKey, dataID));
            } else {
              const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
              newDataCurrentPath[keys.currentKey] = px;
              dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
            }
          }
        }, 300);
      },
      resize: (event, ui) => {
        setTimeout(() => {
          node.current.parentNode.style.marginBottom = `${ui.size.height > 0 ? ui.size.height : 0}px`;
          setVal(`${ui.size.height > 0 ? ui.size.height : 0}px`);
          tooltipNode.current.innerHTML = `${ui.size.height > 0 ? ui.size.height : 0}px`;
        }, 5);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  return (
    <div ref={node} className="editor__resizebox-bottom" style={{ height: `${val}`, bottom: `-${val}` }}>
      <div ref={tooltipNode} className="editor__resizebox-tooltip">
        0
      </div>
    </div>
  );
};

Bottom.propTypes = {
  value: PropTypes.object,
  dataID: PropTypes.number,
}

export default Bottom;
