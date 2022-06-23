import React, {
  useCallback, useState, useEffect,
} from 'react';
import axios from 'axios';

import _ from 'lodash';
import { useDebounce } from 'use-debounce';
import PixabayContainer from './Body';

import { PIXABAY_SETTINGS } from '../config';
import Preloader from '../elements/Preloader';
import Input from '../../../Elements/Input';

const Pixabay = () => {
  const [preloader, setPreloader] = useState(true);
  const [hits, setHits] = useState([]);
  const [pixabayError] = useState(false);
  const [query, changeQuery] = useState('');
  const [isStateFetching, setFetching] = useState(false);
  const [newPage, setPage] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [debounceSearchValue] = useDebounce(searchValue, 500);

  const searchPixabay = (value) => {
    setPage(0);
    setHits([]);
    changeQuery(value);
  };

  useEffect(() => {
    searchPixabay(debounceSearchValue);
  }, [debounceSearchValue]);

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }, []);

  // const images = useSelector((state) => state.filesmanager);
  // const { isFetching } = images;

  const fetchPixabay = useCallback(
    async (page) => {
      setFetching(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=12628428-fe5491ffb5f3155db2fa46917&q=${debounceSearchValue}&per_page=${
            PIXABAY_SETTINGS.perPage
          }&page=${page || 1}`,
        );
        const nextHits = _.concat(hits, response.data.hits);
        setHits(nextHits);
      } catch (error) {
        console.log(error);
      }

      setFetching(false);
    },
    [hits, debounceSearchValue],
  );

  const loadMoreItems = useCallback(() => {
    const nextPage = newPage + 1;
    setPage(nextPage);
    fetchPixabay(nextPage);
  }, [fetchPixabay, newPage, setPage]);

  return (
    <>
      {preloader ? (
        <div className="editor__filesmanager-wrapper">
          <Preloader />
        </div>
      ) : (
        <>
          <div className="editor__search-input-wrapper">
            <Input
              bg="grey"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search image"
            />
          </div>
          <PixabayContainer
            query={debounceSearchValue}
            stateQuery={query}
            hits={hits}
            loadMoreItems={loadMoreItems}
            isStateFetching={isStateFetching}
            error={pixabayError}
          />
        </>
      )}
    </>
  );
};

export default Pixabay;
