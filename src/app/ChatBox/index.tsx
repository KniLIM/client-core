import React, {CSSProperties, useState} from 'react';
import InputBox from "./InputBox";
import MsgShow from "./MsgShow";
import ToolBar from "./ToolBar";
import {PageHeader} from "antd";

// 右侧作为聊天时候的Box ，包含输入部分InputBox ，展示部分MsgShow ，工具按钮 ToolBar
export default (propStyle: CSSProperties) => {
    const pageName:string = "陈泽人NB"
    const userState:string = "online"

    const style:CSSProperties = {
        ...propStyle,
        fontSize:"large"
    }

    const [messageData, setMessageData] = useState([])


    // const aurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590669994087&di=68d8cbb4388c9e5400dc2f362e1d89af&imgtype=0&src=http%3A%2F%2Fpic.68ps.com%2Fdown%2FUploadFile%2F20140720%2Fsc140720_1a.jpg'
    // const data = [
    //     {
    //         avatar: aurl,
    //         position: 'left',
    //         type: 'text',
    //         text: 'new friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friendnew friend',
    //         date: new Date(),
    //         notch: false,
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'right',
    //         type: 'text',
    //         text: 'hello',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'left',
    //         type: 'text',
    //         text: 'hi',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'right',
    //         type: 'text',
    //         text: 'what is u r name',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'left',
    //         type: 'text',
    //         text: 'Xian Bei',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'right',
    //         type: 'text',
    //         text: 'I am Jie Ge',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'left',
    //         type: 'text',
    //         text: '让我康康！',
    //         date: new Date(),
    //         notch: false
    //     },
    //     {
    //         avatar: aurl,
    //         position: 'right',
    //         type: 'text',
    //         text: '我觉得怪怪的',
    //         date: new Date(),
    //         notch: false
    //     },
    
    // ]

    return (
        <div style={style}>
            <PageHeader
                className="userName"
                onBack={() => null}
                title={pageName}
                subTitle= {`The current user is ${userState}`}
            />
            <MsgShow  data={messageData} style={{borderTop:"thin dashed" ,height:"59%",overflow:"auto"}}/>
            <ToolBar  borderBottom={"thin dotted"} height={"6%"}/>
            <InputBox  data={messageData} setMessageData={(a: any) => setMessageData(a)} style={{height:"20%"}}/>
        </div>
    )
}
