import React, {CSSProperties, useState} from 'react';
import {Button, Input, message} from "antd"
import {AudioOutlined, SendOutlined} from "@ant-design/icons/lib";
import ToolBar from './ToolBar';

const {TextArea} = Input

/**
 * todo: 1.回车发送 2.两个按钮的响应 3.逻辑
 * @param propStyle
 */

export default (propStyle: CSSProperties) => {
    const style: CSSProperties = {
        ...propStyle,
    }

    const[msg, setMsg] = useState('');

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter') {
            e.preventDefault();

            if (e.shiftKey)
                setMsg(prev => prev + '\n');
            else {
                if (msg == '') {
                    message.warn('发送内容不能为空')
                    return;
                }
                message.info('sucess');
                setMsg('');
            }
        }
    };

    return (
        <div style={style}>
            <ToolBar
                addEmoji={(value: string) => setMsg(prev => prev + value)}
                borderTop={"thin dotted"}
                height={"25%"}
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
                    type="primary" shape="circle"
                    icon={<AudioOutlined/>}/>
                    <Button
                        style={{marginTop: "0.6rem"}}
                        type="primary" shape="circle" icon={<SendOutlined/>}
                    />
                </div>
            </div>
        </div>
    )
}
