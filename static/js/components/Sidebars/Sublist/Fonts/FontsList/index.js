import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AutoSizer, CellMeasurerCache, CellMeasurer, List,
} from 'react-virtualized';
import {
  SidebarHeader, SidebarDescription,
} from '../../../../../layouts/Sidebar';
import Button from '../../../../Elements/Button';
import { getFontActive, getFontPairsList } from '../helpers';
import fontsGenerate from '../../../../../utils/fontsGenerate';
import { fontsUpdatePair } from '../../../../../redux/actions/Fonts';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 80,
});

const SidebarFontsList = ({ onChangeShow }) => {
  const dispatch = useDispatch();
  const { fonts_pairs, options, fontsData } = useSelector((state) => state.fonts);
  const fontsPairs = useMemo(() => getFontPairsList(fonts_pairs, fontsData), [fonts_pairs, fontsData]);
  const currentFont = useMemo(() => getFontActive(options, fontsData), [options, fontsData]);

  const onUpdatePair = (pair) => {
    dispatch(fontsUpdatePair(pair))
  };

  const FontRow = ({
    // eslint-disable-next-line react/prop-types
    index, key, style, parent,
  }) => {
    const font = fontsPairs[index]
    fontsGenerate(font.headers.font.id)
    fontsGenerate(font.body.font.id)
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <div className="editor-sidebar__fonts-item" key={index}>
            <div className="editor-sidebar__fonts-item-wrapper" onClick={() => onUpdatePair(font)}>
              <div
                className="editor-sidebar__fonts-item-headers"
                style={{
                  fontFamily: `'${font.headers.font.family}', ${font.headers.font.category}`,
                }}
              >
                {font.headers.font.family}
              </div>
              <div
                className="editor-sidebar__fonts-item-paragraph"
                style={{
                  fontFamily: `'${font.body.font.family}', ${font.body.font.category}`,
                }}
              >
                Paragraph text -
                {' '}
                {font.body.font.family}
              </div>
            </div>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  return (
    <div className="scrollbar-light">
      <div className="editor-sidebar__fonts-list">
        <div className="editor-sidebar__fonts-headers">
          <SidebarHeader>Fonts</SidebarHeader>
          <SidebarDescription>Change the font set for your panel or customize text styles individually.</SidebarDescription>
        </div>
        <div className="editor-sidebar__fonts-list-body">
          <div className="editor-sidebar__fonts-current-wrapper">
            <div className="editor-sidebar__fonts-current">
              <div
                className="editor-sidebar__fonts-current-headers"
                style={{
                  fontFamily: `'${currentFont.headers.font.family}', ${currentFont.headers.font.category}`,
                  fontWeight: currentFont.headers.weight,
                }}
              >
                {currentFont.headers.font.family}
              </div>
              <div
                className="editor-sidebar__fonts-current-paragraph"
                style={{
                  fontFamily: `'${currentFont.body.font.family}', ${currentFont.body.font.category}`,
                  fontWeight: currentFont.body.weight,
                }}
              >
                Paragraph text -
                {' '}
                {currentFont.body.font.family}
              </div>
              <div className="editor-sidebar__fonts-current-button">
                <Button onClick={() => onChangeShow('edit')}>Edit text styles</Button>
              </div>
            </div>
          </div>
          <div style={{ height: 'calc(100vh - 258px)' }}>
            <AutoSizer disableWidth>
              {
                ({ height }) => (
                  <List
                    width={300}
                    height={height}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    rowRenderer={FontRow}
                    rowCount={fontsPairs.length}
                    overscanRowCount={3}
                  />
                )
              }
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarFontsList.propTypes = {
  onChangeShow: PropTypes.func.isRequired,
};

export default memo(SidebarFontsList);
