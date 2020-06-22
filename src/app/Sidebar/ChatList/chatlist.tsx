import { List, Avatar, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import useChatBoxService from 'app/ChatBox/service/index';
import useService, { TABS } from 'app/Service';
import usefriendService from 'app/Service/friendService'
import useGroupService from 'app/Service/groupService'
import { IFriend, IGroup } from 'app/Service/utils/IUserInfo';

import './chatlist.css'

const { Paragraph } = Typography;


export default () => {
    const { setChatBoxId, setChatBoxName, setChatBoxGroup, currentChatBoxId } = useService();
    const { setTabBar } = useService();
    const { msgReadList } = useChatBoxService();
    const { sortedMsgList } = useChatBoxService();
    const { friends } = usefriendService();
    const { groups } = useGroupService();

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const searchPicById = (id: string) => {
        let pic: string = '';

        friends.forEach((value: IFriend) => {
            return value.id === id ? (pic = value.avatar) : null;
        });
        if (pic !== '') return pic;

        groups.forEach((value: IGroup) => {
            return value.id === id ? (pic = value.avatar) : null;
        });

        return pic;
    }

    const searchNameById = (id: string) => {
        let name: string = '';
        friends.forEach((value: IFriend) => {
            return value.id === id ? (name = value.nickname) : null;
        })
        if (name !== '') return {name, isGroup: false};

        groups.forEach((value: IGroup) => {
            return value.id === id ? (name = value.name) : null;
        })

        return {name, isGroup: true};
    }

    const handleInfiniteOnLoad = () => {

    };

    return (
        <div className="chatlist-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => handleInfiniteOnLoad()}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List className="chatlist-list"
                    size="small"
                    dataSource={sortedMsgList}
                    renderItem={item => (
                        <List.Item key={item} className="chatlist-list-item" onClick={() => {
                            setChatBoxId(item);
                            setTabBar(TABS.CHAT);
                            const res = searchNameById(item);
                            setChatBoxName(res.name);
                            setChatBoxGroup(res.isGroup);
                        }}>
                            <List.Item.Meta
                                className="chatlist-list-item-meta"
                                avatar={
                                    <Avatar src={searchPicById(item)} className="chatlist-avatar" />
                                }
                            />
                            <Paragraph ellipsis={{ rows: 1 }} style={{
                                margin: 0,
                                width: "70%",
                                textAlign: "left"
                            }}>{searchNameById(item).name
                            } </Paragraph>
                            {msgReadList[item]!==undefined && !msgReadList[item] && currentChatBoxId!==item && <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'red'}}></div>}
                        </List.Item>
                    )}
                >
                    {loading && hasMore && (
                        <div className="chatlist-loading-container">
                            <Spin />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
}






