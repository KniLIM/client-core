import { List, Avatar, Spin, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './chatlist.css'

import useService from 'app/Service';
const { Paragraph } = Typography;


export default (style: CSSProperties) => {

    const [data, setData] = useState([{
        id: "",
        name: "",
        avatar:"",
    }]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const {setChatBoxId} = useService();



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
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id} className="chatlist-list-item" onClick={() =>{setChatBoxId(item.id)}}>
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






