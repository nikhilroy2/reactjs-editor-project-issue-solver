import React from 'react';
import PropTypes from 'prop-types';
import './_list-component.scss';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { ModalHeader, ModalBody } from '../../../../layouts/Modal';
import Render from '../Component/Render';
import { componentsDataSetToDefault } from '../../../../redux/actions/Components';
import Spinner from '../../../../layouts/Loaders/Spinner';
import { Animate, AnimateHiddenDiv } from '../../../../layouts/Animate';
import { ReactComponent as IconResetToDefault } from '../../../../assets/img/actions/set_default.svg';

const ListStyleComponents = ({ firstClick, onOpenComponent, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.components.data);

  const openComponent = (title, key) => {
    const component = {
      title,
      key,
    };
    onOpenComponent(component);
  };

  const setDefaultComponent = (e, code) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(componentsDataSetToDefault(code));
  };

  return (
    <>
      <ModalHeader onClose={onClose}>
        <Animate animate={firstClick ? 'animated slideInLeft faster-3' : ''}>Style components</Animate>
      </ModalHeader>
      <ModalBody>
        <AnimateHiddenDiv>
          <Animate animate={firstClick ? 'animated slideInRight faster-3' : ''}>
            <div className="scrollbar-light">
              <div className="editor__components">
                {Object.keys(data).map((key) => {
                  const item = data[key];

                  if (item.visibility) {
                    return (
                      <div
                        className={classNames('editor__components-row', {
                          'editor__components-row-loading': item.isFetching,
                        })}
                        onClick={!item.isFetching ? () => openComponent(item.title, key) : null}
                        key={key}
                      >
                        {item.isFetching ? <div className="editor__components-loader" /> : null}
                        <div className="editor__components-header">
                          <div className="editor__components-title">{item.title}</div>
                          <div
                            className="editor__components-reset"
                            onClick={!item.isFetching ? (e) => setDefaultComponent(e, key) : null}
                          >
                            {item.isFetching ? (
                              <Spinner theme="dark" />
                            ) : (
                              <div className="editor__components-reset-button">
                                <IconResetToDefault className="editor__components-reset-icon" />
                                {' '}
                                Reset to
                                default
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="editor__components-body body">
                          {item.template && item.template.preview ? (
                            <Render
                              domElement={item.template.preview}
                              data={item.data}
                              onClick={(value) => console.log(value)}
                            />
                          ) : (
                            'Not preview'
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </Animate>
        </AnimateHiddenDiv>
      </ModalBody>
    </>
  );
};

ListStyleComponents.propTypes = {
  firstClick: PropTypes.bool,
  onOpenComponent: PropTypes.func,
  onClose: PropTypes.func,
};

export default ListStyleComponents;
