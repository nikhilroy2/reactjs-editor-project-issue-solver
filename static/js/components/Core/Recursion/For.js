import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { dataDepsCreateSuccess } from '../../../redux/actions/data/deps';
import CreateItem from './CreateItem';
import BlogPosts from '../EmptyStates/BlogPosts';
import Menu from '../EmptyStates/Menu';
import Sidebar from '../EmptyStates/Sidebar';
import { getQueryInstance } from '../../../services/helper';
import Spinner from '../../../layouts/Loaders/Spinner';
import Notification from '../../../utils/Notifications';

const For = ({
  data, domElement, dataID, blockID,
}) => {
  const dispatch = useDispatch();
  const { query, emptyState, create } = domElement.for;
  const [isQueryStatus, setQueryStatus] = useState(query ? 'loading' : 'completed');

  useEffect(() => {
    if (query && isQueryStatus === 'loading') {
      const instance = getQueryInstance(query);

      if (instance) {
        (async () => {
          try {
            setQueryStatus('loading');
            const response = await instance();
            dispatch(dataDepsCreateSuccess(dataID, response.data.data));
            setQueryStatus('completed');
          } catch (e) {
            const response = e.response;
            Notification.onError(response);
            setQueryStatus('failed');
            setTimeout(() => {
              setQueryStatus('loading');
            }, 5000)
          }
        })();
      }
    }
  }, [dataID, dispatch, isQueryStatus, query]);

  if (create && data && !data.length) {
    return (
      <CreateItem
        domElement={domElement}
        dataID={dataID}
        blockID={blockID}
      />
    );
  }

  if (isQueryStatus !== 'completed') {
    return (
      <div className={classNames('rounded p-1', {
        'bg-white': isQueryStatus === 'completed' || isQueryStatus === 'loading',
        'bg-warning': 'failed',
      })}
      >
        <Spinner theme={isQueryStatus === 'loading' ? 'dark' : 'white'} />
        {isQueryStatus === 'failed' ? <span className="ml-1 text-white" style={{ fontSize: 14 }}>Wait a little more...</span> : null }
      </div>
    )
  }

  if (emptyState) {
    switch (emptyState) {
      case 'blog_posts':
        return (
          <BlogPosts
            domElement={domElement}
            dataID={dataID}
          />
        );
      case 'navbar':
        return (
          <Menu
            domElement={domElement}
            dataID={dataID}
          />
        );
      case 'sidebar':
        return (
          <Sidebar
            domElement={domElement}
            dataID={dataID}
          />
        );
      default:
        return (
          <div>Not found Empty state</div>
        );
    }
  }

  return <div>Loading...</div>
};

For.propTypes = {
  data: PropTypes.object,
  domElement: PropTypes.object,
  dataID: PropTypes.number,
  blockID: PropTypes.number,
};

export default For;
