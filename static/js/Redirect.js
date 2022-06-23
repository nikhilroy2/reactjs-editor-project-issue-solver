import React from 'react';
import { Redirect } from 'react-router-dom';
import { EDITOR_URL } from './config';

export default () => <Redirect to={`${EDITOR_URL}/1`} />;
