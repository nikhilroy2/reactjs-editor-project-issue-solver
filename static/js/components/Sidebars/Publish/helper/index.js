import React from 'react';
import { ReactComponent as DefaultIcon } from '../../../../assets/img/upload-copy.svg';
import { ReactComponent as SuccessIcon } from '../../../../assets/img/upload-success.svg';
import { ReactComponent as FailedIcon } from '../../../../assets/img/failed-def.svg';
import Spinner from '../../../../layouts/Loaders/Spinner';

export const getIcon = (state) => {
  const { success, loading, error } = state;
  const defaultType = !success && !error && !loading;

  return [
    {
      type: success,
      component: <SuccessIcon className="animated fadeIn" key="publish-success" />,
    },
    {
      type: error,
      component: <FailedIcon className="animated fadeIn" key="publish-error" />,
    },
    {
      type: loading,
      component: <Spinner key="publish-loading" />,
    },
    {
      type: defaultType,
      component: <DefaultIcon key="publish-default" />,
    },
  ]
}
