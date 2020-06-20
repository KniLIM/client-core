import {useState} from 'react';
import {createModel} from 'hox';

// 右侧的标签页面需要对应的状态，当信息为空的时候，setTabBar(TABS.EMPTY)，可在右侧显示空
export enum TABS {
    "EMPTY", // 初始页面，空
    "CHAT", // 聊天
    "LIST", // 好友列表
    "MESSAGE", // 消息推送
}

export default createModel(() => {
    const [tabBar,setTabBar]= useState(TABS.EMPTY);
    const [showAddFriendView,setNewFriendView] = useState(false);
    const [showAddGroupView,setNewGroupView] = useState(false);
    const [currentChatBoxId, setChatBoxId] = useState(''); // 聊天对象的id，''默认没有（空空如野）

    return {
        tabBar, setTabBar,
        showAddFriendView, setNewFriendView,
        showAddGroupView, setNewGroupView,
        currentChatBoxId, setChatBoxId,
    };
});
