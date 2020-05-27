import React, {CSSProperties} from 'react';
import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;


/**
 * todo: 1.展示聊天 2.不同的聊天展示模型（视频、语言等） 3.逻辑
 * @param propStyle
 */
export default (style:CSSProperties) => {
    const pageName = "MsgShow"

    return(
        <div style={style}>{pageName}
        </div>
    )
}
