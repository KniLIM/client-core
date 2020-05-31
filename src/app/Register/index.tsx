import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import RegisterForm from './RegisterForm';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';


export default withRouter((props: RouteComponentProps) => {
    const [visible, setVisible] = useState(false);

    const bgStyle = {
        backgroundImage: `url(${require('../../assets/background.jpg')})`
    }

    const onOkClick = () => {
        setVisible(false);
    };

    return (
        <div className='register-root' style={bgStyle}>
            <RegisterForm />
        </div>
    );
});
