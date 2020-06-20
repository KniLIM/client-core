import { List, Avatar, Spin, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import friendService from 'app/Service/friendService';
import userInfo from 'app/Detail/userInfo';
const { Paragraph } = Typography;


export default () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { friends } = friendService();
    const [friendList, setList] = useState(friends.slice(0, friends.length >= 30 ? 30 : friends.length));
    const { changeUser } = userInfo();
    const [sliceCount, setSliceCount] = useState(30);

    const fetchData = () => {
        const newList = friendList.concat(friends.slice(sliceCount, sliceCount + 30));
        setSliceCount(prev => prev + 30);
        setList(newList);
        setTimeout(() => setLoading(false), 80);
    };

    const handleInfiniteOnLoad = () => {
        if (loading) return;

        setLoading(true);
        if (friendList.length === friends.length) {
            setHasMore(false);
            setLoading(false);
            return;
        }

        console.log("loading more")
        fetchData();
    };

    useEffect(() => {
        if (loading && hasMore) {
            console.log('aaa')
        }
    }, [loading])

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
                    dataSource={friends.slice(0, sliceCount)}
                    renderItem={item => (
                        <List.Item key={item.id} onClick={() => changeUser(item.id)}>
                            <List.Item.Meta className="friendlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="friendlist-avatar" />}
                            />
                            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0, width: "80%", textAlign: "left" }}>{item.nickname} </Paragraph>

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
