import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormGroup, FormVertical } from '../../../../layouts/Form';
import NewSelect from '../../Select';
import { getBlocksToOptions } from '../helper';

const Anchor = ({ value, onChange, type }) => {
  const blocks = useSelector((state) => state.data.blocks);
  const options = getBlocksToOptions(blocks);

  const onChangePage = (value) => {
    onChange(value.value);
  };

  const activeValue = options.find((o) => o.value === value && type !== 'web') || options.find((o) => o.value === 0);

  return (
    <div>
      <FormGroup>
        <FormVertical>
          <NewSelect
            activeValue={activeValue}
            options={options}
            handleChangeSelect={onChangePage}
            isSearchable
            maxMenuHeight={300}
          />
        </FormVertical>
      </FormGroup>
    </div>
  );
};

Anchor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
  type: PropTypes.string,
};

export default Anchor;
