import React, {CSSProperties} from 'react';
import {Layout} from "antd";

import './main.css'
import { MessageList } from './MessageList/MessageList'


const { Header, Footer, Sider, Content } = Layout;
/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */
export default (props: any) => {
    const pageName = "MsgShow"
    console.log('show'+props.data)
    return(
        <div style={props.style}>
            <MessageList
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={props.data}          
            />
        </div>
    )
}
