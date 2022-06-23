import { getParentKey } from '../../../utils/SourceValue';

const Counter = ({ counter }) => {
  const value = getParentKey(counter.source);
  const count = Number(value.currentKey);

  if (value && value !== 'not found') {
    return count + 1;
  }
  return null;
};

export default Counter;
