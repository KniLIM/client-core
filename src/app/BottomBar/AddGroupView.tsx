import React from 'react'
import {useState} from 'react'
import { Input, Spin } from 'antd'
import { List, Skeleton } from 'antd'
import GroupItem from './util/groupItem'
import useGroupService from 'app/Service/groupService'

const { Search } = Input

export default () => {
    const [current, setCurrent] = useState(1)

    const {
        searchGroupByKeyword,loading,groupList,
    } = useGroupService()

    // 测试数据
    // const groupTmp = ["飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    // "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    // "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    // "飞电智能公司", "哉亚集团", "A.I.M.S", "卫星泽亚", "卫星亚克",
    // "飞电智能公司", "哉亚集团", "A.I.M.S"]

    // const avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

    return (
        <div>
            <Search
            placeholder = "搜索群聊"
            onSearch = {value => searchGroupByKeyword(value)}
            style = {{ width:"100%" }}
            />
            <div>
                <Spin
                spinning={loading}
                style = {{marginTop:"20%", width:"100%" }}>
                </Spin>
                <List
                className='friend-search-result'
                itemLayout='horizontal'
                locale={{emptyText:"赶快搜索并加入群聊吧~"}}
                dataSource={groupList}
                renderItem={group =>(
                    <Skeleton avatar title = {false} loading={loading} active>
                        <GroupItem
                            id={group.id}
                            name={group.name}
                            avatar={group.avatar}
                            owner={group.owner}
                            signature={group.signature}
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
