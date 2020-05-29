import React, {CSSProperties, useState} from 'react';
import {Button, Input, message} from "antd"
import {AudioOutlined, SendOutlined} from "@ant-design/icons/lib";
import ToolBar from './ToolBar';
import useService from '../service';

const {TextArea} = Input

/**
 * todo: 1.回车发送 2.两个按钮的响应 3.逻辑
 * @param propStyle
 */

interface InputBoxProps {
    id: string,
    style: CSSProperties,
}

export default (props: InputBoxProps) => {
    const style: CSSProperties = {
        ...props.style,
    };

    const[msg, setMsg] = useState('');
    const {addMsg} = useService();

    // TODO: 全局状态需要一个user
    const myId = '654321'; // 全局状态
    const avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg';

    const onSendMsg = () => {
        if (msg === '') {
            message.warn('发送内容不能为空')
            return;
        }

        addMsg(props.id, {
            msgId: '00000',
            senderId: myId,
            senderAvatar: avatar,
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
                style={{
                    borderTop: "thin dotted",
                    height: "25%",
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
                <div style={{marginRight: "2rem", marginTop: "1.2rem"}}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<AudioOutlined/>}
                    />
                    <Button
                        style={{marginTop: "0.6rem"}}
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined/>}
                        onClick={(e) => onSendMsg()}
                    />
                </div>
            </div>
        </div>
    )
};
