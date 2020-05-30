import React, {CSSProperties} from 'react';
import ChatList from 'app/Sidebar/ChatList';
import PeopleList from 'app/Sidebar/PeopleList';
import useService, {TABS} from 'app/Service';


/**
 * 左侧栏，存在两种状态：
 * 1. 聊天状态，左侧展示按照聊天顺序排序的好友信息（包含群组） <ChatList/>
 * 2. 联系人状态，左侧展示好友联系人与群组联系人 <PeopleList/>
 * bar的跳转基本已完成
 * todo: 1.展示好友信息 2.完成回调
 * @param propStyle
 */
export default (style:CSSProperties) => {
    const {tabBar} = useService()
    return(
        <div style={style}>
            {tabBar === TABS.LIST ? <PeopleList/>  : <ChatList/>  }
        </div>
    )
}
