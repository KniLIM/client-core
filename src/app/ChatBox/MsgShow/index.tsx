import React, {CSSProperties, useRef, useEffect, useState} from 'react';
import { MessageList } from 'app/ChatBox/MsgShow/MessageList/MessageList';
import useMsgListService, {IMsgRecord} from 'app/ChatBox/service';
import useService from 'app/service';

import './main.css'


/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */

interface MsgShowProps {
    style: CSSProperties;
};

export default (props: MsgShowProps) => {
    const style = props.style;

    const {user, currentChatBoxId} = useService();
    const {msgList} = useMsgListService();
    const [msgCnt, setCnt] = useState(msgList[currentChatBoxId].msgs.length);
    const msgEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 加载信息定位到底部
        msgEndRef.current?.scrollIntoView();
    }, []);

    useEffect(() => {
        // 收到新消息定位到底部
        if (msgList[currentChatBoxId].msgs.length > msgCnt) {
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
                        msgList[currentChatBoxId].msgs.map((msg: IMsgRecord) => {
                            let bubble: any = {
                                avatar: msg.senderAvatar,
                                position: msg.senderId === user.userId ? 'right' : 'left',
                                type: msg.type,
                                date: msg.date,
                                notch: false,
                            }

                            switch (msg.type) {
                                case 'text':
                                    bubble.text = msg.content;
                                    break;
                                case 'photo':
                                    bubble.data = {
                                        uri: msg.content,
                                    }
                                    break;
                                case 'file':
                                    bubble.text = msg.name as string;
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
