import React, {CSSProperties} from 'react';
import {Tabs} from 'antd';
import './index.css'
import FriendList from './friendlist'
import GroupList from './grouplist'
import useGroupService from 'app/Service/groupService';

export default (propStyle: CSSProperties) => {

    const {groupListLoading} = useGroupService()

    const style: CSSProperties = {
        ...propStyle,
        overflow: 'hidden'
    }

    const IGroupList = () => {
        return groupListLoading ? null : <GroupList />
    }

    const { TabPane } = Tabs
    return (
        <div id="friendTab" style={style}>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="好坋" key="1">
                    <FriendList/>
                </TabPane>
                <TabPane tab="群组" key="2">
                    <IGroupList/>
                </TabPane>
            </Tabs>
        </div>
    )

};
