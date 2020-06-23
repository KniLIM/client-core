import React, {CSSProperties} from 'react';
import ChatList from './chatlist'

export default (propStyle: CSSProperties) => {
    const pageName = "chat list"

    return (
        <div style={propStyle} id="chatlist">
            <p style={{textAlign:"center",marginTop:"3%",marginBottom:"2%",fontWeight:"bold"}}>聊 天 列 表</p>
            <ChatList />
        </div>
    )
}
