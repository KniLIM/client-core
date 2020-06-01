import React, {CSSProperties} from 'react';
import {Tabs} from 'antd';
import './index.css'

export default (propStyle: CSSProperties) => {
    const style: CSSProperties = {
        ...propStyle,
    }
    const { TabPane } = Tabs
    return (
        <div style={style}>
            <Tabs  id="friendTab" defaultActiveKey="1" >
                <TabPane tab="好友" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="群组" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}
