import React, {CSSProperties} from 'react';
import {PageHeader} from 'antd';


/**
 * 用于在右侧显示所有的通知
 * todo: 1.展示各类通知 2.完成回调
 * @param propStyle
 */
export default (style:CSSProperties) => {
    const pageName = "show message"
    return(
        <div style={style}>{pageName}</div>
    )
}
