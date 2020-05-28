import React, {CSSProperties} from 'react';

import './main.css'
import { MessageList } from './MessageList/MessageList'


/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */

export default (propStyle: CSSProperties) => {
    const aurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg'
    const data = [
        {
            avatar: aurl,
            position: 'left',
            type: 'text',
            text: 'new friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friend',
            date: new Date(),
            notch: false,
        },
        {
            avatar: aurl,
            position: 'right',
            type: 'text',
            text: 'hello',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'left',
            type: 'text',
            text: 'hi',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'right',
            type: 'text',
            text: 'what is u r name',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'left',
            type: 'text',
            text: 'Xian Bei',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'right',
            type: 'text',
            text: 'I am Jie Ge',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'left',
            type: 'text',
            text: '让我康康！',
            date: new Date(),
            notch: false
        },
        {
            avatar: aurl,
            position: 'right',
            type: 'text',
            text: '我觉得怪怪的',
            date: new Date(),
            notch: false
        },
    ]

    return(
        <div style={propStyle}>
            <MessageList
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={data}
            />
        </div>
    )
}
