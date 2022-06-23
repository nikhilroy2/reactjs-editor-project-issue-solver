import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../../utils/Traverse';
import _ from 'lodash';
import Methods from '../../../utils/Methods/index';
import RichTextInline from '../RichTextInline';
import Video from '../Video';
import ResizeBox from '../Resize';
import BlockSides from '../BlockSides';
import Dropdown from '../Dropdown';
import If from './if';
import WrapperNode from './WrapperNode';
import SingleNode from './SingleNode';
import Counter from './Counter';
import Actions from '../Actions';
import { getOnlyText } from '../RichTextInline/helper';
import For from './For';

const ConnectedRecursive = ({
  domElement, blockID, dataID, position, uniqueKey, ...props
}) => {
  const attrs = Methods.getAttrs(domElement, dataID, blockID);
  const node = useRef(false);

  if (domElement.visibility) {
    const findData = Methods.findData(dataID);
    if (!findData.values[domElement.visibility]) {
      return null;
    }
  }

  if (domElement.if) {
    return (
      <If
        values={props.values}
        uniqueKey={`${uniqueKey}`}
        position={position}
        domElement={domElement}
        dataID={dataID}
        blockID={blockID}
        {...props}
      />
    );
  }

  if (domElement.pagination) {
    const data = Methods.paginationDomElements(domElement, dataID);
    return (
      <WrapperNode attrs={attrs} dataID={dataID} domElement={domElement} ref={node}>
        {domElement.actions ? <Actions domElement={domElement} node={node} dataID={dataID} blockID={blockID} /> : null}
        {domElement.resize ? <ResizeBox domElement={domElement} dataID={dataID} /> : null}
        {data && data.length ? data.map((item, index) => (
          <Fragment key={index}>
            <ConnectedRecursive
              values={props.values}
              position={position}
              domElement={item}
              dataID={dataID}
              uniqueKey={`${uniqueKey}.${index}[${data.length}]`}
              blockID={blockID}
              {...props}
            />
          </Fragment>
        )) : null}
      </WrapperNode>
    )
  }

  if (domElement.for) {
    const data = Methods.forDomElements(domElement, dataID);
    if (data && data.length) {
      const toRender = (
        <WrapperNode attrs={attrs} domElement={domElement} dataID={dataID} ref={node}>
          {domElement.actions ? (
            <Actions domElement={domElement} node={node} dataID={dataID} blockID={blockID} />
          ) : null}
          {data.map((item, index) => (
            <Fragment key={index}>
              <ConnectedRecursive
                values={props.values}
                position={position}
                domElement={item}
                dataID={dataID}
                uniqueKey={`${uniqueKey}.${index}[${data.length}]`}
                blockID={blockID}
                {...props}
              />
            </Fragment>
          ))}
        </WrapperNode>
      );

      if (domElement.dropdown_menu) {
        return (
          <Dropdown uniqueKey={uniqueKey} attrs={attrs}>
            {toRender}
          </Dropdown>
        );
      }
      return toRender;
    }
    return (
      <WrapperNode attrs={attrs} domElement={domElement} dataID={dataID} ref={node}>
        {domElement.actions ? (
          <Actions domElement={domElement} node={node} dataID={dataID} blockID={blockID} />
        ) : null}
        <For
          data={data}
          domElement={domElement}
          dataID={dataID}
          blockID={blockID}
        />
      </WrapperNode>
    );
  }

  if (domElement.children) {
    return (
      <WrapperNode attrs={attrs} dataID={dataID} domElement={domElement} ref={node}>
        {domElement.actions ? <Actions domElement={domElement} node={node} dataID={dataID} blockID={blockID} /> : null}
        {domElement.resize ? <ResizeBox domElement={domElement} dataID={dataID} /> : null}
        {domElement.sides ? <BlockSides sides={domElement.sides} dataID={dataID} blockID={blockID} /> : null}
        {domElement.text ? (
          <RichTextInline domElement={domElement} blockID={blockID} dataID={dataID} key={uniqueKey} parentNode={node} />
        ) : null}
        {domElement.video ? <Video domElement={domElement} dataID={dataID} /> : null}
        {domElement.children.map((item, index) => (
          <Fragment key={index}>
            <ConnectedRecursive
              values={props.values}
              uniqueKey={`${uniqueKey}`}
              position={position}
              domElement={item}
              dataID={dataID}
              blockID={blockID}
              deps={props.deps}
            />
          </Fragment>
        ))}
      </WrapperNode>
    );
  }
  switch (domElement.tagName) {
    case 'area':
    case 'br':
    case 'col':
    case 'link':
    case 'param':
    case 'source':
    case 'track':
    case 'wbr':
    case 'input':
    case 'hr':
    case 'img':
    case 'textarea':
      return <SingleNode domElement={domElement} attrs={attrs} ref={node} dataID={dataID} />;
    case 'option':
      const textOption = getOnlyText(domElement.text, dataID);
      return (
        <WrapperNode attrs={attrs} dataID={dataID} domElement={domElement} ref={node}>
          {textOption}
        </WrapperNode>
      );
    default:
      return (
        <WrapperNode attrs={attrs} dataID={dataID} domElement={domElement} ref={node}>
          {domElement.actions ? (
            <Actions domElement={domElement} node={node} dataID={dataID} blockID={blockID} />
          ) : null}
          {domElement.resize ? <ResizeBox domElement={domElement} dataID={dataID} /> : null}
          {domElement.text ? (
            <RichTextInline
              domElement={domElement}
              blockID={blockID}
              dataID={dataID}
              key={uniqueKey}
              parentNode={node}
            />
          ) : null}
          {domElement.video ? <Video domElement={domElement} dataID={dataID} /> : null}
          {domElement.counter ? <Counter counter={domElement.counter} dataID={dataID} /> : null}
        </WrapperNode>
      );
  }
};

ConnectedRecursive.propTypes = {
  domElement: PropTypes.object,
  blockID: PropTypes.number,
  dataID: PropTypes.number,
  position: PropTypes.number,
  uniqueKey: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  deps: PropTypes.object,
};

const arePropsEqual = (prevProps, nextProps) => {
  if (Number(prevProps.position) !== Number(nextProps.position)) {
    return false;
  }
  if (Number(prevProps.dataID) !== Number(nextProps.dataID)) {
    return false;
  }

  return _.isEqual(prevProps.values, nextProps.values) && _.isEqual(prevProps.deps, nextProps.deps);
};

export default React.memo(ConnectedRecursive, arePropsEqual);
