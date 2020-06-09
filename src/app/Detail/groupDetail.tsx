import React, { CSSProperties ,useState} from 'react'
import { Tabs, Avatar, Typography, Button, Upload, message, Table } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { uploader, beforeImgUpload } from 'app/ChatBox/InputBox/upload';

const { TabPane } = Tabs
const { Paragraph } = Typography

export default (style:CSSProperties) => {

    // 是否是群主
    const isOwner = true

    const userId = "123"

    const defaultAvatar = "https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1"

    const member = [
        {
            id:"123",
            nickName:"飞电或人",
            avatar : defaultAvatar,
            memo: "飞电飞电飞飞电",
            isAdmin: true
        },
        {
            id:"12345",
            nickName:"天津垓",
            avatar : defaultAvatar,
            memo: "永远的24岁",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"伊兹",
            avatar : defaultAvatar,
            memo: "集团秘书",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"刃唯阿",
            avatar : defaultAvatar,
            memo: "刃姐刃姐刃刃姐",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"不破谏",
            avatar : defaultAvatar,
            memo: "物理授权",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"飞电或人",
            avatar : defaultAvatar,
            memo: "飞电飞电飞飞电",
            isAdmin: true
        },
        {
            id:"12345",
            nickName:"天津垓",
            avatar : defaultAvatar,
            memo: "永远的24岁",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"伊兹",
            avatar : defaultAvatar,
            memo: "集团秘书",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"刃唯阿",
            avatar : defaultAvatar,
            memo: "刃姐刃姐刃刃姐",
            isAdmin: false
        },
        {
            id:"12345",
            nickName:"不破谏",
            avatar : defaultAvatar,
            memo: "物理授权",
            isAdmin: false
        },
    ]
    const dataSource = member

    const exitGroup = () => {
        //TODO 退群操作
    }

    const deleteGroup = () => {
        // TODO 解散群操作
    }

    const editGroupName = (str:string) => {
        // TODO 修改群组名
    }

    const editGroupSignature = (str:string) => {
        //TODO 修改群简介
    }

    const editGroupAnnouncement = (str:string) => {
        //TODO 修改群公告
    }

    const kickOff = (index:any) => {
        //TODO 踢出群
    }

    const [imgUploading, setImgUploading] = useState(false);
    const [img, setImg] = useState('');

    const onImgUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setImgUploading(true);
        } else if (info.file.status === 'done') {
            const imgUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            setImg(imgUrl);
            setImgUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送图片失败');
        }
    }

    const Iavatar = (prop:any) => {
        return isOwner ? (
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
        return isOwner ? (
            <div style={{width:"60%",textAlign:"center",margin:"0 auto"}}>
                <Paragraph style={{
                    fontSize:"1.3rem",
                    paddingTop:"10px",
                    marginBottom:"0"
                }} editable={{onChange:editGroupName}}>{prop.name}</Paragraph>
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
        return isOwner ? (
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
                }} editable={{onChange:editGroupSignature}}>
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
        return isOwner ? (
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
                }} editable={{onChange:editGroupAnnouncement}}>
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
        return isOwner ? (
            <div style={{
                float:"right"
            }}>
                <Button onClick={deleteGroup} type="primary" style={{
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
                <Button onClick={exitGroup} type="primary" style={{
                    lineHeight:"normal",
                    fontSize:"90%",
                    marginTop:"1rem",
                    marginRight:"3rem"
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
            render: (text:string, index:any) => 
                <div style={{
                    marginLeft:"5%"
                }}>
                    <Paragraph
                        editable={true}
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
            render: (index:number, record:any) => {
                // 获取当前用户id
                let isSelf = (userId === record.id)
                return !isSelf ?
                <Button type="primary" size="small" style={{
                    lineHeight:"normal",
                    fontSize: "0.78rem"
                }}
                onClick={()=>kickOff(index)}>踢出该群</Button>
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
                // 获取当前用户id
                let isSelf = (userId === record.id)
                return isSelf ? <Paragraph
                    editable={true}
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
            <Name name="群组群组群群组" />
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
                        }}>Faymine</Typography>
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
                        }}>2020-06-08</Typography>
                    </div>
                    <Signature str="这是KniLIM的测试交流群，欢迎大家加入～
                        这是KniLIM的测试交流群，欢迎大家加入～" />
                    <Announcement str="目前正在完成群组详情页的制作　痛みよ感じる、痛みよ考える
                        痛みよ感じる、痛みよ考える" />
                    <Footer />
                </TabPane>
                <TabPane tab="成员" key="2">
                    <Table 
                        columns={columns} 
                        dataSource={dataSource}
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