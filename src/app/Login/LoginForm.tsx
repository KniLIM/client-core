import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import useRouter from 'use-react-router'
import { Form, Input, Button } from 'antd';
import {UnlockOutlined, PhoneOutlined} from '@ant-design/icons'

import './LoginForm.css';

import useUserService, { ILoginParam } from 'app/Service/userService'

const LoginForm = () => {
    const {login} = useUserService();
    const {history} = useRouter();
    const handleSubmit = (values: any) => {
        const params: ILoginParam = {
            account: values['username'] as string,
            password: values['password'] as string,
            device: 'web',
        };

        login(params);
    }

    const {user, userLoading} = useUserService();

    useEffect(() => {
        if(user.userId !== '') {
            history.push('/')
        }
    },[user])

    return (
        <Form onFinish={handleSubmit} className='login-form'>
            <Form.Item
                name =  'username'
                rules = {[
                    {
                        required: true, message: '请输入正确手机号!', whitespace: true,
                        pattern: new RegExp('^(1[3-9])\\d{9}$')
                    }
                ]}
            >
                    <Input
                        prefix={<PhoneOutlined twoToneColor='blue'/>}
                        placeholder='手机号'
                    />
            </Form.Item>
            <Form.Item
                name='password'
                hasFeedback
                rules = {[
                    {
                        required: true,
                        message: '请输入密码!',
                    }
                ]}
            >
                <Input.Password
                    prefix={<UnlockOutlined />}
                    type='password'
                    placeholder='密码'
                />
            </Form.Item>
            <div id="register-form-bottom">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={userLoading}
                >
                    登录
                </Button>
                <div className='register-button' style={{marginTop: '24px'}}>
                    没有账号？
                    <Link to='/register'>注册</Link>
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;
