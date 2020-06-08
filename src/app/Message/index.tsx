import React, {CSSProperties, useEffect} from 'react';
import {useState} from 'react'
import { Spin, Divider, Typography, Pagination} from 'antd'
import { List, Skeleton } from 'antd'
import NotiItem from './NotiItem'
import getDateTime from './util';

/**
 * 用于在右侧显示所有的通知
 * todo: 1.展示各类通知 2.完成回调
 * @param propStyle
 */
export default (style:CSSProperties) => {
    // 测试数据
    const testNotiList = [
        {   
            type: "N_FRIEND_ADD_APPLICATION",
            content: "A 添加你为好友",
            createAt: "1591153998499",
        },
        {
            type: "N_FRIEND_ADD_RESULT",
            content: "已成功添加好友 B",
            createAt: "1591153998499",
        },
        {
            type: "N_FRIEND_DELETE_RESULT",
            content: "C 已经删除了你的好友",
            createAt: "1591153998499",
        },
        {
            type: "N_GROUP_JOIN_APPLICATION",
            content: "D 申请加入群聊 114宿舍",
            createAt: "1591153998499",
        },
        {
            type: "N_GROUP_JOIN_RESULT",
            content: "你已加入群聊 114宿舍",
            createAt: "1591153998499",
        },
        {
            type: "N_GROUP_WITHDRAW_RESULT",
            content: "E 已退出群聊 1919宿舍",
            createAt: "1591153998499",
        },
        {
            type: "N_GROUP_KICKOFF_RESULT",
            content: "你已被踢出群聊 下北泽",
            createAt: "1591153998499",
        },
        {
            type: "N_GROUP_DELETE",
            content: "群聊 王道征途 已解散",
            createAt: "1591153998499",
        }
    ]

    // 此处需要一个获取通知列表的api
    const [notiList, setNotiList] = useState<any[]>(testNotiList)
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(1)

    const IfDivide = () => {
        return notiList.length === 0 ?
            <Divider style={{margin:"0.5rem"}}/> : null
    }

    return(
        <div style={style}>
            <Typography style={{
                textAlign:"center",
                fontSize:"1.3rem"
            }}>通    知</Typography>
            <IfDivide />
            <List
                className='notification'
                itemLayout='horizontal'
                locale={{emptyText:"暂无通知"}}
                dataSource={notiList}
                renderItem={noti =>(
                    <Skeleton title = {false} loading={loading} active>
                        <NotiItem
                            rcvId="1234"
                            senderId="1234"
                            type={noti.type}
                            content={noti.content}
                            createAt={getDateTime(noti.createAt)}
                        /> 
                    </Skeleton>
                )}
                pagination={{
                    current: current,
                    defaultPageSize: 5,
                    size: 'small',
                    total: notiList.length,
                    hideOnSinglePage: true,
                    onChange: (page) => setCurrent(page),
                    position: 'bottom',
                }}
                />
            {/* <div>
                <Pagination
                    current={current}
                    defaultPageSize={5}
                    size='small'
                    total={notiList.length}
                    hideOnSinglePage={true}
                    onChange={(page) => setCurrent(page)}
                >
                </Pagination>
            </div> */}
        </div>
    )
}