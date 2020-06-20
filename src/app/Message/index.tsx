import React, {CSSProperties, useState} from 'react';
import { Divider, Typography, List, Skeleton, Pagination } from 'antd'
import NotiItem from 'app/Message/NotiItem'
import useNotiService, {INoti} from 'app/Message/service';


export default (style:CSSProperties) => {
    const { notis, notiLoading } = useNotiService();
    const [current, setCurrent] = useState(1);

    return(
        <div style={style}>
            <Typography
                style={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    padding: '0.6rem 0'
                }}
            >
                通 知
            </Typography>
            <Divider style={{margin: '0'}} />
            <List
                className='notification'
                itemLayout='horizontal'
                locale={{emptyText:"暂无通知"}}
                dataSource={notis.slice((current - 1) * 5, current * 5)}
                renderItem={
                    (noti: INoti, index: number) => (
                        <Skeleton title = {false} loading={notiLoading} active>
                            <NotiItem
                                index={index}
                                noti={noti}
                            />
                        </Skeleton>
                    )
                }
                style={{
                    minHeight:'26rem'
                }}
            />
            <Pagination
                current={current}
                defaultPageSize={5}
                size='small'
                total={notis.length}
                hideOnSinglePage={true}
                onChange={(page) => setCurrent(page)}
            />
        </div>
    );
};
