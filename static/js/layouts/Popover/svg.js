import React from 'react';
import PropTypes from 'prop-types';

export const CloseButton = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M17.613 6.387a1.323 1.323 0 0 1 0 1.871L13.87 12l3.742 3.742a1.323 1.323 0 0 1-1.871 1.87L12 13.872l-3.742 3.742a1.323 1.323 0 0 1-1.87-1.871L10.128 12 6.387 8.258a1.323 1.323 0 1 1 1.871-1.87L12 10.128l3.742-3.742a1.323 1.323 0 0 1 1.87 0z" />
  </svg>
)

CloseButton.propTypes = {
  className: PropTypes.string,
};
