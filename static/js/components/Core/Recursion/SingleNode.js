/* eslint-disable */
import React, { forwardRef, Fragment, useState } from 'react';
import Transform from '../Transform';
import Popup from './Popup';

const SingleNode = forwardRef((props, ref) => {
  const { domElement, attrs, children, dataID } = props;
  const [isPopup, setPopup] = useState(false);

  const onClick = () => {
    if (domElement.popup) {
      setPopup(domElement.popup);
    }
  };

  if (domElement) {
    if (domElement.tagName) {
      const tagName = domElement.tagName.toLowerCase();
      const popup = domElement.popup ? domElement.popup : false;

      switch (tagName) {
        case 'fragment':
          if (domElement.transform) {
            return (
              <Transform domElement={domElement} dataID={dataID} click={popup ? onClick : null}>
                <domElement.tagName {...attrs} ref={ref} />
              </Transform>
            );
          }
          return (
            <Fragment>
              <domElement.tagName {...attrs} ref={ref} />
            </Fragment>
          );
        case 'br':
        case 'col':
        case 'link':
        case 'param':
        case 'source':
        case 'track':
        case 'wbr':
        case 'input':
        case 'hr':
        case 'textarea':
          if (domElement.transform) {
            return (
              <Transform domElement={domElement} dataID={dataID} click={popup ? onClick : null}>
                <domElement.tagName {...attrs} ref={ref} />
              </Transform>
            );
          }
          return <domElement.tagName {...attrs} ref={ref} />;
        case 'a':
          return (
            <Transform domElement={domElement} dataID={dataID} click={popup ? onClick : null}>
              {domElement.text && domElement.text.editor ? (
                <span {...attrs} ref={ref} />
              ) : (
                <a href='#' {...attrs} ref={ref} />
              )}
            </Transform>
          );
        case 'area':
          if (domElement.transform) {
            return (
              <Transform domElement={domElement} dataID={dataID} click={popup ? onClick : null}>
                <area {...attrs} ref={ref} alt={''} />;
              </Transform>
            );
          }
          return <area {...attrs} ref={ref} alt={''} />;
        case 'svg':
          if (domElement.innerHTML) {
            return <svg {...attrs} dangerouslySetInnerHTML={{ __html: domElement.innerHTML }} />;
          }
          return null;
        case 'img':
          if (domElement.transform) {
            return (
              <Transform domElement={domElement} dataID={dataID} click={popup ? onClick : null}>
                <img {...attrs} ref={ref} onClick={popup ? onClick : null} alt='Image' />
                {isPopup ? (
                  <Popup popup={popup} rootNode={ref} dataID={dataID} onClose={() => setPopup(false)} />
                ) : null}
              </Transform>
            );
          }
          return <img {...attrs} ref={ref} alt='Image' />;
      }
    }
    return null;
  }
  return children;
});

export default SingleNode;
