import './_icons.scss';
import React, { useState, useEffect } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { useDebounce } from 'use-debounce';
import _ from 'lodash';
import PropTypes from 'prop-types';

import ListRender from './List';
import Spinner from '../../../layouts/Loaders/Spinner';

import { searchIcons, rowsCounter } from './helpers';

const Icons = ({
  searchValue, onChange, value, list, rowHeight, listHeight, chunkListLength,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchDebounce] = useDebounce(searchValue, 350);

  const currentIcon = value;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const listAfterSearchFilter = searchIcons(list, searchDebounce);
  const chunkList = _.chunk(_.chunk(listAfterSearchFilter, chunkListLength), chunkListLength);

  return (
    <div className="editor__icon-list-container">
      {isLoading ? (
        <div className="editor__icon-list-preloader" style={{ height: listHeight || 'inherit' }}>
          <Spinner theme="dark" />
        </div>
      ) : (
        <div className="editor__icon-list-wrapper scrollbar-light">
          {chunkList.length ? (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={({ index }) => rowsCounter(index, rowHeight, chunkList, chunkListLength)}
                  rowRenderer={ListRender}
                  rowCount={chunkList.length}
                  overscanRowCount={5}
                  chunkList={chunkList}
                  currentIcon={currentIcon}
                  onChange={onChange}
                  chunkListLength={chunkListLength}
                />
              )}
            </AutoSizer>
          ) : (
            'No result :('
          )}
        </div>
      )}
    </div>
  );
};

Icons.defaultProps = {
  rowHeight: 250,
  listHeight: 250,
  chunkListLength: 5,
  searchValue: '',
  list: [],
};

Icons.propTypes = {
  searchValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.array,
  rowHeight: PropTypes.number,
  listHeight: PropTypes.number,
  chunkListLength: PropTypes.number,
};

export default Icons;
