import { List, message, Avatar, Spin } from 'antd';
import React, { CSSProperties, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import useGroupService from 'app/Service/groupService';
import userInfo from 'app/Detail/userInfo';


export default (style: CSSProperties) => {


    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {groups, getGroupInfoById} = useGroupService();
    const {changeGroup} = userInfo();

    const handleInfiniteOnLoad = () => {
    };

    const changeCurrentChatBox = (id: string) => {
        //message.warning("点到了 " + id);
        changeGroup(id);
    }

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
                    dataSource={groups}
                    renderItem={item => (
                        <List.Item key={item.id} className="friendlist-list-item" onClick={() => changeCurrentChatBox(item.id)}>
                            <List.Item.Meta className="friendlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="friendlist-avatar" />}
                                title={item.name}
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






