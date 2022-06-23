import './_menu-edit.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  PopoverBody, PopoverHeader, PopoverHeaderBack, PopoverFooter,
} from '../../../../layouts/Popover';
import { FormGroup, FormVertical } from '../../../../layouts/Form';
import Input from '../../../Elements/Input';
import RadioButton from '../../../Elements/RadioButton';
import Select from '../../../Elements/Select';
import IconsSelect from '../../../Elements/IconsSelect';
import { Animate, AnimateHiddenDiv } from '../../../../layouts/Animate';
import Button from '../../../Elements/Button';
import { ReactComponent as Delete } from '../../../../assets/img/delete-copy2.svg';
import Alert from '../../../Elements/Alert';

import { getPagesList, getActivePage } from './_helper';

const linkTypes = [
  {
    label: 'Page',
    value: 'internal',
  },
  {
    label: 'Web address',
    value: 'external',
  },
];

const EditMenu = ({
  onBack, onSaveChanges, list, onDelete, data, error,
}) => {
  const [pageList] = useState(getPagesList(list))
  const [dataForm, setDataForm] = useState(data)
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onChangeForm = (name, value) => {
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const onChangeUrlType = (type) => {
    setDataForm((prevState) => ({
      ...prevState,
      name: '',
      url: {
        ...prevState.url,
        value: '',
        type,
      },
    }))
  }

  const onChangeUrlValue = (url) => {
    setDataForm((prevState) => ({
      ...prevState,
      url: {
        ...prevState.url,
        value: url,
      },
    }))
  }

  const handleChangeSelect = (url) => {
    setDataForm((prevState) => ({
      ...prevState,
      name: url.label.toLowerCase() === 'page' || Number(url.value) === 0 ? '' : url.label,
      url: {
        ...prevState.url,
        value: url.value,
      },
    }))
  };

  const onChangeVisibility = (visibility) => {
    setDataForm((prevState) => ({
      ...prevState,
      icon_visibility: visibility,
    }))
  };

  const onChangeIcon = (icon) => {
    setDataForm((prevState) => ({
      ...prevState,
      icon,
    }))
  };

  return (
    <>
      <PopoverHeader>
        <PopoverHeaderBack onClick={onBack} />
        <Animate animate="animated slideInLeft faster-3">{dataForm.id ? 'Edit item link' : 'Add link'}</Animate>
      </PopoverHeader>
      <PopoverBody>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            <div>
              {error
                ? (
                  <FormGroup>
                    <Alert content={error} />
                  </FormGroup>
                )
                : null}
              <FormGroup>
                <IconsSelect
                  value={dataForm.icon}
                  onChange={onChangeIcon}
                  visibility={dataForm.icon_visibility}
                  onChangeVisibility={onChangeVisibility}
                />
              </FormGroup>
              <FormGroup>
                <FormVertical label="Name">
                  <Input value={dataForm.name} height={36} onChange={(e) => onChangeForm('name', e.target.value)} />
                </FormVertical>
              </FormGroup>
              <div className="editor-edit-menu__label">
                What do you want to link to?
              </div>
              <FormGroup>
                <FormVertical>
                  <RadioButton
                    value={dataForm.url.type}
                    options={linkTypes}
                    onChange={onChangeUrlType}
                  />
                </FormVertical>
              </FormGroup>
              {dataForm.url.type === 'external'
                ? (
                  <FormGroup>
                    <FormVertical>
                      <Input value={dataForm.url.value} height={36} onChange={(e) => onChangeUrlValue(e.target.value)} placeholder="Paste an URL here…" />
                    </FormVertical>
                  </FormGroup>
                )
                : (
                  <FormGroup>
                    <FormVertical />
                    <Select
                      handleChangeSelect={handleChangeSelect}
                      activeValue={getActivePage(dataForm.url.value, dataForm.name)}
                      options={pageList}
                    />
                  </FormGroup>
                )}
            </div>
          </Animate>
        </AnimateHiddenDiv>
      </PopoverBody>
      <PopoverFooter>
        <AnimateHiddenDiv className="w-100">
          <Animate animate="animated slideInRight faster-3">
            <div className="form-group__actions-wrapper editor-edit-menu__action-delete">
              {!confirmDelete && dataForm.can_delete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="delete-page__btn"
                >
                  <Delete />
                  Delete
                </button>
              ) : null}
              {confirmDelete ? (
                <div className="confirm-delete">
                  <Delete />
                  <div>Are you sure?</div>
                  <button
                    className="delete-page__btn delete-page__btn-yes"
                    onClick={() => onDelete(dataForm.id)}
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
                <Button size="sm" className="ml-auto" onClick={() => onSaveChanges(dataForm)}>{dataForm.id ? 'Save changes' : 'Add link'}</Button>
              ) : null}
            </div>
          </Animate>
        </AnimateHiddenDiv>
      </PopoverFooter>
    </>
  );
}

EditMenu.defaultProps = {

};

EditMenu.propTypes = {
  onBack: PropTypes.func,
  onSaveChanges: PropTypes.func,
  list: PropTypes.array,
  onDelete: PropTypes.func,
  data: PropTypes.object,
  error: PropTypes.any,
};

export default EditMenu;
