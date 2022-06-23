import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

import Image from '../elements/image';
import Empty from '../../../../assets/img/files_manager_empty.svg';

import { filesManagerUploadPixabay } from '../../../../redux/actions/FilesManager';

import { toFileFromBase64 } from '../../../../utils/BlobImageParser';
import Preloader from '../elements/Preloader';

const PixabayContainer = ({
  query, hits, loadMoreItems, isStateFetching, stateQuery, error,
}) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const dispatch = useDispatch();
  const filesManager = useSelector((state) => state.filesmanager);
  const { isFetchingPixabay, isFetchingLoadPixabay, data } = filesManager;

  useEffect(() => {
    if (inView && !isStateFetching) {
      loadMoreItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, inView]);

  const uploadImageToCdn = (item) => async () => {
    const { webformatURL, type, previewURL } = item;
    try {
      const file = await toFileFromBase64(webformatURL, previewURL, type);
      const formData = new FormData();
      formData.append('file', file);
      dispatch(filesManagerUploadPixabay(formData, item.id));
    } catch (error) {
      console.log(error);
    }
  };

  const empty = query && !isStateFetching && !hits.length;

  return (
    <>
      <div className="editor__filesmanager-wrapper scroll-body">
        <>
          {empty || error ? (
            <div className="empty-uploaded">{error ? 'Pixabay service error!' : 'No results found…'}</div>
          ) : (
            <>
              {hits.map((item, index) => {
                if (!item.previewURL) {
                  item.previewURL = Empty;
                }
                const name = item.previewURL.replace(
                  item.previewURL.slice(0, item.previewURL.lastIndexOf('/') + 1),
                  '',
                );
                const itemsIsSet = data.find((item) => (
                  item.file_name
                    .replace(/:/g, '/')
                    .split('/')
                    .pop() === name
                ));
                const statuses = {
                  pending: isFetchingPixabay.pending && Number(item.id) === Number(isFetchingPixabay.pending),
                  complete: isFetchingPixabay.complete && Number(item.id) === Number(isFetchingPixabay.complete),
                  failed: isFetchingPixabay.failed && Number(item.id) === Number(isFetchingPixabay.failed),
                };
                return (
                  <Image
                    type={2}
                    key={item.id}
                    image={item.previewURL}
                    url={item.largeImageURL}
                    uploadImage={uploadImageToCdn(item, index)}
                    index={index}
                    blockedAll={isFetchingLoadPixabay}
                    itemsIsSet={itemsIsSet}
                    pending={statuses.pending}
                    complete={statuses.complete}
                    failed={statuses.failed}
                  />
                );
              })}
            </>
          )}
          <div className="editor__filesmanager-wrapper_bottom-shadow" />
          <div ref={ref} style={{ width: '100%', height: '2px' }} />
          {isStateFetching && (
            <div className={classNames('loader', { 'loader-top': stateQuery && !hits.length })}>
              <Preloader />
            </div>
          )}
        </>
      </div>
    </>
  );
};

PixabayContainer.propTypes = {
  query: PropTypes.string,
  hits: PropTypes.array,
  loadMoreItems: PropTypes.func,
  isStateFetching: PropTypes.bool,
  stateQuery: PropTypes.string,
  error: PropTypes.bool,
};

export default PixabayContainer;
