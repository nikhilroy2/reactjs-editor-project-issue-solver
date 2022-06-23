import React from 'react';
import './_preloader.scss';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ReactComponent as PreloaderIcon } from '../../assets/img/main_loader.svg';
import { ReactComponent as Lang } from '../../assets/img/languages.svg';

/**
 * Основной прелоадер
 *
 * @component
 * @category Components
 * @subcategory Preloader
 *
 */
const Preloader = () => {
  const preLoader = useSelector((state) => state.preloader);
  const configuration = useSelector((state) => state.configuration);
  const { mode } = useSelector((state) => state.languages);
  const { progress } = preLoader;
  const { isLoading } = configuration;

  return (
    <CSSTransition
      in
      appear
      unmountOnExit
      timeout={500}
      classNames="alert"
    >
      <div className="editor-preloader">
        <div className={classNames('main-loader', {
          'main-loader-cog': !mode,
        })}
        >
          {mode ? <Lang /> : <PreloaderIcon />}
          <span className="main-loader-header animated fadeIn faster">{isLoading ? 'Loading' : 'Getting configuration'}</span>
          <span className="main-loader-description animated fadeIn faster">
            {mode ? 'We translate pages' : 'Please wait a little.'}
          </span>
          <div className="editor-preloader-loading-line animated fadeIn faster">
            <div className="editor-preloader-loading-line-progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
};

Preloader.propTypes = {

};

Preloader.defaultProps = {

};

export default Preloader;
