import './_devtool.scss';
import React, { useState, useRef } from 'react';
import { Editor, convertToRaw, EditorState } from 'draft-js';
import { uuid } from 'uuidv4';
import {
  customStyleFn, customStyleMap, getBlockStyle, styles,
} from '../components/Core/RichTextInline/config';
import WysiwygTooltip from '../components/Tooltips/Wysiwyg';
import { convertEditorStateToHTML } from '../components/Core/RichTextInline/helper';

import { parse } from './formater';
import cssJSON from './cssJSON';

const DevTool = () => {
  const node = useRef(null);
  const [defaultText, setDefaultText] = useState(EditorState.createEmpty());
  const [draft, setDraft] = useState('');
  const [html, setHtml] = useState('');

  const onConvertDraftJS = () => {
    setHtml(convertEditorStateToHTML(defaultText));
    const textData = convertToRaw(defaultText.getCurrentContent());

    const formated = textData.blocks.map((block, i) => ({
      editor: {
        id: uuid(),
        type: 'wysiwyg',
        data: { blocks: [block], entityMap: textData.entityMap },
      },
      draft: convertEditorStateToHTML(defaultText).split('\n')[i],
    }));
    // const data = {
    //   id: uuid(),
    //   "type": "wysiwyg",
    //   "data": textData
    // };
    setDraft(JSON.stringify(formated, null, '\t'));
  };

  const onClipBoardCopy = (e, id) => {
    e.preventDefault();

    const el = document.getElementById(id);
    const range = document.createRange();

    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    document.execCommand('copy');
    window.getSelection().removeRange(range);
  };

  const [htmlValue, setHtmlValue] = useState('<div class="class newclass" data-editor="true">HTML to transform</div>');
  const [jsonValue, setJsonValue] = useState('');
  const onConvertValue = () => {
    setJsonValue(JSON.stringify(parse(htmlValue), null, '\t'));
  };

  const [cssValue, setCssValue] = useState('.red { color: red; }');
  const [cssToJsonValue, setCssToJsonValue] = useState('');
  const onConvertCSStoJSON = () => {
    setCssToJsonValue(JSON.stringify(cssJSON.toJSON(cssValue), null, '\t'));
  };

  return (
    <>
      <div className="d-flex h-100" id="wrapper">
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={() => onConvertDraftJS()}>
                Convert
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h3>Default</h3>
              <WysiwygTooltip
                tooltip={{
                  options: {
                    headers: true,
                    bold: true,
                    italic: true,
                    underline: true,
                    strikethrough: true,
                    uppercase: true,
                    fontSize: true,
                    lineHeight: true,
                    letterSpacing: true,
                    align: true,
                    link: true,
                    ol: true,
                    ul: true,
                    color: true,
                    clear: true,
                  },
                }}
                styles={styles}
                editorState={defaultText}
                onChange={(editorState) => setDefaultText(editorState)}
                dataID="200"
                ref={node}
                linkNode={node}
                parentNode={node}
              />
              <div className="mt-4 pb-3">
                <div ref={node} className="pb-4" />
                <Editor
                  editorState={defaultText}
                  onChange={(editorState) => setDefaultText(editorState)}
                  customStyleMap={customStyleMap}
                  blockStyleFn={getBlockStyle}
                  customStyleFn={customStyleFn}
                />
              </div>
            </div>
            <div className="col-md-4">
              <h3>Editor</h3>
              <button onClick={(e) => onClipBoardCopy(e, 'copy-draft')}>Copy</button>
              <pre id="copy-draft">{draft}</pre>
            </div>
            <div className="col-md-4">
              <h3>HTML</h3>
              <button onClick={(e) => onClipBoardCopy(e, 'copy-html')}>Copy</button>
              <pre id="copy-html">{html}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="page">
          <header>
            <h1>HTML to JSON</h1>
            <button className="btn btn-primary ml-5" onClick={onConvertValue}>
              Confirm convert to JSON
            </button>
          </header>
          <div className="converter">
            <div className="split">
              <div className="pane-header">
                <label>HTML</label>
              </div>
              <div className="pane pane-source">
                <textarea onChange={(e) => setHtmlValue(e.target.value)} id="source" value={htmlValue} />
              </div>
            </div>
            <div className="split">
              <div className="pane-header">
                <label>JSON</label>
                <button onClick={(e) => onClipBoardCopy(e, 'copy-json')}>Copy</button>
              </div>
              <div className="pane pane-output">
                <pre id="copy-json">{jsonValue}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <div className="page">
          <header>
            <h1>CSS to JSON</h1>
            <button className="btn btn-primary ml-5" onClick={onConvertCSStoJSON}>
              Confirm convert to JSON
            </button>
          </header>
          <div className="converter">
            <div className="split">
              <div className="pane-header">
                <label>CSS</label>
              </div>
              <div className="pane pane-source">
                <textarea onChange={(e) => setCssValue(e.target.value)} id="source" value={cssValue} />
              </div>
            </div>
            <div className="split">
              <div className="pane-header">
                <label>JSON</label>
                <button onClick={(e) => onClipBoardCopy(e, 'copy-css-to-json')}>Copy</button>
              </div>
              <div className="pane pane-output">
                <pre id="copy-css-to-json">{cssToJsonValue}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevTool;
