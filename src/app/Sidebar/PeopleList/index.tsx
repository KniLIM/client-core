import React, {CSSProperties} from 'react';
import {Tabs} from 'antd';
import './index.css'
import FriendList from './friendlist'
import GroupList from './grouplist'

export default (propStyle: CSSProperties) => {

    const style: CSSProperties = {
        ...propStyle,
    }

    const { TabPane } = Tabs
    return (
        <div id="friendTab" style={style}>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="好友" key="1">
                    <FriendList/>
                </TabPane>
                <TabPane tab="群组" key="2">
                    <GroupList/>
                </TabPane>
            </Tabs>
        </div>
    )
    
};
