import React, {CSSProperties, useRef} from 'react';
import InputBox from "./InputBox";
import MsgShow from "./MsgShow";
import {PageHeader} from "antd";

// 右侧作为聊天时候的Box ，包含输入部分InputBox ，展示部分MsgShow ，工具按钮 ToolBar
export default (propStyle: CSSProperties) => {
    const pageName:string = "陈泽人NB"
    const style:CSSProperties = {
        ...propStyle,
        fontSize:"large"
    }

    const id = '123456'; // TODO: 这个应该是作为props传进来的

    return (
        <div style={style}>
            <PageHeader
                className="userName"
                onBack={() => null}
                title={pageName}
            />
            <MsgShow
                id={id}
                style={{
                    borderTop: "thin dashed",
                    height: "59%",
                    overflow: "auto",
                }}
            />
            <InputBox
                id={id}
                style={{
                    height: "26%",
                }}
            />
        </div>
    )
}
