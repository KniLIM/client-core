import React, {CSSProperties, useState} from 'react';
import {Button, Input} from "antd"
import {AudioOutlined, SendOutlined} from "@ant-design/icons/lib";
import ReactDOM from 'react-dom'

const {TextArea} = Input

/**
 * todo: 1.回车发送 2.两个按钮的响应 3.逻辑
 * @param propStyle
 */

export default (propStyle: CSSProperties) => {
    const style: CSSProperties = {
        ...propStyle,
        display: "flex"
    }

    const[message, setMessage] = useState();

    function sendMessage(e: any){
        if(e.target.value === '\n') return
        console.log(message)
        e.target.value = ''
    }

    function getMessage(e: any){
        setMessage(e.target.value)
    }

    return (
        <div style={style}>
            <TextArea
                style={{
                    resize: "none",
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    boxShadow: "none",
                    paddingTop: "0.6rem",
                    paddingLeft: "0.6rem"
                }}
                placeholder="在此输入聊天内容"
                onChange={(e) => getMessage(e)}
                onPressEnter={(e) => sendMessage(e)}
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
    )
}
