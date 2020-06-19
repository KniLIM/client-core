import { List, message, Avatar, Spin } from 'antd';
import React, { CSSProperties, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import friendService, {IFriendInfo}from 'app/Service/friendService';
import userInfo from 'app/Detail/userInfo';
import useUserService from 'app/Service/userService'

export default (style: CSSProperties) => {


    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {friendList} = friendService();
    
    const {changeUser} = userInfo();



    const handleInfiniteOnLoad = () => {
    };

    return (
        <div className="friendlist-infinite-container" >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() =>handleInfiniteOnLoad()}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List className="friendlist-list"
                    size="small"
                    dataSource={friendList}
                    renderItem={item => (
                        <List.Item key={item.id} className="friendlist-list-item" onClick={() => changeUser(item.id)}>
                            <List.Item.Meta className="friendlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="friendlist-avatar" />}
                                title={item.nickname}
                            />
                        </List.Item>
                    )}
                >
                    {loading && hasMore && (
                        <div className="friendlist-loading-container">
                            <Spin />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
}






