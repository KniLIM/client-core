import React, { CSSProperties } from 'react';

import { Card, Typography, Button, Descriptions, List, Avatar } from 'antd';
import useService from './userInfo';
const { Paragraph } = Typography;

export default (style: CSSProperties) => {

    const { currentUserBoxId, user, deleteFriend, changeNickName } = useService();

    return (
        <div style={{ height: "100%" }}>
            <div style={{ padding: "10px" }}></div>
            <Avatar style={{ height: "6rem", width: "6rem" }}
                src={user.userAvatar} />
            <Typography style={{
                fontSize: "1.3rem",
                paddingTop: "10px"
            }}>{user.userName}</Typography>
            <div style={{marginTop:"2%"}}>
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
                    }}>{user.nickname}</Typography>
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
                    }}>{user.email}</Typography>
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
                    }}>{user.phone}</Typography>
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
                    }}>{user.sex}</Typography>
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
                    }}>{user.location}</Typography>
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
                    }}>{user.birthday}</Typography>
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
                    }}> <Paragraph ellipsis={{ rows: 3 }}>
                            {user.signature}
                        </Paragraph>
                    </Typography>
                </div>
            </div>
            <div style={{
                float:"right"
            }}>
                <Button onClick={() => deleteFriend} type="primary" style={{
                    lineHeight: "normal",
                    fontSize: "90%",
                    marginRight: "3rem"
                }}
                >解除好友</Button>
            </div>
        </div>
    )

}