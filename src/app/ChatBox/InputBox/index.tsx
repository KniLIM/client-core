import React, {CSSProperties, useState} from 'react';
import {Button, Input} from "antd"
import {AudioOutlined, SendOutlined} from "@ant-design/icons/lib";
import ReactDOM from 'react-dom'

const {TextArea} = Input

/**
 * todo: 1.回车发送 2.两个按钮的响应 3.逻辑
 * @param propStyle
 */

export default (props:any) => {
    const style: CSSProperties = {
        ...props.propStyle,
        display: "flex"
    }

    const[message, setMessage] = useState<string>();

    function sendMessage(e: any){
        if(e.target.value === '\n') console.log("gang n")
        var temp = props.data;
        temp.push({
            avatar: aurl,
            position: 'right',
            type: 'text',
            text: e.target.value,
            date: new Date(),
            notch: false
        })
        props.setMessageData(temp)
        console.log(temp)
    }
    const aurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg'

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
                value = {message}
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
