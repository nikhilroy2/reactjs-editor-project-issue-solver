import React from 'react';
import { ReactComponent as PARAGRAPH } from '../../../../../assets/img/wysiwyg/paragraph.svg';
import { ReactComponent as H1 } from '../../../../../assets/img/wysiwyg/h1.svg';
import { ReactComponent as H2 } from '../../../../../assets/img/wysiwyg/h2.svg';
import { ReactComponent as H3 } from '../../../../../assets/img/wysiwyg/h3.svg';
import { ReactComponent as H4 } from '../../../../../assets/img/wysiwyg/h4.svg';
import { ReactComponent as H5 } from '../../../../../assets/img/wysiwyg/h5.svg';
import { ReactComponent as H6 } from '../../../../../assets/img/wysiwyg/h6.svg';

export const list = [
  {
    value: 'p',
    icon: <PARAGRAPH />,
  },
  {
    value: 'header-one',
    icon: <H1 />,
  },
  {
    value: 'header-two',
    icon: <H2 />,
  },
  {
    value: 'header-three',
    icon: <H3 />,
  },
  {
    value: 'header-four',
    icon: <H4 />,
  },
  {
    value: 'header-five',
    icon: <H5 />,
  },
  {
    value: 'header-six',
    icon: <H6 />,
  },
];
