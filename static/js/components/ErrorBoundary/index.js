import './_errorBoundary.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Elements/Button';

import { IS_DEV } from '../../config';

/**
 * ErrorBoundary - в случае ошибок в рендере react, показываем этот компонент
 *
 * @component
 * @category Components
 * @subcategory Error
 *
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return !IS_DEV && { hasError: true };
  }

  componentDidCatch() {
    if (!IS_DEV) {
      this.setState({ hasError: true });
    }
  }

  onReload = () => {
    window.location.reload(true);
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__text">Oops! Something went wrong...</div>
          <div className="serror-boundary__reload-button">
            <Button onClick={() => this.onReload()}>Reload page</Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.element]),
}

export default ErrorBoundary;
