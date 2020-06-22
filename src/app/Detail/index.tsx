import React, { CSSProperties } from 'react';
import { PageHeader } from 'antd';
import UserDetail from './userDetail';
import GroupDetail from './groupDetail';
import useUserInfo from './userInfo';
import useGroupService from 'app/Service/groupService';
/**
 * 当左侧导航栏处于联系人状态，且点击了某个好友、群组，现在要在右侧展示其细节，此为细节页面
 * todo: 完成显示即可，参考微信、tim、QQ
 * @param propStyle
 */
export default (style: CSSProperties) => {
    const {currentBox , userloading} = useUserInfo();

    const pageName = "DetailInfo for user or group or empty"


    var detail = <div>
        {pageName}
    </div>;
    if(currentBox === 1){
        detail = <UserDetail />;
    }else if(currentBox === 2){
        detail = <GroupDetail/>;
    }else {
        detail = <div></div>;
    }

    return (
        <div style={style}>
            {detail}
        </div>
    )
}
