import React, { CSSProperties } from 'react';

import { Card, Typography, Button, Descriptions, List, Avatar } from 'antd';
import userInfo from './userInfo';
const { Paragraph } = Typography;

export default (style: CSSProperties) => {

    const {friendDetail, deleteFriendById, changeNickName, createChatBox } = userInfo();


    return (
        <div style={{ height: "100%" }}>
            <div style={{ padding: "10px" }}></div>
            <Avatar style={{ height: "6rem", width: "6rem" }}
                src={friendDetail.userAvatar} />
            <Typography style={{
                fontSize: "1.3rem",
                paddingTop: "10px"
            }}>{friendDetail.nickname}</Typography>
            
            <div style={{ marginTop: "2%" }}>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>备注</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}><Paragraph style={{ margin: 0 }}
                        editable={{ onChange: changeNickName }}
                    >
                            {friendDetail.nickname}
                        </Paragraph></Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>邮箱</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{friendDetail.email}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>电话</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{friendDetail.phone}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>性别</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{friendDetail.sex}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>地址</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{friendDetail.location}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>生日</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{friendDetail.birthday}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>个性签名</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}> <Paragraph ellipsis={{ rows: 3 }} title={friendDetail.signature}>
                            {friendDetail.signature}
                        </Paragraph>
                    </Typography>
                </div>
            </div>
            <div style={{
            
            }}>
                <Button onClick={() => createChatBox()} type="primary" style={{
                    lineHeight: "normal",
                    fontSize: "90%",
                    marginRight: "1rem"
                }}
                >开始聊天</Button>
                <Button onClick={() => deleteFriendById()} type="primary" style={{
                    lineHeight: "normal",
                    fontSize: "90%",
                }}
                >解除好友</Button>
                
            </div>
        </div>
    )

}