import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';

import Input from './input';

import { filesManagerUpload } from '../../../../../redux/actions/FilesManager';

const MyDropzone = () => {
  const dispatch = useDispatch();
  const filesmanager = useSelector((state) => state.filesmanager);

  const [status, setStatus] = useState('');
  const { isFetchingUploadImage, isComplete, error } = filesmanager;

  const handleChangeStatus = ({ file, remove }, status) => {
    if (status === 'done') {
      remove();
    }

    if (status === 'rejected_file_type') {
      setStatus(status);
      return;
    }

    setStatus(status);
    const formdata = new FormData();
    formdata.append('file', file);

    if (!isFetchingUploadImage) {
      dispatch(filesManagerUpload(formdata));
      remove();
    }
  };

  const sizeTypeError = status === 'error_file_size' || status === 'rejected_file_type';
  const dropzoneWrapp = 'editor__dropzone-wrapper';
  const fechingClass = `${dropzoneWrapp} fetching`;
  const errorClass = `${dropzoneWrapp} error`;
  const completeClass = `${dropzoneWrapp} complete`;

  return (
    <div className="editor__dropzone-parent">
      <div className="editor__dropzone-spaces">
        <Dropzone
          addClassNames={
            { dropzone: isFetchingUploadImage ? fechingClass : sizeTypeError || error ? errorClass : isComplete ? completeClass : dropzoneWrapp }
          }
          onChangeStatus={handleChangeStatus}
          disabled={isFetchingUploadImage}
          maxFiles={1}
          multiple={false}
          canCancel={false}
          maxSizeBytes={1024 * 1024 * 5}
          accept="image/*"
          canRemove={false}
          SubmitButtonComponent={null}
          PreviewComponent={null}
          inputContent={(files, extra) => (
            <Input
              key="myInput"
              {...files}
              {...extra}
              isFetching={isFetchingUploadImage}
              sizeTypeError={sizeTypeError}
              error={error}
              files={files}
              isComplete={isComplete}
              status={status}
            />
          )}
        />
      </div>
    </div>
  )
}

export default MyDropzone;
