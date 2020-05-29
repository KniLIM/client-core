import React, {CSSProperties} from 'react';
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
    const {getMsgListById} = useService();
    const myId = '654321'; // 全局状态

    return(
        <div style={style}>
            <MessageList
                lockable={false}
                toBottomHeight={'100%'}
                dataSource={
                    getMsgListById(props.id).msgs.map((msg: IMsgRecord) => {
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
        </div>
    )
}
