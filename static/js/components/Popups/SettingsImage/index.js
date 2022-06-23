import React, { useEffect, useState, useRef } from 'react';
import './_settings_image.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useDebounce } from 'use-debounce';
import classNames from 'classnames';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { FormGroup, FormVertical, FormHorizontal } from '../../../layouts/Form';
import getPosition from '../../../utils/getPosition';
import Input from '../../Elements/Input';
import PreviewImage from '../../Elements/PreviewImage';
import Methods from '../../../utils/Methods/index';
import {
  getSourceValue, getParentKey, getObjectSource, getNewData,
} from '../../../utils/SourceValue';
import { dataChangeValues } from '../../../redux/actions/data/update';
import { depsChangeValues } from '../../../redux/actions/data/deps';
import NoImage from '../../../assets/img/img-placeholder-1.png';
import SettingsLink from '../SettingsLink';
import { ReactComponent as LINK } from '../../../assets/img/wysiwyg/link.svg';

const SettingsImage = ({
  rootNode, dataID, settingImage, onClose,
}) => {
  const node = useRef(null);
  const linkRootNode = useRef(null);
  const linkNode = useRef(null);
  const dispatch = useDispatch();

  const [isOpenLink, setOpenLink] = useState(false);

  const isFilesManager = settingImage.filesManager ? getSourceValue(settingImage.filesManager.source, dataID) : false;
  const isSeoTitle = settingImage.seo && settingImage.seo.title ? getSourceValue(settingImage.seo.title.source, dataID) : false;
  const isSeoAlt = settingImage.seo && settingImage.seo.alt ? getSourceValue(settingImage.seo.alt.source, dataID) : false;
  const isLink = settingImage.link ? getSourceValue(settingImage.link.source, dataID) : false;

  const onChange = (source, value, request = false) => {
    const keys = getParentKey(source);
    const typeData = source.typeData || 'data';
    const newData = getNewData(source, dataID);
    if (keys.currentPath === 'default' || keys.currentPath === false) {
      if (typeData === 'data') {
        dispatch(dataChangeValues(value, keys.parentKey, dataID));
      }
      if (typeData === 'deps') {
        dispatch(depsChangeValues(value, keys.parentKey, dataID, request));
      }
    } else {
      const changeData = getObjectSource(newData, keys.currentPath);
      changeData[keys.currentKey] = value;
      if (typeData === 'data') {
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
      if (typeData === 'deps') {
        dispatch(depsChangeValues(newData[keys.parentKey], keys.parentKey, dataID, request));
      }
    }
  };

  const [alt, setAlt] = useState(isSeoAlt && isSeoAlt !== 'not found' ? isSeoAlt : '');
  const [debounceAlt] = useDebounce(alt, 350);
  useEffect(() => {
    if (isSeoAlt !== false && isSeoAlt !== debounceAlt) {
      onChange(settingImage.seo.alt.source, debounceAlt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceAlt]);

  const [title, setTitle] = useState(isSeoTitle && isSeoTitle !== 'not found' ? isSeoTitle : '');
  const [debounceTitle] = useDebounce(title, 350);
  useEffect(() => {
    if (isSeoTitle !== false && isSeoTitle !== debounceTitle) {
      onChange(settingImage.seo.title.source, debounceTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceTitle]);

  const target = usePortal();
  const [position, setPosition] = useState(false);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (isOpenLink) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    const position = getPosition(rootNode, node, {
      direction: 'center bottom',
      margin: 15,
    });
    setPosition(position);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenLink]);

  const onChangeImage = (image) => {
    if (image.id) {
      const imageID = parseInt(image.id, 10);
      const newData = {
        id: imageID,
        type: 'filesmanager',
      };
      if (settingImage.hasOwnProperty('request')) {
        settingImage.request.customData = {
          id: imageID,
        }
      }
      onChange(settingImage.filesManager.source, newData, settingImage.request);
    }
  };

  const image = (() => {
    if (isFilesManager && isFilesManager.hasOwnProperty('id')) {
      const file = Methods.getFile(isFilesManager.id);
      if (file) {
        return {
          url: file.url,
        }
      }
      return {
        url: NoImage,
      }
    }
    if (_.isNull(isFilesManager)) {
      return {
        url: NoImage,
      }
    }
    if (_.isString(isFilesManager)) {
      return {
        url: isFilesManager,
      }
    }
    return false;
  })();

  const onChangeLink = (value) => {
    if (value && settingImage.link.source) {
      const newData = getNewData(settingImage.link.source, dataID);
      const keys = getParentKey(settingImage.link.source);
      const newObj = {
        ...isLink,
        ...value,
      }
      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(newObj, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = newObj;
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  const onOpenLinkPopup = () => {
    setOpenLink(true)
  }

  const onCloseLinkPopup = () => {
    setOpenLink(false)
  };

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>Image</PopoverHeader>
      <PopoverBody>
        {isFilesManager || _.isNull(isFilesManager) ? (
          <FormGroup>
            <FormVertical>
              <PreviewImage value={image ? image.url : null} onChange={(value) => onChangeImage(value)} />
            </FormVertical>
          </FormGroup>
        ) : null}
        {isSeoTitle !== false ? (
          <FormGroup>
            <FormVertical label="Title" explanation="Additional information about the image">
              <Input
                height={36}
                value={title}
                placeholder="Image title here…"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormVertical>
          </FormGroup>
        ) : null}
        {isSeoAlt !== false ? (
          <FormGroup>
            <FormVertical label="Alt" explanation="Describes the contents of an image for search engines.">
              <Input height={36} value={alt} placeholder="Image alt here…" onChange={(e) => setAlt(e.target.value)} />
            </FormVertical>
          </FormGroup>
        ) : null}
        {isLink
          ? (
            <FormGroup>
              <FormHorizontal label="Image link">
                {isOpenLink
                  ? (
                    <SettingsLink
                      onChange={onChangeLink}
                      dataID={dataID}
                      rootNode={linkRootNode}
                      refNode={linkNode}
                      value={isLink}
                      onClose={onCloseLinkPopup}
                    />
                  ) : null }
                <LINK
                  className={classNames('editor-settings-image__link', {
                    'editor-settings-image__link-active': !!isLink.value,
                  })}
                  ref={linkRootNode}
                  onClick={onOpenLinkPopup}
                />
              </FormHorizontal>
            </FormGroup>
          ) : null }
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default SettingsImage;
