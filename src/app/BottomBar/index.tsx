import React, {CSSProperties} from 'react';
import {Button} from 'antd';
import useService from 'app/service';
import {
    UserAddOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons/lib';

// 基本完工，底部栏，不用修改
export default (propStyle: CSSProperties) => {
    const style: CSSProperties = {
        ...propStyle,
        display: "flex",
        alignContent: "start",
        width: "100%"
    }
    const {showAddFriendView, showAddGroupView, setNewFriendView, setNewGroupView} = useService()

    return (
        <div style={style}>
            <Button
                style={{marginLeft: "3%"}}
                type={showAddFriendView ? "primary" : "default"}
                shape="circle"
                icon={<UserAddOutlined/>}
                onClick={() => setNewFriendView(true)}
            />
            <Button
                style={{marginLeft: "2%"}}
                type={showAddGroupView ? "primary" : "default"}
                shape="circle"
                icon={<UsergroupAddOutlined/>}
                onClick={() => setNewGroupView(true)}
            />
        </div>
    )
}
