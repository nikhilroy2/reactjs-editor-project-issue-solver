import React, { useState, useRef } from 'react';
import './_empty-state-blog-posts.scss';
import { ReactComponent as BLOG_POST_EMPTY } from '../../../../assets/img/blog-posts-empty.svg';
import Button from '../../../Elements/Button';
import SettingsPage from '../../../Popups/SettingsPage';

const EmptyStateBlogPosts = () => {
  const buttonNode = useRef(null);
  const inputNode = useRef(null);
  const [isOpenSettingsPage, setOpenSettingsPage] = useState(false);
  const [values, setValues] = useState({
    is_public: 1,
    name: '',
    seo_description: '',
    seo_keywords: '',
    seo_title: '',
    url: '',
    visibility: true,
    redirect: true,
  })

  return (
    <div className="editor-empty-state__blog-posts">
      <div className="editor-empty-state__blog-posts-wrap">
        <div className="editor-empty-state__blog-posts-preview">
          <BLOG_POST_EMPTY />
        </div>
        <div className="editor-empty-state__blog-posts-title">
          You don't have any blog posts.
        </div>
        <div className="editor-empty-state__blog-posts-description">
          Create new post right now or by yourselft from the "Pages" panel on the left.
        </div>
        <div className="editor-empty-state__blog-posts-actions">
          <span ref={buttonNode}>
            <Button
              size="md"
              style={{
                textTransform: 'inherit',
              }}
              onClick={() => setOpenSettingsPage(true)}
            >
              Create post
            </Button>
          </span>
          {isOpenSettingsPage
            ? (
              <SettingsPage
                rootNode={buttonNode}
                pageType="blog"
                onClose={() => setOpenSettingsPage(false)}
                isEdit={false}
                activePageId={0}
                values={values}
                setValues={(value) => setValues(value)}
                canEditName
                canDelete={false}
                canEditVisibility
                canEditUrl
                inputNode={inputNode}
                errorResponseText={null}
                error={false}
              />
            )
            : null}
        </div>
      </div>
    </div>
  )
}

export default EmptyStateBlogPosts;
