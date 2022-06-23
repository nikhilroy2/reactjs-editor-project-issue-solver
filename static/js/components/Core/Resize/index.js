import React from 'react';
import PropTypes from 'prop-types';
import './_resizebox.scss';
import MarginBottom from './Margin/Bottom';
import PaddingTop from './Padding/Top';

const ResizeBox = ({ domElement, dataID }) => {
  const { margin, padding } = domElement.resize;

  return (
    <>
      {margin ? (
        <>
          {margin.bottom && margin.bottom.source ? (
            <>
              <MarginBottom dataID={dataID} value={margin.bottom.source} />
            </>
          ) : null}
        </>
      ) : null}
      {padding ? (
        <>
          {padding.top && padding.top.source ? (
            <>
              <PaddingTop dataID={dataID} value={padding.top.source} />
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

ResizeBox.propTypes = {
  domElement: PropTypes.object,
  dataID: PropTypes.number,
};

export default ResizeBox;
