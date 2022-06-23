import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { filesManagerDelete } from '../../../../redux/actions/FilesManager';
import { tabs } from '../config';

import Image from '../elements/image';

const UploadedContainer = ({ onImageSelection, onChangeTab }) => {
  const dispatch = useDispatch();
  const filesManager = useSelector((state) => state.filesmanager);
  const {
    data, isFetching, isFetchingDelete, isFetchingDeleteFile,
  } = filesManager;

  const onDeleteImage = (item) => {
    if (item && item.id) {
      dispatch(filesManagerDelete(item.id));
    }
  };

  const empty = !data.length && !isFetching;

  return (
    <div className="editor__filesmanager-uploader">
      <div className="editor__filesmanager-wrapper scroll-body">
        <>
          {!empty ? (
            <>
              {data.map((item) => {
                const statuses = {
                  loader: isFetchingDelete.loader && Number(item.id) === Number(isFetchingDelete.loader),
                  failed: isFetchingDelete.failed && Number(item.id) === Number(isFetchingDelete.failed),
                };
                return (
                  <Image
                    key={item.id}
                    image={item.thumbnail_url || item.url}
                    url={item.url}
                    onSelectImage={() => onImageSelection(item)}
                    onDeleteImage={() => onDeleteImage(item)}
                    loader={statuses.loader}
                    failed={statuses.failed}
                    blockedAll={isFetchingDeleteFile}
                  />
                );
              })}
            </>
          ) : (
            <div className="editor__filesmanager-empty">
              <div className="empty-uploaded">
                <div>You don't have any images yet.</div>
                <div>
                  Upload or use
                  {' '}
                  <span className="text-underline" onClick={() => onChangeTab(tabs[1])}>
                    stock images.
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

UploadedContainer.propTypes = {
  onImageSelection: PropTypes.func,
  onChangeTab: PropTypes.func,
}

export default UploadedContainer;
