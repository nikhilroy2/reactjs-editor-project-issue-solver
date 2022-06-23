import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormGroup, FormVertical } from '../../../../layouts/Form';
import NewSelect from '../../Select';
import { getPagesToOptions } from '../helper';

const Internal = ({ value, onChange, type }) => {
  const { data, activePage } = useSelector((state) => state.pages);
  const options = getPagesToOptions(data, activePage);

  const onChangePage = (value) => {
    onChange(value.value);
  };

  const activeValue = options.find((o) => o.value === value && type !== 'web') || options.find((o) => o.value === 0);

  return (
    <div className="scrollbar-light">
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

Internal.defaultProps = {
  value: 0,
};

Internal.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

export default Internal;
