import '../scss/_borders_styles.scss'
import React from 'react';
// Border-radius svg components:
import { ReactComponent as AllCorners } from '../../../../assets/img/all-border-corners.svg';
import { ReactComponent as BottomLeftCorner } from '../../../../assets/img/bottom-left-corner.svg';
import { ReactComponent as BottomRightCorner } from '../../../../assets/img/bottom-right-corner.svg';
import { ReactComponent as TopLeftCorner } from '../../../../assets/img/top-left-corner.svg';
import { ReactComponent as TopRightCorner } from '../../../../assets/img/top-right-corner.svg';
// Border-width svg components:
import { ReactComponent as AllWidth } from '../../../../assets/img/all-border-width.svg';
import { ReactComponent as BottomWidth } from '../../../../assets/img/bottom-border-width.svg';
import { ReactComponent as LeftWidth } from '../../../../assets/img/left-border-width.svg';
import { ReactComponent as RightWidth } from '../../../../assets/img/right-border-width.svg';
import { ReactComponent as TopWidth } from '../../../../assets/img/top-border-width.svg';

// Tooltip
import Tooltip from '../../Tooltip';

const getClass = (active) => `border-svg ${active ? 'active' : ''}`

export const getBorderRadiusSvg = (setActiveBorder) => [
  {
    id: 1,
    getComponent: (index, active) => <Tooltip text="All corners"><AllCorners className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 2,
    getComponent: (index, active) => <Tooltip text="Top left corner"><TopLeftCorner className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 3,
    getComponent: (index, active) => <Tooltip text="Bottom left corner"><BottomLeftCorner className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 4,
    getComponent: (index, active) => <Tooltip text="Top right corner"><TopRightCorner className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 5,
    getComponent: (index, active) => <Tooltip text="Bottom right corner"><BottomRightCorner className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
]

export const getBorderWidthSvg = (setActiveBorder) => [
  {
    id: 1,
    getComponent: (index, active) => <Tooltip text="All borders width"><AllWidth className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 2,
    getComponent: (index, active) => <Tooltip text="Top border width"><TopWidth className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 3,
    getComponent: (index, active) => <Tooltip text="Left border width"><LeftWidth className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 4,
    getComponent: (index, active) => <Tooltip text="Bottom border width"><BottomWidth className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
  {
    id: 5,
    getComponent: (index, active) => <Tooltip text="Right border width"><RightWidth className={getClass(active)} onClick={setActiveBorder(index)} /></Tooltip>,
  },
]
