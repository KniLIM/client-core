import React, { CSSProperties ,useState,useEffect} from 'react'
import { Tabs, Avatar, Typography, Button, Upload, message, Table } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload';
import { uploader, beforeImgUpload } from 'app/ChatBox/InputBox/upload'
import useUserService from 'app/Service/userService'
import useGroupService from 'app/Service/groupService'

const { TabPane } = Tabs
const { Paragraph } = Typography

export default (id:any, style ?:CSSProperties) => {
    const {user} = useUserService()

    const {
        groupInfo, getGroupInfoById,deleteGroup,member,
        expelGroup,exitGroup,editMemo,updateGroupInfo
    } = useGroupService()

    useEffect(() => {
        getGroupInfoById(id)
    }, [])

    const userId = user.userId

    const defaultAvatar = "https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1"

    const editGroupName = (str:string) => {
        let params:any = {'name':str}
        updateGroupInfo(groupInfo.id, params)
    }

    const editGroupSignature = (str:string) => {
        let params:any = {'signature':str}
        updateGroupInfo(groupInfo.id, params)
    }

    const editGroupAnnouncement = (str:string) => {
        let params:any = {'announcement':str}
        updateGroupInfo(groupInfo.id, params)
    }

    const [imgUploading, setImgUploading] = useState(false);
    const [img, setImg] = useState('');

    const onImgUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setImgUploading(true);
        } else if (info.file.status === 'done') {
            const imgUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            setImg(imgUrl);
            let params:any = {'avatar':img}
            updateGroupInfo(groupInfo.id, params)
            setImgUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送图片失败');
        }
    }

    const Iavatar = (prop:any) => {
        return groupInfo.owner === userId ? (
            <Upload 
                data={() => uploader.getToken()}
                beforeUpload={beforeImgUpload}
                showUploadList={false}
                onChange={onImgUploadChange}
                disabled={imgUploading}
                accept=".jpeg, .png"
                action="http://up-z1.qiniup.com"
            >
                <a><Avatar style={{height:"6rem", width:"6rem"}}
                src={prop.default}/></a>
            </Upload>
        ) : (
            <Avatar style={{height:"6rem", width:"6rem"}}
            src={prop.default} />
        )
    }

    const Name = (prop: any ) => {
        return groupInfo.owner === userId ? (
            <div style={{width:"60%",textAlign:"center",margin:"0 auto"}}>
                <Paragraph style={{
                    fontSize:"1.3rem",
                    paddingTop:"10px",
                    marginBottom:"0"
                }} editable={{onChange:(str)=>editGroupName(str)}}>{prop.name}</Paragraph>
            </div>
        ) : (
            <Paragraph style={{
                fontSize:"1.3rem",
                paddingTop:"10px",
                marginBottom:"0"
            }}>{prop.name}</Paragraph>
        )
    }

    const Signature = (prop:any) => {
        return groupInfo.owner === userId ? (
            <div style={{float:"left",width:"100%"}}>
                <Typography style={{
                    color:"grey",
                    float:"left",
                    width:"30%",
                    textAlign:"right"
                }}>群组介绍</Typography>

                <Paragraph style={{
                    float:"right",
                    width:"63%",
                    textAlign:"left",
                    marginRight:"5%"
                }} editable={{onChange:(str) => editGroupSignature(str)}}>
                {prop.str}</Paragraph>
            </div>
        ) : (
            <div style={{float:"left",width:"100%"}}>
                <Typography style={{
                    color:"grey",
                    float:"left",
                    width:"30%",
                    textAlign:"right"
                }}>群组介绍</Typography>

                <Paragraph style={{
                    float:"right",
                    width:"63%",
                    textAlign:"left",
                    marginRight:"5%"
                }}>{prop.str}</Paragraph>
            </div>
        )
    }

    const Announcement = (prop:any) => {
        return groupInfo.owner === userId ? (
            <div style={{float:"left",width:"100%"}}>
                <Typography style={{
                    color:"grey",
                    float:"left",
                    width:"30%",
                    textAlign:"right"
                }}>公告</Typography>

                <Paragraph style={{
                    float:"right",
                    width:"63%",
                    textAlign:"left",
                    marginRight:"5%"
                }} editable={{onChange:(str) => editGroupAnnouncement(str)}}>
                {prop.str}</Paragraph>
            </div>
        ) : (
            <div style={{float:"left",width:"100%"}}>
                <Typography style={{
                    color:"grey",
                    float:"left",
                    width:"30%",
                    textAlign:"right"
                }}>公告</Typography>

                <Paragraph style={{
                    float:"right",
                    width:"63%",
                    textAlign:"left",
                    marginRight:"5%"
                }}>
                {prop.str}</Paragraph>
            </div>
        )
    }

    const Footer = () => {
        return groupInfo.owner === userId ? (
            <div style={{
                float:"right"
            }}>
                <Button onClick={()=>deleteGroup(groupInfo.id)} type="primary" style={{
                    lineHeight:"normal",
                    fontSize:"90%",
                    marginTop:"1rem",
                    marginRight:"3rem"
                }}
                >解散该群</Button>

            </div>
        ) : (
            <div style={{
                float:"right"
            }}>
                <Button onClick={()=>exitGroup(userId,groupInfo.id)} type="primary" style={{
                    lineHeight:"normal",
                    fontSize:"90%",
                    marginTop:"1rem",
                    marginRight:"3rem"
                }}> 退出该群</Button>
            </div>
        )
    }

    const columns = groupInfo.owner === userId ? [
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            width: "4rem",
            align: "center" as "center",
            render: (avatar:string) => 
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
            render: (text:string, record:any) => 
                <div style={{
                    marginLeft:"5%"
                }}>
                    <Paragraph
                        editable={{onChange:(str)=>editMemo(groupInfo.id, record.id, str)}}
                        style={{
                            marginBottom:"0",
                        }}>{text}
                    </Paragraph>
                </div>
        },
        {
            title: "操作",
            key: "action",
            align: "center" as "center",
            render: (record:any) => {
                return !(userId === record.id) ?
                <Button type="primary" size="small" style={{
                    lineHeight:"normal",
                    fontSize: "0.78rem"
                }}
                onClick={()=>expelGroup(groupInfo.id,record.id)}>踢出该群</Button>
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
            render: (avatar:string) => <Avatar src={avatar} />
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
            render: (text:string, record:any) => {
                return userId === record.id ? <Paragraph
                    editable={{onChange:(str)=>editMemo(groupInfo.id, record.id, str)}}
                    style={{
                        marginBottom:"0",
                        marginLeft:"2%"
                    }}
                >{text}</Paragraph>

                : <Paragraph
                    style={{
                        marginBottom:"0",
                        marginLeft:"2%"
                    }}>{text}
                </Paragraph>
            }
        },
    ]

    return (
        <div style={{height:"100%"}}>
            <div style={{padding:"10px"}}></div>
            <Iavatar default={defaultAvatar}/>
            <Name name={groupInfo.name} />
            <Tabs defaultActiveKey="1" style={{height:"68%"}}>
                <TabPane tab="简介" key="1" style={{overflow:"scroll",height:"17.8rem"}}>
                    <div style={{float:"left",width:"100%",marginBottom:"2%"}}>
                        <Typography style={{
                            color:"grey",
                            float:"left",
                            width:"30%",
                            textAlign:"right"
                        }}>群主</Typography>

                        <Typography style={{
                            float:"right",
                            width:"68%",
                            textAlign:"left",
                        }}>{groupInfo.owner}</Typography>
                    </div>
                    <div style={{float:"left",width:"100%",marginBottom:"2%"}}>
                        <Typography style={{
                            color:"grey",
                            float:"left",
                            width:"30%",
                            textAlign:"right"
                        }}>创建时间</Typography>

                        <Typography style={{
                            float:"right",
                            width:"68%",
                            textAlign:"left",
                        }}>{groupInfo.createAt}</Typography>
                    </div>
                    <Signature str={groupInfo.signature} />
                    <Announcement str={groupInfo.announcement} />
                    <Footer />
                </TabPane>
                <TabPane tab="成员" key="2">
                    <Table 
                        columns={columns} 
                        dataSource={member}
                        size="small"
                        scroll={{y:"15.5rem"}}
                        pagination={false}
                        style={{
                            maxHeight:"18rem",
                            marginTop:"-2.5%"
                        }}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}