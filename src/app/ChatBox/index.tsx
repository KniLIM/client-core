import React, {CSSProperties} from 'react';
import InputBox from 'app/ChatBox/InputBox';
import MsgShow from 'app/ChatBox/MsgShow';
import useService from 'app/Service';
import useFriendService from 'app/Service/friendService'
import useGroupService from 'app/Service/groupService'
import {PageHeader} from 'antd';

// 右侧作为聊天时候的Box ，包含输入部分InputBox ，展示部分MsgShow ，工具按钮 ToolBar
export default (propStyle: CSSProperties) => {
    const style:CSSProperties = {
        ...propStyle,
        fontSize: 'large',
    };

    const {currentChatBoxId} = useService();
    const {friends} = useFriendService();
    const {groups} = useGroupService();
    var name = '';
    for(var f of friends) {
        if(f.id === currentChatBoxId) name = f.nickname;
    }
    if(name === '') {
        for(var g of groups) {
            if(g.id === currentChatBoxId) name = g.name;
        }
    }

    return (
        <div style={style}>
            <PageHeader
                className="userName"
                backIcon={false}
                title={name}
            />
            <MsgShow
                style={{
                    borderTop: "thin dashed",
                    height: "59%",
                    overflow: "auto",
                }}
            />
            <InputBox style={{ height: "26%" }}
            />
        </div>
    )
}
