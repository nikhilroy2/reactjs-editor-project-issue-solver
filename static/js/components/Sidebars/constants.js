/* eslint-disable */
import React from 'react';
import { ReactComponent as IconPage } from '../../assets/img/page.svg';
import SidebarPages from './Sublist/Pages';
import { ReactComponent as IconBlock } from '../../assets/img/blocks.svg';
import SidebarBlocks from './Sublist/Blocks';
import { ReactComponent as IconColors } from '../../assets/img/colors.svg';
import SidebarColors from './Sublist/Colors';
import { ReactComponent as IconStyles } from '../../assets/img/styles-def.svg';
import SidebarStyles from './Sublist/Styles';
import { ReactComponent as IconFonts } from '../../assets/img/fonts.svg';
import { ReactComponent as IconLanguages } from '../../assets/img/languages.svg';
import FontsManager from '../Popups/Fontsmanager';
import SidebarLanguages from './Sublist/Languages';
import SidebarFonts from './Sublist/Fonts';

export const list = [
  {
    label: 'Pages',
    icon: <IconPage className="animate-transition-05" />,
    value: 'pages',
    type: 'sidebar',
    component: SidebarPages,
  },
  {
    label: 'Blocks',
    icon: <IconBlock className="animate-transition-05" />,
    value: 'blocks',
    type: 'sidebar',
    component: SidebarBlocks,
  },
  {
    label: 'Styles',
    icon: <IconStyles className="animate-transition-05" />,
    value: 'styles',
    type: 'sidebar',
    component: SidebarStyles,
  },
  {
    label: 'Colors',
    icon: <IconColors className="animate-transition-05" />,
    value: 'colors',
    type: 'sidebar',
    component: SidebarColors,
  },
  {
    label: 'Fonts',
    icon: <IconFonts className="animate-transition-05" />,
    value: 'fonts',
    type: 'sidebar',
    component: SidebarFonts,
  },
  {
    label: 'Lang',
    icon: <IconLanguages className="animate-transition-05" />,
    value: 'languages',
    type: 'sidebar',
    component: SidebarLanguages,
  },
];
