import React, {
  useEffect, useRef, useState, forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { RichUtils, Modifier, EditorState } from 'draft-js';
import clearFormatting from 'draft-js-clear-formatting';
import usePortal from '../../../utils/usePortal';
import './_wysiwyg.scss';

import { Tooltip, TooltipBody } from '../../../layouts/Tooltip';

import { Wrapper } from './Layouts';
import HeaderList from './actions/Headers/List';
import AlignList from './actions/Align/List';
import FontSizeList from './actions/FontSize/List';
import LetterSpacingList from './actions/LetterSpacing/List';
import LineHeightList from './actions/LineHeight/List';

import ActionAlign from './actions/Align';
import ButtonBold from './actions/Bold';
import ButtonItalic from './actions/Italic';
import ButtonUnderline from './actions/Underline';
import ButtonStrikethrough from './actions/Strikethrough';
import ButtonHeader from './actions/Headers';
import ButtonUppercase from './actions/Uppercase';
import ButtonFontSize from './actions/FontSize';
import ButtonLineHeight from './actions/LineHeight';
import ButtonLetterSpacing from './actions/LetterSpacing';
import ButtonLink from './actions/Link';
import ButtonListOL from './actions/ListOL';
import ButtonListUl from './actions/ListUL';
import ButtonColor from './actions/Color';
import ButtonClear from './actions/Clear';

import getPosition from '../../../utils/getPosition';
import { CUSTOM_STYLES_JS, DEFAULT_STYLES, ExtendedRichUtils } from '../../Core/RichTextInline/config';
import { getSelectionValues } from '../../Core/RichTextInline/getSelectionValues';

import { fitsOnScreen } from '../../../utils/helpers';

/**
 * Wysiwyg
 *
 * @component
 * @category Components
 * @subcategory Tooltips main
 *
 */
const TooltipWysiwyg = forwardRef((props, ref) => {
  const {
    editorState, styles, onChange, linkNode, parentNode, tooltip,
  } = props;

  const node = useRef(null);
  const target = usePortal();

  const activeValues = getSelectionValues(editorState);
  const [activeAction, setActiveAction] = useState(false);
  const [tooltipSettings, setTooltipSettings] = useState({
    position: false,
    fits: false,
    transition: false,
  });
  const { position, fits, transition } = tooltipSettings;

  useEffect(() => {
    if (!fits) {
      const fits = fitsOnScreen(ref.current);
      let tooltipStylesPosition;
      let fitsPosition = '';

      if (fits.top) {
        tooltipStylesPosition = getPosition(parentNode, ref, {
          direction: 'center top',
          margin: 3,
        });
        if (position) {
          fitsPosition = 'center top';
        }
      } else if (fits.right) {
        tooltipStylesPosition = getPosition(parentNode, ref, {
          direction: 'bottom left',
          margin: 3,
        });
        if (position) {
          fitsPosition = 'bottom left';
        }
      } else if (fits.left) {
        tooltipStylesPosition = getPosition(parentNode, ref, {
          direction: 'bottom right',
          margin: 3,
        });
        if (position) {
          fitsPosition = 'bottom right';
        }
      } else {
        tooltipStylesPosition = getPosition(parentNode, ref, {
          direction: 'center top',
          margin: 3,
        });
        if (position) {
          fitsPosition = 'center top';
        }
      }

      setTooltipSettings((prevState) => ({
        ...prevState,
        position: tooltipStylesPosition,
        fits: fitsPosition,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fits]);

  useEffect(() => {
    if (position && fits) {
      setTooltipSettings((prevState) => ({
        ...prevState,
        position: getPosition(parentNode, ref, {
          direction: fits,
          margin: 3,
        }),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAction]);

  useEffect(() => {
    const animationDelete = setTimeout(() => {
      setTooltipSettings((prevState) => ({
        ...prevState,
        transition: true,
      }));
    }, 300);
    return () => {
      clearTimeout(animationDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInlineStyle = (code) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, code);
    onChange(newEditorState);
  };

  const onChangeBlockType = (styles) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, styles);
    onChange(newEditorState);
  };

  const onChangeCustomStyles = (key, value) => {
    onChange(styles[key].toggle(editorState, value));
  };

  const onChangeAlignment = (value) => {
    const valueToUpperCase = value.toUpperCase();
    const newEditorState = styles.textAlign.toggle(editorState, valueToUpperCase);
    onChange(ExtendedRichUtils.toggleAlignment(newEditorState, valueToUpperCase));
  };

  const onClearStyles = () => {
    const currentInlineStyleList = editorState
      .getCurrentInlineStyle()
      .toList()
      .toJS();
    const allStyles = [...new Set(currentInlineStyleList.concat(DEFAULT_STYLES))];

    const contentState = editorState.getCurrentContent();

    const contentWithoutStyles = allStyles.reduce(
      (newContentState, style) => Modifier.removeInlineStyle(newContentState, editorState.getSelection(), style),
      contentState,
    );

    const newEditorState = EditorState.push(editorState, contentWithoutStyles, 'change-inline-style');
    const options = {
      inline: true,
      entities: true,
      lists: true,
    };

    let EditorStateRemoveStyles = newEditorState;
    CUSTOM_STYLES_JS.forEach((item) => {
      EditorStateRemoveStyles = styles[item].remove(EditorStateRemoveStyles);
    });

    onChange(clearFormatting(EditorStateRemoveStyles, options));
  };

  const onChangeLink = (link) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url: link.value,
      ...link,
    });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const _newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    const newEditorState = RichUtils.toggleLink(_newEditorState, _newEditorState.getSelection(), entityKey);
    onChange(newEditorState);
  };

  const options = tooltip && tooltip.options ? tooltip.options : false;

  const onChangeActive = (value) => {
    setActiveAction(value);
  };

  return createPortal(
    <Tooltip ref={ref} position={position} classNames={transition ? 'animate-transition-03' : false}>
      <TooltipBody>
        <Wrapper>
          {(() => {
            switch (activeAction) {
              case 'headers':
                return (
                  <HeaderList
                    onClose={() => setActiveAction(false)}
                    onChange={onChangeBlockType}
                    value={activeValues.HEADER}
                  />
                );
              case 'align':
                return (
                  <AlignList
                    onClose={() => setActiveAction(false)}
                    onChange={onChangeAlignment}
                    value={activeValues.ALIGN}
                  />
                );
              case 'fontSize':
                return (
                  <FontSizeList
                    onClose={() => setActiveAction(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.FONT_SIZE}
                    headers={activeValues.HEADER}
                  />
                );
              case 'letterSpacing':
                return (
                  <LetterSpacingList
                    onClose={() => setActiveAction(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.LETTER_SPACING}
                  />
                );
              case 'lineHeight':
                return (
                  <LineHeightList
                    onClose={() => setActiveAction(false)}
                    onChange={onChangeCustomStyles}
                    value={activeValues.LINE_HEIGHT}
                    headers={activeValues.HEADER}
                  />
                );
              default:
                return (
                  <>
                    {options
                      && Object.keys(options).map((item, index) => {
                        switch (item) {
                          case 'headers':
                            return (
                              <ButtonHeader
                                key={`actions-button-${index}`}
                                onClick={() => onChangeActive(item)}
                                value={activeValues.HEADER}
                              />
                            );
                          case 'bold':
                            return (
                              <ButtonBold
                                key={`actions-button-${index}`}
                                onClick={onChangeInlineStyle}
                                value={activeValues.BOLD}
                              />
                            );
                          case 'italic':
                            return (
                              <ButtonItalic
                                key={`actions-button-${index}`}
                                onClick={onChangeInlineStyle}
                                value={activeValues.ITALIC}
                              />
                            );
                          case 'underline':
                            return (
                              <ButtonUnderline
                                key={`actions-button-${index}`}
                                onClick={onChangeInlineStyle}
                                value={activeValues.UNDERLINE}
                              />
                            );
                          case 'strikethrough':
                            return (
                              <ButtonStrikethrough
                                key={`actions-button-${index}`}
                                onClick={onChangeInlineStyle}
                                value={activeValues.STRIKETHROUGH}
                              />
                            );
                          case 'uppercase':
                            return (
                              <ButtonUppercase
                                key={`actions-button-${index}`}
                                onClick={onChangeCustomStyles}
                                value={activeValues.TEXT_TRANSFORM}
                              />
                            );
                          case 'fontSize':
                            return (
                              <ButtonFontSize
                                key={`actions-button-${index}`}
                                onClick={() => onChangeActive(item)}
                                value={activeValues.FONT_SIZE}
                              />
                            );
                          case 'lineHeight':
                            return (
                              <ButtonLineHeight
                                key={`actions-button-${index}`}
                                onClick={() => onChangeActive(item)}
                                value={activeValues.LINE_HEIGHT}
                              />
                            );
                          case 'letterSpacing':
                            return (
                              <ButtonLetterSpacing
                                key={`actions-button-${index}`}
                                onClick={() => onChangeActive(item)}
                                value={activeValues.LETTER_SPACING}
                              />
                            );
                          case 'align':
                            return <ActionAlign key={`actions-button-${index}`} onClick={() => onChangeActive(item)} />;
                          case 'link':
                            return (
                              <ButtonLink
                                key={`actions-button-${index}`}
                                onChange={onChangeLink}
                                refNode={linkNode}
                                value={activeValues.LINK}
                              />
                            );
                          case 'ol':
                            return (
                              <ButtonListOL
                                key={`actions-button-${index}`}
                                onClick={onChangeBlockType}
                                value={activeValues.OL}
                              />
                            );
                          case 'ul':
                            return (
                              <ButtonListUl
                                key={`actions-button-${index}`}
                                onClick={onChangeBlockType}
                                value={activeValues.UL}
                              />
                            );
                          case 'color':
                            return (
                              <ButtonColor
                                key={`actions-button-${index}`}
                                ref={node}
                                onChange={onChangeCustomStyles}
                                value={activeValues.COLOR}
                              />
                            );
                          case 'clear':
                            return <ButtonClear key={`actions-button-${index}`} onClick={onClearStyles} />;
                          default:
                            return null;
                        }
                      })}
                  </>
                );
            }
          })()}
        </Wrapper>
      </TooltipBody>
    </Tooltip>,
    target,
  );
});

TooltipWysiwyg.propTypes = {
  /**
   * Editorstate от Draftjs
   */
  editorState: PropTypes.object.isRequired,
  /**
   * Styles Draftjs
   */
  styles: PropTypes.object.isRequired,
  /**
   * Передаем новый Editorstate
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Ref element самого тултипа
   */
  linkNode: PropTypes.object,
  /**
   * Ref element возле которого должен появится тултип
   */
  parentNode: PropTypes.object.isRequired,
  /**
   * Опции тултипа из template.json блока
   */
  tooltip: PropTypes.object.isRequired,
};

TooltipWysiwyg.defaultProps = {};

export default TooltipWysiwyg;
