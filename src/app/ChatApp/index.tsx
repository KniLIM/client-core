import React, {useEffect, useState} from 'react';
import useRouter from 'use-react-router';
import useService, {TABS} from "app/Service";
import userUserService from 'app/Service/userService';
import connectService from 'app/Service/connectService';
import {Drawer, Empty, message} from 'antd';
import Sidebar from "app/Sidebar"
import HeaderBar from "app/Headerbar"
import ChatBox from "app/ChatBox"
import BottomBar from "app/BottomBar"
import Detail from "app/Detail"
import Message from "app/Message"
import AddFriendView from 'app/BottomBar/AddFriendView';
import AddGroupView from 'app/BottomBar/AddGroupView';
import CreateGroupView from 'app/BottomBar/CreateGroupView';

import './ChatApp.css';
import {disconnect} from "cluster";

/**
 * 主框架，最好别动
 */
function App() {
    const {
        tabBar,
        showAddGroupView,
        showAddFriendView,
        setNewGroupView,
        setNewFriendView,
    } = useService();
    const {user, userLoading} = userUserService();

    const { history } = useRouter();
    const {connectSocket,connect,disconnectSocket} = connectService()

    const [createGroupVisible, setVisible] = useState(false);

    useEffect(() => {
        if (userLoading === false && user.userId === '') {
            message.info('请先登录');
            history.push('/login');
        }else if (userLoading === false && user.userId) {
            disconnectSocket()
            connectSocket(connect.host,connect.port.toString(),connect.token,user)
        }
    }, [userLoading, user]);

    const RightBox = (tab: TABS) => {
        switch (tab) {
            case TABS.EMPTY:
                return (<div style={{
                    border: "thin dashed",
                    borderLeft: "none",
                    width: "68%",
                    textAlign: "center",
                    paddingTop: "30%"
                }}><Empty description={"你走以后，我的世界空空如也"}/></div>)
            case TABS.CHAT:
                return (<ChatBox border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
            case TABS.LIST:
                return (<Detail border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
            case TABS.MESSAGE:
                return (<Message border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
        }
    };

    return (
        <div
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: "1rem",
                width: "86%",
                height: "80%",
                marginTop: "8rem",
                maxWidth: "52rem",
                minWidth: "40rem",
                maxHeight: "80rem",
                minHeight: "40rem",
                border: "2px dashed",
                position: "relative",
                textAlign: 'center',
            }}
        >
            <HeaderBar height={"2rem"}/>
            <div style={{
                display: "flex",
                overflow: "auto",
                position: "absolute",
                top: "4rem",
                bottom: "4rem",
                right: "2rem",
                left: "2rem",
            }}>
                <Sidebar width={"32%"} border={"thin dashed"}/>
                {RightBox(tabBar)}
            </div>
            <BottomBar
                groupVisible={createGroupVisible}
                setGroupVisible={setVisible}
                style={{
                    bottom: "2%",
                    height: "2rem",
                    position: "absolute",
                }}
            />
            <Drawer
                title="添加好友"
                placement="left"
                closable={false}
                onClose={() =>setNewFriendView(false)}
                visible={showAddFriendView}
                getContainer={false}
                style={{position: "absolute",overflow:"hidden"}}
                width="42%"
            >
                <AddFriendView />
            </Drawer>
            <Drawer
                title="添加群组"
                placement="right"
                closable={false}
                onClose={()=>setNewGroupView(false)}
                visible={showAddGroupView}
                getContainer={false}
                style={{position: "absolute",overflow:"hidden"}}
                width="42%"
            >
                <AddGroupView />
            </Drawer>
            <CreateGroupView visible={createGroupVisible} setVisible={setVisible} />
        </div>
    );
}

export default App;
