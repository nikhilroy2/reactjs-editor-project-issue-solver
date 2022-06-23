export const getCollapseBodyClass = (reverse, isOpen, stopOpen) => {
  const defaultClass = isOpen ? `editor__collapse-component open ${stopOpen ? 'editor__collapse-component-stop' : ''}` : 'editor__collapse-component';
  const reverseClass = `${defaultClass} reverse`;
  return reverse && isOpen ? reverseClass : defaultClass
};
