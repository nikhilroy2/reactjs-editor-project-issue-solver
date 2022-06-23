const grey = '#929fb7';
const specialGrey = '#8da9de9e';
const lightgrey = '#e9ecf1';

export const getBorderItem = (props) => {
  const {
    active, setActiveBorder, setOpen, recurs,
  } = props;
  if (recurs) {
    // eslint-disable-next-line
    return setActive(active, setActiveBorder, setOpen);
  }
  return [
    {
      title: 'none',
      className: 'border-none',
      none: true,
      active: true,
    },
    {
      title: 'solid',
      className: 'border-solid',
      styleConfig: {
        borderWidth: '2px',
        borderColor: grey,
      },
      active: false,
    },
    {
      title: 'dotted',
      className: 'border-dotted',
      styleConfig: {
        borderWidth: '2px',
        borderColor: grey,
      },
      active: false,
    },
    {
      title: 'dashed',
      className: 'border-dashed',
      styleConfig: {
        borderWidth: '2px',
        borderColor: grey,
      },
      active: false,
    },
    {
      title: 'double',
      className: 'border-double',
      styleConfig: {
        borderWidth: '6px',
        borderColor: grey,
      },
      active: false,
    },
    {
      title: 'inset',
      className: 'border-inset',
      styleConfig: {
        borderWidth: '7px',
        borderBottomColor: lightgrey,
        borderRightColor: lightgrey,
        borderTopColor: specialGrey,
        borderLeftColor: specialGrey,
      },
      active: false,
    },
    {
      title: 'outset',
      className: 'border-outset',
      styleConfig: {
        borderWidth: '7px',
        borderTopColor: lightgrey,
        borderLeftColor: lightgrey,
        borderBottomColor: specialGrey,
        borderRightColor: specialGrey,
      },
      active: false,
    },
  ];
};

const setActive = (value, setActiveBorder, setOpen) => getBorderItem(value).map((item) => (value === item.title
  ? {
    ...item,
    active: true,
    onClick: () => {
      setActiveBorder(item.title);
      setOpen(false);
    },
  }
  : {
    ...item,
    active: false,
    onClick: () => {
      setActiveBorder(item.title);
      setOpen(false);
    },
  }));
