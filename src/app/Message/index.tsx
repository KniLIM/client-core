import React, {CSSProperties, useState} from 'react';
import { Divider, Typography } from 'antd'
import { List, Skeleton } from 'antd'
import NotiItem from 'app/Message/NotiItem'
import useNotiService, {INoti} from 'app/Message/service';


export default (style:CSSProperties) => {
    const { notis, notiLoading } = useNotiService();
    const [current, setCurrent] = useState(1);

    const IfDivide = () => {
        return notis.length === 0 ?
            <Divider style={{margin:"0.5rem"}}/> : null
    }

    return(
        <div style={style}>
            <Typography style={{
                textAlign:"center",
                fontSize:"1.3rem"
            }}>通    知</Typography>
            <IfDivide />
            <List
                className='notification'
                itemLayout='horizontal'
                locale={{emptyText:"暂无通知"}}
                dataSource={notis}
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
                pagination={{
                    current: current,
                    defaultPageSize: 5,
                    size: 'small',
                    total: notis.length,
                    hideOnSinglePage: true,
                    onChange: (page) => setCurrent(page),
                    position: 'bottom',
                }}
            />
        </div>
    );
};
