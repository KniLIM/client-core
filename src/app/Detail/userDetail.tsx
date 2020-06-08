import React, { CSSProperties } from 'react';

import { Card, Typography, Button, Descriptions, List } from 'antd';
import useService from './userInfo';
const { Paragraph } = Typography;

export default (style: CSSProperties) => {

    const { currentUserBoxId, user, deleteFriend, changeNickName } = useService();

    return (
        <Card title={currentUserBoxId} style={{ height: "99%", width: "67%", position: "absolute", textAlign: "left" }}>
            <Descriptions column={2} layout="vertical" >
                <Descriptions.Item>
                    <img src={user.userAvatar}
                        style={{ height: "93%", width: "93%" }}></img>
                </Descriptions.Item>
                <Descriptions.Item>
                    <table>
                        <tr>
                            <td style={{width:"35%"}}>
                                <List size="small" split={false}>
                                    <List.Item>备注名: </List.Item>
                                    <List.Item>邮箱： </List.Item>
                                    <List.Item>手机: </List.Item>
                                    <List.Item>性别： </List.Item>
                                    <List.Item>地址： </List.Item>
                                    <List.Item>生日： </List.Item>
                                </List>
                            </td><td style={{width:"60%"}}>
                                <List size="small" split={false}>
                                    <List.Item><Paragraph style={{margin:0}} editable={{ onChange: changeNickName }}>{user.nickname} </Paragraph></List.Item>
                                    <List.Item>{user.email} </List.Item>
                                    <List.Item>{user.phone} </List.Item>
                                    <List.Item>{user.sex} </List.Item>
                                    <List.Item>{user.location} </List.Item>
                                    <List.Item>{user.birthday} </List.Item>
                                </List>
                            </td>
                        </tr>
                    </table>
                </Descriptions.Item>
            </Descriptions>
            <Paragraph ellipsis={{ rows: 3 }}>
                个性签名：<br/>
                {user.signature}
            </Paragraph>

            <Button type="primary" style={{ float: "right" }} onClick={() => deleteFriend}>解除好友</Button>
        </Card >
    )

}