import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishButton from './Button';
import { publishPages } from '../../../redux/actions/Publish';

const Publish = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector((state) => state.publish);

  const onClick = () => {
    if (success || error) {
      return false;
    }
    return dispatch(publishPages());
  };

  return (
    <div>
      <PublishButton state={{ loading: isLoading, success, error }} onClick={onClick} />
    </div>
  );
};

Publish.propTypes = {};

export default Publish;
