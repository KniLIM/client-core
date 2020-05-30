import React from 'react';
import { Spin } from 'antd';


export default () => (
    <Spin
        size='large'
        style={{
            textAlign: 'center',
            paddingTop: '30%',
            paddingBottom: '30%',
            width: '100%',
            height: '100%',
        }}
    />
);