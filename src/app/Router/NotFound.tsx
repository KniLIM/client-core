import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

interface NotFoundProps {
    prefix?: string;
    onClick?: () => void;
};

export default (props: NotFoundProps) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="此页面未找到"
            extra={
                <Button
                    type="primary"
                    onClick={props.onClick ? props.onClick : undefined}
                >
                    {props.prefix ? props.prefix : <Link to='/'>返回首页</Link>}
                </Button>
            }
            style={{
                margin: "10% auto"
            }}
        />
    );
};