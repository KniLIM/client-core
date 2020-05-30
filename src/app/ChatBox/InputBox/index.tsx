import React, {CSSProperties, useState} from 'react';
import {Input, message} from 'antd';
import ToolBar from 'app/ChatBox/InputBox/ToolBar';
import useMsgListService from 'app/ChatBox/service';
import useService from 'app/service';

const {TextArea} = Input


interface InputBoxProps {
    style: CSSProperties,
}

export default (props: InputBoxProps) => {
    const style = props.style;

    const {user, currentChatBoxId} = useService();
    const [msg, setMsg] = useState('');
    const {addMsg} = useMsgListService();

    const onSendMsg = () => {
        if (msg === '') {
            message.warn('发送内容不能为空')
            return;
        }

        addMsg(currentChatBoxId, {
            msgId: '00000',
            senderId: user.userId,
            senderAvatar: user.userAvatar,
            type: 'text',
            content: msg,
            date: new Date(),
        });
        setMsg('');
    }

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.shiftKey)
                setMsg(prev => prev + '\n');
            else {
                onSendMsg();
            }
        }
    };

    return (
        <div style={style}>
            <ToolBar
                addEmoji={(value: string) => setMsg(prev => prev + value)}
                onSendMsg={onSendMsg}
                style={{
                    borderTop: "thin dotted",
                    height: "30%",
                }}
            />
            <div style={{
                display: "flex"
            }}>
                <TextArea
                    style={{
                        resize: "none",
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        boxShadow: "none",
                        paddingTop: "0.6rem",
                        paddingLeft: "0.8rem"
                    }}
                    placeholder="在此输入聊天内容"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyPress={(e) => onKeyPress(e)}
                />
            </div>
        </div>
    )
};
