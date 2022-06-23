import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { List } from 'react-virtualized';
import _ from 'lodash';
import empty from '../../../../assets/img/Artboard.svg';

import Font from '../elements/font/font';
import Input from '../../../Elements/Input';
import FontsFilter from '../elements/filter';
import MarkIndicator from '../ui/mark';

import { mapFontsSelector } from '../../../../redux/selectors/fonts';
import {
  listHeight, rowHeight, rowWidth, rowCount,
} from '../config';
import { searchFilterFonts } from './helper';

import fontsGenerate from '../../../../utils/fontsGenerate';
import Spinner from '../../../../layouts/Loaders/Spinner';

const GoogleFonts = ({ isEmpty }) => {
  const ref = useRef(null);
  const [preloader, setPreloader] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setOpenDropdown] = useState(false);
  const fonts = useSelector((state) => mapFontsSelector(state));
  const { fontsData, subsetsOptions } = fonts;
  const [selectValue, setSelectValue] = useState(subsetsOptions[0]);
  const fontsFiltered = searchFilterFonts(fontsData, searchValue, selectValue);

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }, []);

  const clearInputValue = () => {
    ref.current.focus();
    setSearchValue('');
  };

  const toggleOpen = () => {
    setOpenDropdown(!isOpen);
  };

  const handleSelect = (value) => {
    toggleOpen();
    setSelectValue(value);
  };

  const renderFonts = (startIndex, stopIndex) => {
    for (let i = startIndex; i < stopIndex; i++) {
      if (fontsFiltered[i]) {
        fontsFiltered[i].forEach((font) => {
          fontsGenerate(font.id);
        });
      }
    }
  };

  useEffect(() => {
    const startIndex = 0;
    const endIndex = rowCount * 3;
    renderFonts(startIndex, endIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectValue]);

  const onRowsRendered = _.debounce(({
    overscanStartIndex, overscanStopIndex,
  }) => {
    renderFonts(overscanStartIndex, overscanStopIndex);
  }, 300);

  // eslint-disable-next-line
  const ListRender = ({ index, key, style }) => {
    return (
      (
        <div key={key} style={style}>
          <div className="editor__fontsmanager-row">
            {fontsFiltered[index].map((item) => (
              <Font
                id={item.id}
                key={item.id}
                category={item.category}
                title={item.family}
                subset={selectValue.value.toLowerCase() === 'all languages' ? item.subsets[0] : selectValue.value}
                stylesCount={item.variants.length}
                type="google"
                // status={getGoogleFontStatus(isLoading, error, success)}
                status={item.status}
              />
            ))}
          </div>
        </div>
      )
    )
  }

  return (
    <div className="scrollbar-light">
      <div className="editor__filters-wrapper">
        <div className="editor__input-wrapper">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            bg="grey"
            placeholder="Search..."
            className="filter"
            newRef={ref}
          />
          {searchValue && <MarkIndicator onClick={clearInputValue} />}
        </div>
        <div className="editor__select-wrapper">
          <div className="select-title">Languages:</div>
          <FontsFilter
            // dropdown
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            value={selectValue}
            // select
            options={subsetsOptions}
            onChange={handleSelect}
            onBlur={toggleOpen}
          />
        </div>
      </div>
      <div className={classNames('editor__fontsmanager-wrapper', { empty: isEmpty })}>
        {preloader ? (
          <div className="editor__fontsmanager-preloader">
            <Spinner theme="dark" />
          </div>
        ) : !isEmpty && fontsFiltered.length ? (
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={ListRender}
            rowCount={fontsFiltered.length}
            overscanRowCount={rowCount}
            onRowsRendered={onRowsRendered}
          />
        ) : (
          <div className="editor__not-found animated fadeIn faster-3">
            <div>
              <div className="editor__not-found-image">
                <img src={empty} alt="not-found" />
              </div>
              <div className="editor__not-found_text">No fonts found...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

GoogleFonts.defaultProps = {
  isEmpty: false,
};

GoogleFonts.propTypes = {
  isEmpty: PropTypes.bool,
};

export default GoogleFonts;
