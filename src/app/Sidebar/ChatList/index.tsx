import React, {CSSProperties} from 'react';
import ChatList from './chatlist'

export default (propStyle: CSSProperties) => {
    const pageName = "chat list"
    
    return (
        <div style={propStyle} id="chatlist">
            <ChatList/>
        </div>
    )
}
