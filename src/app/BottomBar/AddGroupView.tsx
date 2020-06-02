import React from 'react'
import {useState} from 'react'
import { Input, Spin, Avatar } from 'antd';
import { List, Skeleton } from 'antd'
import GroupItem from './groupItem'

const { Search } = Input

export default () => {
    const [loading, setLoading] = useState(false)
    const [groupList, setGroupList] = useState<any[]>([])
    const [current, setCurrent] = useState(1)

    // 测试数据
    const groupTmp = ["飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    "飞电智能公司", "哉亚集团", "A.I.M.S"]

    const avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

    const searchFriend = (keyword : any) => {
        setLoading(true)
        setGroupList(groupTmp)
        setLoading(false)
    }

    return (
        <div>
            <Search 
            placeholder = "搜索群聊"
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
                locale={{emptyText:"赶快搜索并加入群聊吧~"}}
                dataSource={groupList}
                renderItem={friend =>(
                    <Skeleton avatar title = {false} loading={loading} active>
                        <GroupItem
                            id="1234"
                            name={friend}
                            avatar={avatar}
                            loading={loading}
                        /> 
                    </Skeleton>
                )}
                pagination={{
                    current: current,
                    defaultPageSize: 10,
                    size: 'small',
                    total: groupList.length,
                    hideOnSinglePage: true,
                    onChange: (page) => setCurrent(page),
                    position: 'bottom'
                }}
                />
            </div>
        </div>
    )
}