import {List, Avatar, Spin, Typography} from 'antd';
import React, {CSSProperties, useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './chatlist.css'
import useChatBoxService, {MsgItem} from 'app/ChatBox/service/index';
import useService, {TABS} from 'app/Service';
import usefriendService from 'app/Service/friendService'
import useGroupService from 'app/Service/groupService'

const {Paragraph} = Typography;


export default (style: CSSProperties) => {

    const {setChatBoxId} = useService();
    const {setTabBar} = useService();
    const {sortedMsgList} = useChatBoxService();
    const {friends, searchPicFriendById, searchNameFriendById} = usefriendService();
    const {groups} = useGroupService();

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const searchPicById = (id:string) =>{

    }
    const searchNameById = (id:string) =>{

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
                          }}>
                              <List.Item.Meta className="chatlist-list-item-meta"
                                              avatar={<Avatar src={searchPicFriendById(item)}
                                                              className="chatlist-avatar"/>}
                              />
                              <Paragraph ellipsis={{rows: 1}} style={{
                                  margin: 0,
                                  width: "80%",
                                  textAlign: "left"
                              }}>{searchNameFriendById(item)} </Paragraph>
                          </List.Item>
                      )}
                >
                    {loading && hasMore && (
                        <div className="chatlist-loading-container">
                            <Spin/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
}






