import React from 'react'
import {useState} from 'react'
import { Input, Spin} from 'antd'
import { List, Skeleton } from 'antd'
import FriendItem from './util/friendItem'
import useUserService from 'app/Service/userService'

const { Search } = Input

export default () => {
    const [current, setCurrent] = useState(1)

    const {searchUserLoading, searchRes, searchFriendByKeyword} = useUserService()

    // 测试数据
    // const friendTmp = ["飞电或人", "天津垓天", "不破谏不破", "刃唯阿", "伊兹",
    // "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    // "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    // "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    // "飞电或人", "天津垓", "不破谏"]
    // const avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

    return (
        <div>
            <Search 
            placeholder = "搜索朋友"
            onSearch = {value => searchFriendByKeyword(value)}
            style = {{ width:"100%" }}
            />
            <div>
                <Spin 
                spinning={searchUserLoading} 
                style = {{ width:"100%" }}>
                </Spin>
                <List
                className='friend-search-result'
                itemLayout='horizontal'
                locale={{emptyText:"赶快搜索并添加好友吧~"}}
                dataSource={searchRes}
                renderItem={user =>(
                    <Skeleton avatar title = {false} loading={searchUserLoading} active>
                        <FriendItem
                            id={user.userId}
                            name={user.nickname}
                            avatar={user.userAvatar}
                            sex={user.sex}
                            location={user.location}
                            signature={user.signature}
                        /> 
                    </Skeleton>
                )}
                pagination={{
                    current: current,
                    defaultPageSize: 10,
                    size: 'small',
                    total: searchRes.length,
                    hideOnSinglePage: true,
                    onChange: (page) => setCurrent(page),
                    position: 'bottom'
                }}
                />
            </div>
        </div>
    )
}