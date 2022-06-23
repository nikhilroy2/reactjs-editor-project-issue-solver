/* eslint-disable */
import React, { forwardRef, Fragment, useState } from 'react';
import SlickSlider from './Slider';
import Transform from '../Transform';
import Popup from './Popup';
import ResizeBox from './ResizeBox';
import { useDispatch } from 'react-redux';
import { depsRequest } from '../../../redux/actions/data/deps';

const WrapperNode = forwardRef((props, ref) => {
  const { domElement, children, attrs, dataID } = props;
  const [isPopup, setPopup] = useState(false);
  const dispatch = useDispatch();

  const onClick = (e) => {
    if (domElement.popup) {
      setPopup(domElement.popup);
    }
    if (domElement.onClick) {
      e.preventDefault();
      if (domElement.onClick.request) {
        dispatch(depsRequest(domElement.onClick.request, dataID))
      }
    }
  };

  if (domElement) {
    if (domElement.tagName) {
      const tagName = domElement.tagName.toLowerCase();

      const popup = domElement.popup ? domElement.popup : false;
      const click = domElement.onClick ? domElement.onClick : false;

      switch (tagName) {
        case 'a':
          if (domElement && domElement.text && domElement.text.editor) {
            return (
              <span ref={ref} onClick={popup ? onClick : null} {...attrs}>
                {children}
                {isPopup ? (
                  <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                ) : null}
              </span>
            );
          }
          return (
            <a ref={ref}
               onClick={popup || click ? onClick : (e) => e.preventDefault()} href='#' {...attrs}
            >
              {children}
              {isPopup ? <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} /> : null}
            </a>
          );
        case 'svg':
          if (domElement.innerHTML) {
            return <svg {...attrs} dangerouslySetInnerHTML={{ __html: domElement.innerHTML }} />;
          }
          return null;
        case 'fragment':
          return (
            <Fragment>
              {children}
              {isPopup ? <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} /> : null}
            </Fragment>
          );
        default:
          if (domElement.slider) {
            return (
              <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
                <SlickSlider domElement={domElement} dataID={dataID}>
                  {children}
                </SlickSlider>
                {isPopup ? (
                  <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                ) : null}
              </domElement.tagName>
            );
          }

          if (domElement.transform) {
            return (
              <Transform domElement={domElement} dataID={dataID} attrs={attrs} click={popup ? onClick : null}>
                <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
                  {children}
                  {isPopup ? (
                    <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                  ) : null}
                </domElement.tagName>
              </Transform>
            );
          }

          if (domElement.resizeBox) {
            return (
              <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
                <ResizeBox dataID={dataID} domElement={domElement} node={ref}>
                  {children}
                  {isPopup ? (
                    <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                  ) : null}
                </ResizeBox>
              </domElement.tagName>
            );
          }

          if (domElement.popup && domElement.popup.forFeatures) {
            return (
              <div className='editor__action-element-hover-features' onClick={popup ? onClick : null}>
                <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
                  {children}
                  {isPopup ? (
                    <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                  ) : null}
                </domElement.tagName>
              </div>
            );
          }

          if (domElement.popup && domElement.attrs.className[0] !== "reviews-slider__slide-avatar") {
            return (
              <div className='editor__action-element-hover-only-img' onClick={popup ? onClick : null}>
                <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
                  {children}
                  {isPopup ? (
                    <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                  ) : null}
                </domElement.tagName>
              </div>
            );
          }

          return (
            <domElement.tagName ref={ref} onClick={popup ? onClick : null} {...attrs}>
              {children}
              {isPopup ? <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} /> : null}
            </domElement.tagName>
          );
      }
    }
    return null;
  }
  return children;
});

export default WrapperNode;
