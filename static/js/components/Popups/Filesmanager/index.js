import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './_files_manager.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import Tabs from '../../../layouts/Tabs';

import { tabs } from './config';
import { backgroundStyles } from '../Fontsmanager/config';
import { Swipe, SwipeItem } from '../../../layouts/Swipe';
import Pixabay from './Pixabay';
import Uploaded from './Uploaded';

import { filesManagerNewImageClear } from '../../../redux/actions/FilesManager';

const tabWidth = 98;

const Filesmanager = ({ onClose, onImageSelection }) => {
  const node = useRef(null);
  const dispatch = useDispatch();
  const filesManager = useSelector((state) => state.filesmanager);
  const { isUploadedNewImage } = filesManager;
  const [position] = useState(false);
  const [activeTab, setActiveTab] = useState({ width: '98px', tab: 0 });

  useEffect(() => {
    if (isUploadedNewImage && activeTab.tab === 0) {
      dispatch(filesManagerNewImageClear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Popover ref={node} position={position} width={744} onClose={() => onClose(false)}>
      <PopoverHeader>File manager</PopoverHeader>
      <PopoverBody>
        <div className="scrollbar-light">
          <div className="editor__filesmanager-tabs">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabWidth={tabWidth}
              styles={backgroundStyles}
              isNewChange={isUploadedNewImage ? 0 : false}
            />
          </div>
          <Swipe active={activeTab.tab}>
            <SwipeItem swipeKey={0} key="tab_uploaded">
              <Uploaded onImageSelection={onImageSelection} onChangeTab={(value) => setActiveTab(value)} />
            </SwipeItem>
            <SwipeItem swipeKey={1} key="tab_pixabay">
              <Pixabay />
            </SwipeItem>
          </Swipe>
        </div>
      </PopoverBody>
    </Popover>
  );
};

Filesmanager.propTypes = {
  onClose: PropTypes.func,
  onImageSelection: PropTypes.func,
};

export default Filesmanager;
