/* eslint-disable */
import React from 'react';
import { FormGroup, FormVertical } from '../../../../layouts/Form';
import Input from '../../../Elements/Input';

const External = ({ value, onChange }) => {
  return (
    <div>
      <FormGroup>
        <FormVertical>
          <Input value={value} onChange={(e) => onChange(e.target.value)} style='dark' />
        </FormVertical>
      </FormGroup>
    </div>
  );
};

export default External;
