import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

import { RouteComponentProps } from 'react-router-dom';

import './Login.css'

export interface LoginProps extends RouteComponentProps { }

export default (props: LoginProps) => {
    const bgStyle = {
        backgroundImage: `url(${require('../../assets/background.jpg')})`
    }

    const [visible, setVisible] = useState(false);

    return (
        <div className='login-root' style={bgStyle}>
            <LoginForm />
        </div>
    );
};