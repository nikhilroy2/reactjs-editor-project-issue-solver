import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { Toolbar } from '../../../../layouts/Toobar';
import Bold from './Bold';
import Italic from './Italic';
import Color from './Color';
import Underline from './Underline';
import Strikethrough from './Strikethrough';
import FontSize from './FontSize';
import LineHeight from './LineHeight';
import LetterSpacing from './LetterSpacing';
import ParagraphAndHeaders from './ParagraphAndHeaders';
import Align from './Align';
import Alignments from './Align/Alignments';
import Headers from './ParagraphAndHeaders/Headers';
import Clear from './Clear';
import Link from './Link';
import OrderList from './OrderList';
import UnOrderList from './UnOrderList';
import Uppercase from './Uppercase';
import Image from './Image';
import FontSizeRangeSlider from './FontSize/RangeSlider';
import LineHeightRangeSlider from './LineHeight/RangeSlider';
import LetterSpacingRangeSlider from './LetterSpacing/RangeSlider';
import { isClickToToolbarNode } from '../helper';
import { toolbarClass } from '../config';
import { tooltip } from '../../../../utils/getOffsets';

const getToolbarCoords = (toolBarBounds, selectRangeBounds) => {
  const offsets = tooltip(toolBarBounds, selectRangeBounds);
  return {
    position: 'absolute',
    ...offsets,
  };
};

export const RichToolbar = ({
  tooltip, selectionRangeObj, onClose, ...props
}) => {
  const { Portal } = usePortal();
  const options = tooltip.options || {};
  const toolbarNode = useRef(null);

  const [toolbarSettings, setToolbarSettings] = useState({
    init: false,
    toolBarBounds: false,
    selectRangeBounds: false,
  });

  const [position, setPosition] = useState({});

  const [tooltipBody, setTooltipBody] = useState(false);

  const outSideClick = (e) => {
    if (toolbarNode.current && toolbarNode.current.contains(e.target)) {
      return false;
    }
    const isClick = isClickToToolbarNode(toolbarClass, e.target);
    if (isClick) {
      return false;
    }

    return onClose();
  };
  useEffect(() => {
    if (toolbarSettings.toolBarBounds) {
      const coords = getToolbarCoords(toolbarNode.current.getBoundingClientRect(), selectionRangeObj);
      setPosition(coords);
      setToolbarSettings((prevState) => ({
        ...prevState,
        init: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    toolbarSettings.toolBarBounds.width,
    toolbarSettings.selectRangeBounds.width,
    selectionRangeObj.width,
    selectionRangeObj.height,
    tooltipBody,
  ]);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);

    setToolbarSettings({
      init: true,
      toolBarBounds: toolbarNode.current.getBoundingClientRect(),
      selectRangeBounds: selectionRangeObj,
    });
    return () => {
      document.removeEventListener('mousedown', outSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTooltipBody = (value) => {
    setTooltipBody(value);
  };

  return (
    <Portal>
      <Toolbar.ToolbarWrapper
        style={{
          display: 'inline-block',
          visibility: toolbarSettings.init && position && position.top !== 2 ? 'visible' : 'hidden',
          ...position,
        }}
        className={toolbarClass}
        ref={toolbarNode}
      >
        <Toolbar.ToolbarBody>
          {(() => {
            switch (tooltipBody) {
              case 'fontSize':
                return <FontSizeRangeSlider onChangeTooltipBody={onChangeTooltipBody} {...props} />;
              case 'lineHeight':
                return <LineHeightRangeSlider onChangeTooltipBody={onChangeTooltipBody} {...props} />;
              case 'letterSpacing':
                return <LetterSpacingRangeSlider onChangeTooltipBody={onChangeTooltipBody} {...props} />;
              case 'headers':
                return <Headers onChangeTooltipBody={onChangeTooltipBody} {...props} />;
              case 'alignments':
                return <Alignments onChangeTooltipBody={onChangeTooltipBody} {...props} />;
              default:
                return (
                  <>
                    {Object.keys(options).length
                    // eslint-disable-next-line
                      && Object.keys(options).map((option) => {
                        switch (option) {
                          case 'headers':
                            return (
                              <ParagraphAndHeaders key={option} onChangeTooltipBody={onChangeTooltipBody} {...props} />
                            );
                          case 'bold':
                            return <Bold key={option} {...props} />;
                          case 'italic':
                            return <Italic key={option} {...props} />;
                          case 'underline':
                            return <Underline key={option} {...props} />;
                          case 'strikethrough':
                            return <Strikethrough key={option} {...props} />;
                          case 'uppercase':
                            return <Uppercase key={option} {...props} />;
                          case 'fontSize':
                            return <FontSize key={option} onChangeTooltipBody={onChangeTooltipBody} {...props} />;
                          case 'lineHeight':
                            return <LineHeight key={option} onChangeTooltipBody={onChangeTooltipBody} {...props} />;
                          case 'letterSpacing':
                            return <LetterSpacing key={option} onChangeTooltipBody={onChangeTooltipBody} {...props} />;
                          case 'align':
                            return <Align key={option} onChangeTooltipBody={onChangeTooltipBody} {...props} />;
                          case 'link':
                            return <Link key={option} className={toolbarClass} {...props} />;
                          case 'ol':
                            return <OrderList key={option} {...props} />;
                          case 'ul':
                            return <UnOrderList key={option} {...props} />;
                          case 'image':
                            return <Image key={option} {...props} />;
                          case 'color':
                            return <Color key={option} className={toolbarClass} {...props} />;
                          case 'clear':
                            return <Clear key={option} {...props} />;
                          default:
                            break;
                        }
                      })}
                  </>
                );
            }
          })()}
        </Toolbar.ToolbarBody>
      </Toolbar.ToolbarWrapper>
    </Portal>
  );
};

RichToolbar.propTypes = {
  tooltip: PropTypes.object,
  selectionRangeObj: PropTypes.object,
  onClose: PropTypes.func,
};

export default RichToolbar;
