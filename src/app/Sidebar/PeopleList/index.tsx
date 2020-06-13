import React, {CSSProperties} from 'react';
import {Tabs} from 'antd';
import './index.css'
import FriendList from './friendlist'
import GroupList from './grouplist'
import useFriendServes from 'app/Service/friendService'
import useUserServes from 'app/Service/userService'


export default (propStyle: CSSProperties) => {
    const {user} = useUserServes();
    const {getFriendList} = useFriendServes();

    const style: CSSProperties = {
        ...propStyle,
    }

    const { TabPane } = Tabs
    return (
        <div id="friendTab" style={style}>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="好友" key="1" >
                    <div onClick={() =>{getFriendList(user.userId)}}>
                    <FriendList/>
                    </div>
                </TabPane>
                <TabPane tab="群组" key="2">
                    <GroupList/>
                </TabPane>
            </Tabs>
        </div>
    )
    
};
