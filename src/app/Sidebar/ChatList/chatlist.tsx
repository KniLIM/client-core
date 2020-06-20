import { List, Avatar, Spin, Typography } from 'antd';
import React, { CSSProperties, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './chatlist.css'
import useChatBoxService, {MsgItem} from 'app/ChatBox/service/index';
import useService, { TABS } from 'app/Service';
import usefriendService from 'app/Service/friendService'
import useGroupService from 'app/Service/groupService'

const { Paragraph } = Typography;




export default (style: CSSProperties) => {

    const {setChatBoxId} = useService();
    const {setTabBar} = useService();
    const {sortedMsgList, setChatList, chatList} = useChatBoxService();
    const {friends} = usefriendService();
    const {groups} = useGroupService();

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const templist: Array<MsgItem> = [];
        for(let m of sortedMsgList){
            const temp = new MsgItem()
            temp.id = m;
            for(let f of friends){
                if(f.id === m){
                    temp.avatar = f.avatar;
                    temp.name = f.nickname;
                    templist.push(temp);
                }
            }
            for(let g of groups){
                if(g.id === m){
                    temp.avatar = g.avatar;
                    temp.name = g.name;
                    templist.push(temp);
                }
            }
        }
        setChatList(templist);
    }, [sortedMsgList,friends,groups])



    const handleInfiniteOnLoad = () => {


    };

    return (
        <div className="chatlist-infinite-container" >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() =>handleInfiniteOnLoad()}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List className="chatlist-list"
                    size="small"
                    dataSource={chatList
                    }
                    renderItem={item => (
                        <List.Item key={item.id} className="chatlist-list-item" onClick={() =>{
                                setChatBoxId(item.id);
                                setTabBar(TABS.CHAT);
                            }}>
                            <List.Item.Meta className="chatlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="chatlist-avatar" />}
                            />
                            <Paragraph ellipsis={{ rows: 1}} style={{margin:0, width:"80%", textAlign:"left"}}>{item.name} </Paragraph>
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






