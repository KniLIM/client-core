import React from 'react';
import { Card, Typography, Button } from 'antd';
import {  BellTwoTone, StarTwoTone, ContactsTwoTone } from '@ant-design/icons';
import { NotificationType } from 'models/notification';
import useNotiService, { INoti, NotiStatus } from 'app/Message/service';
import getDateTime from 'app/Message/util';


interface NotiProps {
    index: number,
    noti: INoti,
}

export default (props: NotiProps) => {
    const { agreeNoti, refuseNoti } = useNotiService();

    const NotiIcon = () => {
        switch (props.noti.notificationType) {
            case NotificationType.N_FRIEND_ADD_APPLICATION: {
                return (
                    <ContactsTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_GROUP_JOIN_APPLICATION: {
                return (
                    <StarTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_FRIEND_ADD_RESULT: {
                return(
                    <BellTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_FRIEND_DELETE_RESULT: {
                return (
                    <BellTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_GROUP_JOIN_RESULT: {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_GROUP_WITHDRAW_RESULT: {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_GROUP_KICKOFF_RESULT: {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case NotificationType.N_GROUP_DELETE: {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
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
                                fontSize:"0.8rem"
                            }}
                            size="small"
                            type="primary"
                            onClick={() => agreeNoti(props.index)}
                        >
                            同意
                        </Button>
                        <Button
                            style={{
                                marginLeft:"0.7rem",
                                lineHeight:"normal",
                                fontSize:"0.8rem"
                            }}
                            size="small"
                            type="primary"
                            onClick={()=>refuseNoti(props.index)}
                        >
                            拒绝
                        </Button>
                    </div>
                );
        }
    };

    return(
        <Card bodyStyle={{padding:"10px"}}>
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
                    {props.noti.content}
                </Typography>
            </div>
            {renderHandleButtons()}
        </Card>
    )
}