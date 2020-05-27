import React, {CSSProperties} from 'react';
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
    return (
        <div style={style}>
            <PageHeader
                className="userName"
                onBack={() => null}
                title={pageName}
                subTitle= {`The current user is ${userState}`}
            />
            <MsgShow  borderTop={"thin dashed"}  height={"59%"} overflow={"auto"}/>
            <ToolBar  borderBottom={"thin dotted"} height={"6%"}/>
            <InputBox  height={"20%"}/>
        </div>
    )
}
