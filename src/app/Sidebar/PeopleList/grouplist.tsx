import { List, Avatar, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import useGroupService from 'app/Service/groupService';
import userInfo from 'app/Detail/userInfo';
const { Paragraph } = Typography;

export default () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { groups, getGroupInfoById } = useGroupService();
    const [groupList, setList] = useState(groups.slice(0, groups.length >= 30 ? 30 : groups.length));
    const { changeGroup } = userInfo();
    const [sliceCount, setSliceCount] = useState(30);

    const fetchData = () => {
        const newList = groupList.concat(groups.slice(sliceCount, groups.length >= sliceCount + 30 ? sliceCount + 30 : groups.length));
        setSliceCount(prev => prev + 30);
        setList(newList);
        setTimeout(() => setLoading(false), 80);
    };

    const handleInfiniteOnLoad = () => {
        if (loading) return;

        setLoading(true);
        if (groups.length === groupList.length) {
            setHasMore(false);
            setLoading(false);
            return;
        }

        console.log("loading more")
        fetchData();
    };

    const changeCurrentChatBox = (id: string) => {
        changeGroup(id);
    }

    return (
        <div className="friendlist-infinite-container" >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => handleInfiniteOnLoad()}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    size="small"
                    dataSource={groupList}
                    renderItem={item => (
                        <List.Item key={item.id} onClick={() => changeCurrentChatBox(item.id)}>
                            <List.Item.Meta className="friendlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="friendlist-avatar" />}
                            />
                            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0, width: "80%", textAlign: "left" }}>{item.name} </Paragraph>

                        </List.Item>
                    )}
                />
                {loading && (
                    <div className="friendlist-loading-container">
                        <Spin />
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
}
