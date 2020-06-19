import React, {CSSProperties} from 'react';
import {Button} from 'antd';
import useService from 'app/Service';
import {
    UserAddOutlined,
    UsergroupAddOutlined,
    TeamOutlined

} from '@ant-design/icons/lib';


export interface BottomBarProps {
    groupVisible: boolean;
    setGroupVisible: (visible: boolean) => void;
    style: CSSProperties;
};

export default (props: BottomBarProps) => {
    const style: CSSProperties = {
        ...props.style,
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
            <Button
                style={{marginLeft: "2%"}}
                type={props.groupVisible ? "primary" : "default"}
                shape='circle'
                icon={<TeamOutlined/>}
                onClick={() => props.setGroupVisible(true)}
            />
        </div>
    )
}
