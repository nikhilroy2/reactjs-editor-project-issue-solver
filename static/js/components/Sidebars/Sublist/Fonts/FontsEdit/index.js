import React, { memo, useState, useMemo } from 'react';
import './_sidebar-fonts-edit.scss'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { SidebarHeader, SidebarDescription } from '../../../../../layouts/Sidebar';
import { FormGroup, FormHorizontal } from '../../../../../layouts/Form';
import Select from '../../../../Elements/Select';
import Color from '../../../../Elements/Color';
import RangeSlider from '../../../../Elements/RangeSlider';
import { ReactComponent as IconPrev } from '../../../../../assets/img/arrow-prev.svg';
import { ReactComponent as IconResetFont } from '../../../../../assets/img/reset-font.svg';
import { ReactComponent as IconSizeMinus } from '../../../../../assets/img/size-minus.svg';
import { ReactComponent as IconSizePlus } from '../../../../../assets/img/size-plus.svg';
import { getObjectSource, getParentKey } from '../../../../../utils/SourceValue';
import { componentsChangeData } from '../../../../../redux/actions/Components';
import {
  getFontActive,
  getFontSelectValue,
  getFontsOptions,
  getFontWeightOptions, getTypographyComponent,
} from '../helpers';
import Fonts from '../../../../Popups/Fontsmanager';
import { fontsChangeGroupOptions } from '../../../../../redux/actions/Fonts';
import {
  ConfirmModal,
  ConfirmModalActions,
  ConfirmModalDescription,
  ConfirmModalTitle,
} from '../../../../../layouts/ConfirmPopups';

