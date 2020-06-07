import React from 'react'
import {useState} from 'react'
import { Input, Spin} from 'antd'
import { List, Skeleton } from 'antd'
import FriendItem from './util/friendItem'

const { Search } = Input

export default () => {
    const [loading, setLoading] = useState(false)
    const [friendList, setFriendList] = useState<any[]>([])
    const [current, setCurrent] = useState(1)

    // 测试数据
    const friendTmp = ["飞电或人", "天津垓天", "不破谏不破", "刃唯阿", "伊兹",
    "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    "飞电或人", "天津垓", "不破谏", "刃唯阿", "伊兹",
    "飞电或人", "天津垓", "不破谏"]
    const avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

    const searchFriend = (keyword : any) => {
        setLoading(true)
        setFriendList(friendTmp)
        setLoading(false)
    }

    return (
        <div>
            <Search 
            placeholder = "搜索朋友"
            onSearch = {value => searchFriend(value)}
            style = {{ width:"100%" }}
            />
            <div>
                <Spin 
                spinning={loading} 
                style = {{ width:"100%" }}>
                </Spin>
                <List
                className='friend-search-result'
                itemLayout='horizontal'
                locale={{emptyText:"赶快搜索并添加好友吧~"}}
                dataSource={friendList}
                renderItem={friend =>(
                    <Skeleton avatar title = {false} loading={loading} active>
                        <FriendItem
                            id="1234"
                            name={friend}
                            avatar={avatar}
                            sex={friend.length >= 3? "man": "woman"}
                            location={friend.length >= 3?"浙江 温州":"黑龙江 哈尔滨"}
                            signature={"Jump! Authorize"}
                            loading={loading}
                        /> 
                    </Skeleton>
                )}
                pagination={{
                    current: current,
                    defaultPageSize: 10,
                    size: 'small',
                    total: friendList.length,
                    hideOnSinglePage: true,
                    onChange: (page) => setCurrent(page),
                    position: 'bottom'
                }}
                />
            </div>
        </div>
    )
}