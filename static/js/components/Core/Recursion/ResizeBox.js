import { useEffect } from 'react';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { dataChangeValues } from '../../../redux/actions/data/update';
import { getObjectSource, getParentKey } from '../../../utils/SourceValue';
import Methods from '../../../utils/Methods';

const ResizeBox = ({
  domElement, children, dataID, node,
}) => {
  const dispatch = useDispatch();

  const onChangeData = (source, value) => {
    const data = Methods.getData(dataID);
    const keys = getParentKey(source);
    const newData = _.cloneDeep(data.data);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(value, keys.parentKey, dataID));
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      newDataCurrentPath[keys.currentKey] = value;
      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
    }
  };

  useEffect(() => {
    if (domElement.resizeBox) {
      const handlesKeys = {
        left: 'w',
        right: 'e',
        bottom: 's',
        top: 'n',
      };
      const options = domElement.resizeBox.options ? domElement.resizeBox.options : {};

      const getHandles = () => {
        const handlesArray = [];
        Object.keys(handlesKeys).forEach((handleKey) => {
          if (domElement.resizeBox[handleKey]) {
            handlesArray.push(handlesKeys[handleKey]);
          }
        });
        if (handlesArray.length) {
          return handlesArray.join(',');
        }
        return false;
      };

      const handles = getHandles();

      if (handles) {
        $(node.current).resizable({
          ...options,
          handles,
          stop: (event, ui) => {
            setTimeout(() => {
              if (ui.element.data('ui-resizable')) {
                const element = ui.element.data('ui-resizable');
                if (element.axis) {
                  // eslint-disable-next-line
                  Object.keys(handlesKeys).forEach((key) => {
                    if (handlesKeys[key] === element.axis) {
                      let value;
                      if (element.axis === 'w' || element.axis === 'e') {
                        value = `${ui.size.width.toFixed(0)}px`;
                      }
                      if (element.axis === 's' || element.axis === 'n') {
                        value = `${ui.size.height.toFixed(0)}px`;
                      }

                      if (domElement.resizeBox[key].source) {
                        onChangeData(domElement.resizeBox[key].source, value);
                        node.current.style.width = null;
                        node.current.style.maxWidth = null;
                        node.current.style.height = null;
                        node.current.style.maxHeight = null;
                      } else {
                        console.error('Not found source');
                      }
                      return true;
                    }
                  });
                }
              }
              $('.resize-box__tooltip').remove();
            }, 10);
          },
          resize: (event, ui) => {
            node.current.style.left = null;
            node.current.style.top = null;

            setTimeout(() => {
              if (ui.element.data('ui-resizable')) {
                const element = ui.element.data('ui-resizable');
                if (element.axis) {
                  if (element.axis === 'w' || element.axis === 'e') {
                    $(ui.element)
                      .find(`.ui-resizable-${element.axis}`)
                      .html(`<div class="resize-box__tooltip">${ui.size.width.toFixed(0)}px</div>`);
                    node.current.style.maxWidth = `${ui.size.width}px`;
                  }
                  if (element.axis === 's' || element.axis === 'n') {
                    $(ui.element)
                      .find(`.ui-resizable-${element.axis}`)
                      .html(`<div class="resize-box__tooltip">${ui.size.height.toFixed(0)}px</div>`);
                    node.current.style.height = `${ui.size.height}px`;
                  }
                }
              }
            }, 5);
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default ResizeBox;
