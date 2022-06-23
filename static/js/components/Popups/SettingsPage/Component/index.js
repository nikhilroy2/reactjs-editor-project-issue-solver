import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import {
  FormGroup,
  FormVertical,
  FormHorizontal,
} from '../../../../layouts/Form';
import { ReactComponent as Delete } from '../../../../assets/img/delete-copy2.svg';
import Input from '../../../Elements/Input';
import TagsInput from '../../../Elements/TagsInput';
import TextArea from '../../../Elements/TextArea';
import Button from '../../../Elements/Button';
import Switch from '../../../Elements/Switch';

const SettingBody = ({
  spanRef,
  inputNode,
  pageType,
  onChangeFormatUrl,
  onSubmitPage,
  values,
  setValues,
  inputPadding,
  toggleCollapse,
  isOpen,
  isEdit,
  canDelete,
  canEditUrl,
  canEditVisibility,
  canEditName,
  confirmDelete,
  setConfirmDelete,
  onDeletePage,
  languagesMode,
}) => (
  <>
    <FormGroup>
      <FormHorizontal label="Visibility">
        <Switch
          value={values.visibility}
          onChange={(value) => setValues({ ...values, visibility: value })}
          disabled={!canEditVisibility}
        />
      </FormHorizontal>
    </FormGroup>
    <FormGroup>
      <FormVertical label="Page name">
        <Input
          newRef={inputNode}
          height={36}
          value={values.name}
          disabled={!canEditName}
          onChange={(e) => onChangeFormatUrl(e.target.value)}
        />
      </FormVertical>
    </FormGroup>
    <FormGroup>
      <FormVertical label="URL">
        <span
          className="input-span-link"
          ref={spanRef}
        >
          {`${window.location.origin}${languagesMode ? `/${languagesMode}` : ''}/${pageType === 'blog' ? 'blog/' : ''}`}
        </span>
        <Input
          height={36}
          value={values.url === '/' ? '' : values.url}
          onChange={(e) => setValues({
            ...values,
            url: e.target.value
              .toLowerCase()
              .trim()
              .replace(/\s|_+/g, ''),
          })}
          placeholder={values?.url_placeholder}
          disabled={!canEditUrl}
          paddingLeft={Number(inputPadding) + 12}
        />
      </FormVertical>
    </FormGroup>
    {pageType === 'public' || pageType === 'blog' ? (
      <>
        <FormGroup className="editor__form-group-correct">
          <FormHorizontal label="Search engine listing preview">
            <button onClick={() => toggleCollapse()} className="edit-seo__btn">
              Edit page SEO
            </button>
          </FormHorizontal>
        </FormGroup>
        <FormGroup>
          <div className="editor__form-row-horizontal-content-bordered">
            <div className="editor__form-row-horizontal-content-bordered_title">
              {values.seo_title ? (
                values.seo_title
              ) : (
                <span className="form-row-horizontal-content-bordered_title-default">
                  Page title…
                </span>
              )}
            </div>
            <div className="editor__form-row-horizontal-content-bordered_url">
              {`${window.location.origin}${languagesMode ? `/${languagesMode}` : ''}/${pageType === 'blog' ? 'blog/' : ''}${
                values.url && values.url !== '/' ? values.url : ''
              }`}
            </div>
            <div className="editor__form-row-horizontal-content-bordered_desc">
              {values.seo_description ? (
                values.seo_description
              ) : (
                <span className="form-row-horizontal-content-bordered_title-default-desc">
                  Meta-description…
                </span>
              )}
            </div>
            <Collapse
              isOpened={isOpen}
              theme={{
                collapse: 'editor__form-row_collapse',
                content: 'editor__form-row_collapse-content',
              }}
            >
              <FormGroup>
                <FormVertical label="Page title">
                  <Input
                    height={36}
                    value={values.seo_title}
                    onChange={(e) => setValues({ ...values, seo_title: e.target.value })}
                  />
                </FormVertical>
              </FormGroup>
              <FormGroup>
                <FormVertical label="Meta-description">
                  <TextArea
                    rows={4}
                    value={values.seo_description}
                    onChange={(e) => setValues({ ...values, seo_description: e.target.value })}
                  />
                </FormVertical>
              </FormGroup>
              <FormGroup>
                <FormVertical label="Meta-keywords">
                  <TagsInput
                    dataTags={values.seo_keywords}
                    setValues={setValues}
                    fieldName="seo_keywords"
                  />
                </FormVertical>
              </FormGroup>
            </Collapse>
          </div>
        </FormGroup>
      </>
    ) : null}
    {isEdit && canDelete ? (
      <FormGroup>
        <div className="form-group__actions-wrapper">
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="delete-page__btn"
            >
              <Delete />
              Delete page
            </button>
          ) : null}
          {confirmDelete ? (
            <div className="confirm-delete">
              <Delete />
              <div>Are you sure?</div>
              <button
                onClick={() => onDeletePage()}
                className="delete-page__btn delete-page__btn-yes"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="delete-page__btn delete-page__btn-no"
              >
                No
              </button>
            </div>
          ) : null}
          {!confirmDelete ? (
            <Button onClick={onSubmitPage}>Save changes</Button>
          ) : null}
        </div>
      </FormGroup>
    ) : (
      <FormGroup>
        <div className="form-group__actions-wrapper form-group__actions-wrapper-right">
          <Button onClick={onSubmitPage}>
            {isEdit ? 'Save changes' : 'Create page'}
          </Button>
        </div>
      </FormGroup>
    )}
  </>
);

SettingBody.propTypes = {
  inputNode: PropTypes.object,
  spanRef: PropTypes.object,
  values: PropTypes.object,
  setValues: PropTypes.func,
  isEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  canEditUrl: PropTypes.bool,
  canEditName: PropTypes.bool,
  canEditVisibility: PropTypes.bool,
  onChangeFormatUrl: PropTypes.func,
  onSubmitPage: PropTypes.func,
  inputPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  toggleCollapse: PropTypes.func,
  isOpen: PropTypes.bool,
  confirmDelete: PropTypes.bool,
  pageType: PropTypes.string,
  setConfirmDelete: PropTypes.func,
  onDeletePage: PropTypes.func,
  languagesMode: PropTypes.string,
};

export default SettingBody;
