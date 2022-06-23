import React, { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './_render.scss';

import { Methods } from './Methods';
import WrapperNode from './WrapperNode';

const Render = ({
  domElement, activeItem, data, ...props
}) => {
  const node = useRef(false);

  const configuration = useSelector((state) => state.configuration);

  const attrs = Methods.getAttrs(domElement, data);
  const text = Methods.getSourceValue(domElement);

  const onClick = () => {
    if (domElement.actions) {
      props.onClick(domElement.actions);
    }
  };

  if (domElement.show) {
    if (domElement.show.type === 'config') {
      if (configuration[domElement.show.value]) {
        return null;
      }
    }
  }

  if (domElement.children) {
    return (
      <WrapperNode domElement={domElement} activeItem={activeItem} onClick={onClick}>
        {domElement.tagName === 'fragment'
          ? (
            <>
              {domElement.children.map((item, index) => (
                <Fragment key={index}>
                  <Render data={data} domElement={item} activeItem={activeItem} {...props} />
                </Fragment>
              ))}
              {text}
            </>
          )
          : (
            <domElement.tagName ref={node} {...attrs} onClick={(e) => onClick(e)}>
              {domElement.children.map((item, index) => (
                <Fragment key={index}>
                  <Render data={data} domElement={item} activeItem={activeItem} {...props} />
                </Fragment>
              ))}
              {text}
            </domElement.tagName>
          )}
      </WrapperNode>
    );
  }
  switch (domElement.tagName) {
    case 'hr':
      return <domElement.tagName />;

    default:
      return (
        <WrapperNode domElement={domElement} activeItem={activeItem} onClick={onClick}>
          <domElement.tagName {...attrs} ref={node} onClick={(e) => onClick(e)}>
            {text}
          </domElement.tagName>
        </WrapperNode>
      );
  }
};

Render.propTypes = {
  domElement: PropTypes.object,
  activeItem: PropTypes.object,
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(Render);
