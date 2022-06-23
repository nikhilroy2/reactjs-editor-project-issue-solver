import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './_notifications.scss';

const Notifications = () => <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />;

export default Notifications;
