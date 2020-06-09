import React, {CSSProperties} from 'react';
import {PageHeader} from 'antd';
import UserDetail from './userDetail';
import GroupDetail from './groupDetail';

/**
 * 当左侧导航栏处于联系人状态，且点击了某个好友、群组，现在要在右侧展示其细节，此为细节页面
 * todo: 完成显示即可，参考微信、tim、QQ
 * @param propStyle
 */
export default (style:CSSProperties) => {
    const pageName = "DetailInfo for user or group or empty"

    return(
        // 记得这一页需要有删除好友这个操作与按钮
        <div style={style}>
            {/* <UserDetail/> */}
            <GroupDetail />
        </div>
    )
}
