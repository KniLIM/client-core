import React, {CSSProperties} from 'react';
import {Layout} from "antd";
import MessageBubble from './message'
const { Header, Footer, Sider, Content } = Layout;


/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */
export default (style:CSSProperties) => {
    const pageName = "MsgShow"
    const data = [
        {
            position: 'left',
            type: 'text',
            text: 'new friend',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: 'hello',
            date: new Date(),
        },
        {
            position: 'left',
            type: 'text',
            text: 'hi',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: 'what is u r name',
            date: new Date(),
        },
        {
            position: 'left',
            type: 'text',
            text: 'Xian Bei',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: 'I am Jie Ge',
            date: new Date(),
        },
        {
            position: 'left',
            type: 'text',
            text: '让我康康！',
            date: new Date(),
        },
        {
            position: 'right',
            type: 'text',
            text: '我觉得怪怪的',
            date: new Date(),
        },
    
    ]

    return(
        <div style={style}>
            <MessageBubble data={data}
            />
        </div>
    )
}
