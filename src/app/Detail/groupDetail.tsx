import React, { CSSProperties, useState, useEffect } from 'react'
import { Tabs, Avatar, Typography, Button, Upload, message, Table, Spin } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload';
import { uploader, beforeImgUpload } from 'app/ChatBox/InputBox/upload'
import useUserService from 'app/Service/userService'
import useGroupService from 'app/Service/groupService'
import { IUserTmp } from '../Service/groupService';
import { IGroup } from 'app/Service/utils/IUserInfo'
import useChatBoxService from 'app/ChatBox/service';
import useUserInfoService from 'app/Detail/userInfo';

const { TabPane } = Tabs
const { Paragraph } = Typography

export default (style: CSSProperties) => {
    const { user } = useUserService()

    const {
        groupInfo, deleteGroup, member, setMember, isOwner, memoLoading,
        expelGroup, exitGroup, editMemo, updateGroupInfo, loading, setGroupInfo
    } = useGroupService()

    const {setCurrentBox} = useUserInfoService()

    const { createChat } = useChatBoxService()

    const editGroupName = (str: string) => {
        if (str !== groupInfo.name)
            updateGroupInfo(groupInfo.id, user.userId, { 'name': str })
    }

    const editGroupSignature = (str: string) => {
        if (str !== groupInfo.name)
            updateGroupInfo(groupInfo.id, user.userId, { 'signature': str })
    }

    const editGroupAnnouncement = (str: string) => {
        if (str !== groupInfo.name)
            updateGroupInfo(groupInfo.id, user.userId, { 'announcement': str })
    }

    const editNickName = (id: string, userId: string, index: any, newName: string) => {
        if (member[index].memo !== newName) {
            const tmp: Array<IUserTmp> = member
            tmp[index] = { ...tmp[index], memo: newName }
            setMember(tmp)
            editMemo(id, userId, newName)
        }
    }

    const exitG = () => {
        setCurrentBox(0)
        exitGroup(groupInfo.id, user.userId)
    }

    const deleteG = () => {
        setCurrentBox(0)
        deleteGroup(groupInfo.id)
    }

    const [imgUploading, setImgUploading] = useState(false);
    const [img, setImg] = useState('');

    const onImgUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setImgUploading(true);
        } else if (info.file.status === 'done') {
            const imgUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            setImg(imgUrl)
            updateGroupInfo(groupInfo.id, user.userId, { 'avatar': imgUrl })
            setImgUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送图片失败');
        } else {
            console.log("不知道的状态")
        }
    }

    const Name = (prop: any) => {
        return isOwner ? (
            <div style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>
                <Paragraph style={{
                    fontSize: "1.3rem",
                    paddingTop: "10px",
                    marginBottom: "0"
                }} editable={{ onChange: (str) => editGroupName(str) }}>{prop.name}</Paragraph>
            </div>
        ) : (
                <Paragraph style={{
                    fontSize: "1.3rem",
                    paddingTop: "10px",
                    marginBottom: "0"
                }}>{prop.name}</Paragraph>
            )
    }

    const Signature = (prop: any) => {
        return isOwner ? (
            <div style={{ float: "left", width: "100%" }}>
                <Typography style={{
                    color: "grey",
                    float: "left",
                    width: "30%",
                    textAlign: "right"
                }}>群组介绍</Typography>

                <Paragraph style={{
                    float: "right",
                    width: "63%",
                    textAlign: "left",
                    marginRight: "5%"
                }} editable={{ onChange: (str) => editGroupSignature(str) }}>
                    {prop.str}</Paragraph>
            </div>
        ) : (
                <div style={{ float: "left", width: "100%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>群组介绍</Typography>

                    <Paragraph style={{
                        float: "right",
                        width: "63%",
                        textAlign: "left",
                        marginRight: "5%"
                    }}>{prop.str}</Paragraph>
                </div>
            )
    }

    const Announcement = (prop: any) => {
        return isOwner ? (
            <div style={{ float: "left", width: "100%" }}>
                <Typography style={{
                    color: "grey",
                    float: "left",
                    width: "30%",
                    textAlign: "right"
                }}>公告</Typography>

                <Paragraph style={{
                    float: "right",
                    width: "63%",
                    textAlign: "left",
                    marginRight: "5%"
                }} editable={{ onChange: (str) => editGroupAnnouncement(str) }}>
                    {prop.str}</Paragraph>
            </div>
        ) : (
                <div style={{ float: "left", width: "100%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>公告</Typography>

                    <Paragraph style={{
                        float: "right",
                        width: "63%",
                        textAlign: "left",
                        marginRight: "5%"
                    }}>
                        {prop.str}</Paragraph>
                </div>
            )
    }

    const Footer = () => {
        return isOwner ? (
            <div style={{}}>
                <Button onClick={() => createChat(groupInfo.id, groupInfo.name, true)} type="primary" style={{
                    lineHeight: "normal",
                    fontSize: "90%",
                    marginRight: "1rem"
                }}
                >开始聊天</Button>
                <Button onClick={() => deleteG()} type="primary" style={{
                    lineHeight: "normal",
                    fontSize: "90%",
                }}
                >解散该群</Button>

            </div>
        ) : (
                <div style={{

                }}>
                    <Button onClick={() => createChat(groupInfo.id, groupInfo.name, true)} type="primary" style={{
                        lineHeight: "normal",
                        fontSize: "90%",
                        marginRight: "1rem"
                    }}
                    >开始聊天</Button>
                    <Button onClick={() => exitG()} type="primary" style={{
                        lineHeight: "normal",
                        fontSize: "90%",
                    }}> 退出该群</Button>
                </div>
            )
    }

    const columns = isOwner ? [
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            width: "4rem",
            align: "center" as "center",
            render: (avatar: string) =>
                <Avatar src={avatar} />
        },
        {
            title: "昵称",
            dataIndex: "nickName",
            key: "nickName",
            ellipsis: true,
        },
        {
            title: "群名片",
            dataIndex: "memo",
            key: "memo",
            ellipsis: true,
            render: (text: string, record: any, index: any) =>
                <div style={{
                    marginLeft: "5%"
                }}>
                    <Paragraph
                        editable={{ onChange: (str) => editNickName(groupInfo.id, record.id, index, str) }}
                        style={{
                            marginBottom: "0",
                        }}>{text}
                    </Paragraph>
                </div>
        },
        {
            title: "操作",
            key: "action",
            align: "center" as "center",
            render: (record: any) => {
                return !(user.userId === record.id) ?
                    <Button type="primary" size="small" style={{
                        lineHeight: "normal",
                        fontSize: "0.78rem"
                    }}
                        onClick={() => expelGroup(groupInfo.id, record.id)}>踢出该群</Button>
                    : null
            }
        }
    ] : [
            {
                title: "头像",
                dataIndex: "avatar",
                key: "avatar",
                width: "4rem",
                align: "center" as "center",
                render: (avatar: string) => <Avatar src={avatar} />
            },
            {
                title: "昵称",
                dataIndex: "nickName",
                key: "nickName",
                ellipsis: true,
            },
            {
                title: "群名片",
                dataIndex: "memo",
                key: "memo",
                ellipsis: true,
                render: (text: string, record: any, index: any) => {
                    return user.userId === record.id ? <Paragraph
                        editable={{ onChange: (str) => editNickName(groupInfo.id, record.id, index, str) }}
                        style={{
                            marginBottom: "0",
                            marginLeft: "2%"
                        }}
                    >{text}</Paragraph>

                        : <Paragraph
                            style={{
                                marginBottom: "0",
                                marginLeft: "2%"
                            }}>{text}
                        </Paragraph>
                }
            },
        ]

    const ITable = () => {
        return loading ? null
            : (
                <Table
                    columns={columns}
                    dataSource={member}
                    size="small"
                    scroll={{ y: "15.5rem" }}
                    pagination={false}
                    style={{
                        maxHeight: "18rem",
                        marginTop: "-2.5%"
                    }}
                />
            )
    }


    return loading? <Spin style={{marginTop:"45%"}}/>:(
        <div style={{ height: "100%" }}>
            <div style={{ paddingTop: "20px" }}>
                {isOwner ? <Upload
                    data={() => uploader.getToken()}
                    beforeUpload={beforeImgUpload}
                    showUploadList={false}
                    onChange={onImgUploadChange}
                    disabled={imgUploading}
                    accept=".jpeg, .png"
                    action="http://up-z1.qiniup.com"
                >
                    <a><Avatar style={{ height: "6rem", width: "6rem" }}
                        src={groupInfo.avatar} /></a>
                </Upload> :
                    <Avatar style={{ height: "6rem", width: "6rem" }}
                        src={groupInfo.avatar} />
                }
            </div>
            <Name name={groupInfo.name} />
            <Tabs defaultActiveKey="1" style={{ height: "68%" }}>
                <TabPane tab="简介" key="1" style={{ overflow: "scroll", height: "17.8rem" }}>
                    <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                        <Typography style={{
                            color: "grey",
                            float: "left",
                            width: "30%",
                            textAlign: "right"
                        }}>群主</Typography>

                        <Typography style={{
                            float: "right",
                            width: "68%",
                            textAlign: "left",
                        }}>{groupInfo.owner}</Typography>
                    </div>
                    <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                        <Typography style={{
                            color: "grey",
                            float: "left",
                            width: "30%",
                            textAlign: "right"
                        }}>创建时间</Typography>

                        <Typography style={{
                            float: "right",
                            width: "68%",
                            textAlign: "left",
                        }}>{groupInfo.createAt}</Typography>
                    </div>
                    <Signature str={groupInfo.signature} />
                    <Announcement str={groupInfo.announcement} />
                    <Footer />
                </TabPane>
                <TabPane tab="成员" key="2">
                    <ITable />
                </TabPane>
            </Tabs>
        </div>
    )
}
