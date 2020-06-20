import React, {useState, useEffect} from 'react';
import { Card, Typography, Button } from 'antd';
import {
    InfoCircleOutlined,
    RightCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { NotificationType } from 'models/notification';
import useNotiService, { INoti, NotiStatus } from 'app/Message/service';
import { getDateTime, splitContentByType } from 'app/Message/util';
import useUserService from 'app/Service/userService';
import { constants } from 'buffer';


interface NotiProps {
    index: number,
    noti: INoti,
}

export default (props: NotiProps) => {
    const { agreeNoti, refuseNoti, notiLoading } = useNotiService();
    const [groupId, setGroupId] = useState("")
    const [agreeLoading, setAgree] = useState(false);
    const [refuseLoading, setRefuse] = useState(false);
    const {user} = useUserService()

    useEffect(() => {
        if (notiLoading === false) {
            setAgree(false);
            setRefuse(false);
        }
    }, [notiLoading])

    useEffect(() => {
        if(props.noti.notificationType === NotificationType.N_GROUP_JOIN_APPLICATION){
            const words = props.noti.content.split(',')
            setGroupId(words[3])
        }
    },[])

    const NotiIcon = () => {
        switch (props.noti.notificationType) {
            case NotificationType.N_FRIEND_ADD_APPLICATION:
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                switch (props.noti.status) {
                    case NotiStatus.UNHANDLED:
                        return (
                            <RightCircleOutlined
                                style={{
                                    fontSize:"2.3rem",
                                    marginTop:"0.5rem",
                                    color: "#ff7875",
                                }}
                            />
                        );
                    case NotiStatus.AGREED:
                        return (
                            <CheckCircleOutlined
                                style={{
                                    fontSize:"2.3rem",
                                    marginTop:"0.5rem",
                                    color: "#ff7875",
                                }}
                            />
                        );
                    case NotiStatus.REFUSED:
                        return (
                            <CloseCircleOutlined
                                style={{
                                    fontSize:"2.3rem",
                                    marginTop:"0.5rem",
                                    color: "#ff7875",
                                }}
                            />
                        );
                }
            }
            case NotificationType.N_FRIEND_ADD_RESULT:
            case NotificationType.N_FRIEND_DELETE_RESULT:
            case NotificationType.N_GROUP_JOIN_RESULT:
            case NotificationType.N_GROUP_WITHDRAW_RESULT:
            case NotificationType.N_GROUP_KICKOFF_RESULT:
            case NotificationType.N_GROUP_DELETE: {
                return(
                    <InfoCircleOutlined
                        style={{
                            fontSize:"2.3rem",
                            marginTop:"0.5rem",
                            color: "#40a9ff"
                        }}
                    />
                )
            }
        }
    }

    const renderHandled = (handledMsg: string) => {
        return (
            <div
                style={{
                    float:"right",
                    width:"9.1rem",
                    marginTop:"0.9rem"
                }}
            >
                <Typography>{handledMsg}</Typography>
            </div>
        );
    };

    const renderHandleButtons = () => {
        switch (props.noti.status) {
            case NotiStatus.AGREED:
                return renderHandled('已同意');
            case NotiStatus.REFUSED:
                return renderHandled('已拒绝');
            case NotiStatus.UNHANDLED:
                return (
                    <div style={{
                        float:"right",
                        width:"9.1rem",
                        marginTop:"0.9rem"
                    }}>
                        <Button
                            style={{
                                lineHeight:"normal",
                            }}
                            size="small"
                            type="default"
                            onClick={() => {setAgree(true); agreeNoti(props.index,user.userId,{groupId})}}
                            loading={agreeLoading && notiLoading}
                            disabled={!agreeLoading && notiLoading}
                        >
                            同意
                        </Button>
                        <Button
                            style={{
                                marginLeft:"0.7rem",
                                lineHeight:"normal",
                            }}
                            size="small"
                            type="default"
                            onClick={() => {setRefuse(true); refuseNoti(props.index,user.userId,{groupId})}}
                            loading={refuseLoading && notiLoading}
                            disabled={!refuseLoading && notiLoading}
                        >
                            拒绝
                        </Button>
                    </div>
                );
        }
    };

    return(
        <Card
            bodyStyle={{padding:"10px"}}
            style={{borderTop: '0', padding: '0.2rem 0'}}
        >
            <div
                style={{
                    float:"left",
                    width: "4.1rem",
                    height: "3.2rem"
                }}
            >
                <NotiIcon />
            </div>
            <div
                style={{
                    float:"left",
                    width:"17rem",
                    height:"3.2rem",
                    marginLeft:"10px"
                }}
            >
                <Typography style={{textAlign:"left", color:"grey"}}>
                    {getDateTime(props.noti.createAt)}
                </Typography>
                <div style={{padding:"0.2rem"}} />
                <Typography style={{textAlign:"left"}}>
                    {splitContentByType(props.noti.notificationType, props.noti.content)}
                </Typography>
            </div>
            {renderHandleButtons()}
        </Card>
    );
};
