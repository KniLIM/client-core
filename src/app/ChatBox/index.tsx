import React, {CSSProperties} from 'react';
import InputBox from 'app/ChatBox/InputBox';
import MsgShow from 'app/ChatBox/MsgShow';
import useService from 'app/Service';
import {PageHeader} from 'antd';

// 右侧作为聊天时候的Box ，包含输入部分InputBox ，展示部分MsgShow ，工具按钮 ToolBar
export default (propStyle: CSSProperties) => {
    const style:CSSProperties = {
        ...propStyle,
        fontSize: 'large',
    };

    const {user} = useService();

    return (
        <div style={style}>
            <PageHeader
                className="userName"
                onBack={() => null}
                title={user.userName}
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
