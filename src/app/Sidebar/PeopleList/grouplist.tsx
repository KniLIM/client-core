import { List, message, Avatar, Spin } from 'antd';
import React, { CSSProperties, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'
import useService from 'app/Service';


const randomCoding = () => {
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var idvalue = '';
    for (var i = 0; i < 8; i++) {
        idvalue += arr[Math.floor(Math.random() * 26)];
    }
    return idvalue;
}

export default (style: CSSProperties) => {

    const [data, setData] = useState([{
        id: "",
        name: "",
        avatar:"",
    }]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const newData = () => {
        if(data.length < 2){
            var old = [];
            for (var i = 0; i < 10; i++) {
                var iddd = randomCoding();
                var t = {
                    id: iddd,
                    name: iddd,
                    avatar: "https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1",
                };
                old.push(t);
            }
            setData(old);
        }
    };

    newData();

    const fetchData = () => {
        var old = data;
        for (var i = 0; i < 9; i++) {
            var iddd = randomCoding();
            var t = {
                id: iddd,
                name: iddd,
                avatar: "https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1",
            };
            old.push(t);
        }
        setData(old);
        message.warning('now has ' + data.length);
    };

    const handleInfiniteOnLoad = () => {
        setLoading(true);
        if (data.length > 35) {
            message.warning('太多了太多了');
            setHasMore(false);
            setLoading(false);
        } else {
            fetchData();
            setLoading(false);
        }

    };

    const changeCurrentChatBox = (id: string) => {
        message.warning("点到了 " + id);
        //getUserDetail(id);
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
                    dataSource={data}
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





