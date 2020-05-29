import React, {CSSProperties, useRef, useEffect, useState} from 'react';
import { MessageList } from './MessageList/MessageList';
import useService, {IMsgRecord} from '../service';

import './main.css'


/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */

interface MsgShowProps {
    id: string;
    style: CSSProperties;
};

export default (props: MsgShowProps) => {
    const style = props.style;
    const myId = '654321'; // 全局状态

    const {msgList} = useService();
    const [msgCnt, setCnt] = useState(msgList[props.id].msgs.length);
    const msgEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 加载信息定位到底部
        msgEndRef.current?.scrollIntoView();
    }, []);

    useEffect(() => {
        // 收到新消息定位到底部
        if (msgList[props.id].msgs.length > msgCnt) {
            setCnt(prev => prev + 1);
            msgEndRef.current?.scrollIntoView();
        }
    }, [msgList])

    return(
        <div style={style}>
            <div>
                <MessageList
                    toBottomHeight={'100%'}
                    dataSource={
                        msgList[props.id].msgs.map((msg: IMsgRecord) => {
                            let bubble: any = {
                                avatar: msg.senderAvatar,
                                position: msg.senderId === myId ? 'right' : 'left',
                                type: msg.type,
                                date: msg.date,
                                notch: false,
                            }

                            switch (msg.type) {
                                case 'text':
                                    bubble.text = msg.content;
                                    break;
                                case 'photo':
                                    bubble.text = '\n'
                                    bubble.data = {
                                        uri: msg.content,
                                    }
                                    break;
                                default:
                                    throw Error('error msg type');
                            };

                            return bubble;
                        })
                    }
                />
                <div style={{ float: 'left', clear: 'both', height: '0.01%' }} ref={msgEndRef} />
            </div>
        </div>
    );
};
