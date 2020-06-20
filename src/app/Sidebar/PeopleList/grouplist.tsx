import { List, Avatar, Spin, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import useGroupService from 'app/Service/groupService';
import userInfo from 'app/Detail/userInfo';
const { Paragraph } = Typography;

export default (style: CSSProperties) => {


    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {groups, getGroupInfoById} = useGroupService();
    const {changeGroup} = userInfo();
    const [sliceCount, setSliceCount] = useState(10);

    const fetchData = () => {
        const temp = sliceCount + 10;
        setSliceCount(temp);
      };
    
     const handleInfiniteOnLoad = () => {
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
                loadMore={() =>handleInfiniteOnLoad()}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List className="friendlist-list"
                    size="small"
                    dataSource={groups.slice(0,sliceCount)}
                    renderItem={item => (
                        <List.Item key={item.id} className="friendlist-list-item" onClick={() => changeCurrentChatBox(item.id)}>
                            <List.Item.Meta className="friendlist-list-item-meta"
                                avatar={<Avatar src={item.avatar} className="friendlist-avatar" />}
                            />
                            <Paragraph ellipsis={{ rows: 1}} style={{margin:0, width:"80%", textAlign:"left" }}>{item.name} </Paragraph>
                            
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