const SidebarFontsEdit = ({ onResetFonts, onChangeShow }) => {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts);
  const { options, activeFonts, fontsData } = fonts;
  const [isOpenFontsManager, setOpenFontsManager] = useState(false);
  const [isReset, setReset] = useState(false);
  const components = useSelector((state) => state.components.data);
  const component = useMemo(() => getTypographyComponent(components), [components]);
  const currentFont = useMemo(() => getFontActive(options, fontsData), [options, fontsData]);
  const activeFontsOptions = useMemo(() => getFontsOptions(activeFonts, fontsData), [activeFonts, fontsData])
  const bodyFontValue = useMemo(() => getFontSelectValue(activeFontsOptions, options.body.font_id), [activeFontsOptions, options.body.font_id])
  const headerFontValue = useMemo(() => getFontSelectValue(activeFontsOptions, options.h1.font_id), [activeFontsOptions, options.h1.font_id])
  const headerFontWeightOptions = useMemo(() => getFontWeightOptions(currentFont.headers), [currentFont.headers])
  const headerFontWeightValue = useMemo(() => getFontSelectValue(headerFontWeightOptions, options.h1.weight), [headerFontWeightOptions, options.h1.weight])
  const bodyFontWeightOptions = useMemo(() => getFontWeightOptions(currentFont.body), [currentFont.body])
  const bodyFontWeightValue = useMemo(() => getFontSelectValue(bodyFontWeightOptions, options.body.weight), [bodyFontWeightOptions, options.body.weight])

  const onChangeFontWeight = (group, value) => {
    const weight = value.value;

    dispatch(fontsChangeGroupOptions(group, {
      weight,
    }))
  }
  const onChangeFontFamily = (group, value) => {
    const font_id = value.value;
    let weight = 400;
    const options = group === 'headers' ? headerFontWeightOptions : bodyFontWeightOptions;
    const findWeight = options.find((item) => item.value === 400);
    if (!findWeight) {
      weight = options[0].value;
    }

    dispatch(fontsChangeGroupOptions(group, {
      font_id,
      weight,
    }))
  }
  const onChangeHeaderColor = (key, value) => {
    const newData = _.cloneDeep(component.data);

    const keys = getParentKey({
      typeData: 'data',
      value: key,
    });

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      newData[keys.parentKey] = value;
    } else {
      const newDataFont = getObjectSource(newData, keys.currentPath);
      newDataFont[keys.currentKey] = value;
    }

    dispatch(componentsChangeData(newData, false, component.key));
  }

  const onChangeFontSize = (value) => {
    const size = parseInt(value, 10);
    dispatch(fontsChangeGroupOptions('body', {
      size,
    }))
  }

  const onOpenFontsManager = () => {
    setOpenFontsManager(true);
  };

  const onResetFontsConfirm = () => {
    setReset(false)
    onResetFonts(component.key)
  }

  return (
    <div className="scrollbar-light">
      <div className="editor-edit-font">
        <div className="editor-edit-font__body">
          <SidebarHeader>
            <IconPrev
              className="editor__sub-sidebar-title-prev"
              onClick={() => onChangeShow('list')}
            />
            Text styles
          </SidebarHeader>
          <SidebarDescription>
            The changes you make will globally affect all the text styles on your panel
            pages.
          </SidebarDescription>
          <div className="editor-edit-font__preview">
            <h1
              className="editor-edit-font__preview-headers"
              style={{
                fontSize: `${currentFont.headers.size}${currentFont.headers.unit}`,
                fontWeight: currentFont.headers.weight,
                fontFamily: `'${currentFont.headers.font.family}', ${currentFont.headers.font.category}`,
              }}
            >
              {currentFont.headers.font.family}
            </h1>
            <div
              className="editor-edit-font__preview-paragraph"
              style={{
                fontSize: `${currentFont.body.size}${currentFont.body.unit}`,
                fontWeight: currentFont.body.weight,
                fontFamily: `'${currentFont.body.font.family}', ${currentFont.body.font.category}`,
              }}
            >
              Paragraph text -
              {' '}
              {currentFont.body.font.family}
            </div>
          </div>
          <div className="editor-edit-font__section editor-edit-font__section-resize">
            <div className="editor-edit-font__resize">
              <div className="editor-edit-font__resize-from">
                <IconSizeMinus />
              </div>
              <div className="editor-edit-font__resize-range">
                <RangeSlider
                  min={12}
                  max={20}
                  step={1}
                  value={Number(fonts.options.body.size)}
                  onChange={onChangeFontSize}
                />
              </div>
              <div className="editor-edit-font__resize-to">
                <IconSizePlus />
              </div>
            </div>
          </div>
          <div className="editor-edit-font__section">
            <div className="editor-edit-font__section-header">
              <div className="editor-edit-font__section-header-title">
                Heading font
              </div>
              <div className="editor-edit-font__section-header-add-font" onClick={onOpenFontsManager}>+ Add font</div>
            </div>
            <div className="editor-edit-font__section-headers">
              <Select
                options={activeFontsOptions}
                value={headerFontValue}
                theme="dark"
                onChange={(value) => onChangeFontFamily('headers', value)}
                placeholder="Select font"
              />
            </div>
            <div className="editor-edit-font__section-paragraph">
              <Select
                options={headerFontWeightOptions}
                value={headerFontWeightValue}
                theme="dark"
                onChange={(value) => onChangeFontWeight('headers', value)}
                placeholder="Select weight"
              />
            </div>
            {/* <FormGroup> */}
            {/*  <FormHorizontal label={'Headings font color'}> */}
            {/*    <Color */}
            {/*      value={component.data.header.color} */}
            {/*      gradient={false} */}
            {/*      onChange={(value) => onChangeHeaderColor('header.color', value)} */}
            {/*    /> */}
            {/*  </FormHorizontal> */}
            {/* </FormGroup> */}
          </div>
          <div className="editor-edit-font__section editor-edit-font__section-last">
            <div className="editor-edit-font__section-header">
              <div className="editor-edit-font__section-header-title">
                Paragraph font
              </div>
              <div className="editor-edit-font__section-header-add-font" onClick={onOpenFontsManager}>+ Add font</div>
            </div>
            <div className="editor-edit-font__section-headers">
              <Select
                options={activeFontsOptions}
                value={bodyFontValue}
                theme="dark"
                onChange={(value) => onChangeFontFamily('body', value)}
                placeholder="Select font"
              />
            </div>
            <div className="editor-edit-font__section-paragraph">
              <Select
                options={bodyFontWeightOptions}
                value={bodyFontWeightValue}
                theme="dark"
                onChange={(value) => onChangeFontWeight('body', value)}
                placeholder="Select weight"
              />
            </div>
            {/* <FormGroup> */}
            {/*  <FormHorizontal label={'Paragraph font color'}> */}
            {/*    <Color */}
            {/*      value={component.data.paragraph.color} */}
            {/*      gradient={false} */}
            {/*      onChange={(value) => onChangeHeaderColor('paragraph.color', value)} */}
            {/*    /> */}
            {/*  </FormHorizontal> */}
            {/* </FormGroup> */}
          </div>
          <div className="editor-edit-font__section">
            <FormGroup>
              <FormHorizontal label="Link text color">
                <Color
                  value={component.data.link.colors.default.text}
                  gradient={false}
                  onChange={(value) => onChangeHeaderColor('link.colors.default.text', value)}
                />
              </FormHorizontal>
            </FormGroup>
          </div>
        </div>
        <div className="editor-edit-font__footer">
          <div className="editor-edit-font__reset" onClick={() => setReset(true)}>
            <IconResetFont />
            {' '}
            Reset to default
          </div>
        </div>
        {isReset
          ? (
            <div className="editor-edit-font__confirm">
              <ConfirmModal>
                <ConfirmModalTitle>Reset fonts</ConfirmModalTitle>
                <ConfirmModalDescription>
                  Are you sure you want to reset these fonts back to default
                  settings?
                </ConfirmModalDescription>
                <ConfirmModalActions
                  onClickCancel={() => setReset(false)}
                  onClickConfirm={onResetFontsConfirm}
                  confirmLabel="Yes, reset"
                  cancelLabel="Cancel"
                  confirmStyle="danger"
                />
              </ConfirmModal>
            </div>
          ) : null}
        {isOpenFontsManager
          ? <Fonts onClose={() => setOpenFontsManager(false)} /> : null}
      </div>
    </div>
  );
};

SidebarFontsEdit.propTypes = {
  onResetFonts: PropTypes.func.isRequired,
  onChangeShow: PropTypes.func.isRequired,
};

export default memo(SidebarFontsEdit);
