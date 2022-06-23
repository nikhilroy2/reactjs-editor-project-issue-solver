import '../scss/_page.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../../../../Elements/Tooltip';
import { EDITOR_URL } from '../../../../../config';

import { ReactComponent as HomeIcon } from '../../../../../assets/img/home-page.svg';
import { ReactComponent as Settings } from '../../../../../assets/img/settings2.svg';

import { getUrlId, slicePageName } from './helper';
import { switchPageMode } from '../../../../../redux/actions/Pages';

const PageField = ({
  name,
  seo_description,
  seo_keywords,
  seo_title,
  url,
  url_placeholder,
  visibility,
  canDelete,
  can_edit_name,
  can_edit_visibility,
  can_edit_url,
  home,
  id,
  setOpenPageSettings,
  activeIdPage,
  setPageValues,
  ...props
}) => {
  const dispatch = useDispatch();
  const urlId = getUrlId(window.location.pathname);
  const pageType = props.blog ? 'blog' : (props.public ? 'public' : 'internal');
  const canEditUrl = can_edit_url;
  const canEditName = can_edit_name;
  const canEditVisibility = !!can_edit_visibility;

  if (name || id) {
    return (
      <div className={classNames('editor__sidebar-pages_item-wrap', { active: id === urlId })}>
        <Link
          to={`${EDITOR_URL}/${id}`}
          className={classNames('editor__sidebar-pages_item', {
            disable: !visibility && id !== urlId,
          })}
        >
          <div className="editor__sidebar-pages_text">
            {!name ? PageField.defaultProps.name : slicePageName(home, name)}
          </div>
          {home ? (
            <Tooltip text="Home page">
              <HomeIcon className="editor__sidebar-pages_svg" />
            </Tooltip>
          ) : null}
        </Link>

        <div
          onClick={() => {
            dispatch(switchPageMode({ isEdit: true, activeIdPage: id }));
            setPageValues({
              seo_description, seo_keywords, seo_title, url, name, visibility, url_placeholder,
            });
            setOpenPageSettings((prev) => ({
              ...prev,
              open: true,
              canDelete,
              canEditUrl,
              canEditName,
              canEditVisibility,
              pageType,
            }));
          }}
          className={classNames('editor__sidebar_edit-btn', {
            'editor__sidebar_edit-btn-home': home,
            active: activeIdPage === id,
          })}
        >
          <Tooltip text="Edit page settings">
            <Settings />
          </Tooltip>
        </div>
      </div>
    );
  }
  return (
    <div className="editor__sidebar-pages_item-wrap">
      <div className="editor__sidebar-pages_item">
        <div className="editor__sidebar-pages_text editor__sidebar-pages_text-grey">
          New page
        </div>
      </div>
      <div className="editor__sidebar_edit-btn active">
        <Tooltip text="Edit page settings">
          <Settings />
        </Tooltip>
      </div>
    </div>
  );
};

PageField.defaultProps = {
  name: ' ',
  defaultPage: 0,
  active: 0,
  url_placeholder: '',
};

PageField.propTypes = {
  defaultPage: PropTypes.number,
  active: PropTypes.number,
  setOpenPageSettings: PropTypes.func,
  canDelete: PropTypes.bool,
  can_edit_visibility: PropTypes.bool,
  can_edit_url: PropTypes.bool,
  can_edit_name: PropTypes.bool,
  activeIdPage: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
  name: PropTypes.string,
  seo_description: PropTypes.string,
  seo_keywords: PropTypes.string,
  seo_title: PropTypes.string,
  public: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  blog: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  url: PropTypes.string,
  url_placeholder: PropTypes.string,
  visibility: PropTypes.bool,
  can_delete: PropTypes.bool,
  home: PropTypes.bool,
  id: PropTypes.number,
  setPageValues: PropTypes.func,
};

export default PageField;
