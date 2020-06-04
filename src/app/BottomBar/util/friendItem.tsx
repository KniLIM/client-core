import React, { useState } from 'react'
import { Card, Avatar, Typography, Button , Tag, Modal, Input, Divider} from 'antd'
import useFriendService from 'app/Service/friendService';
import { managers } from 'socket.io-client';

const { TextArea } = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    sex: string
    location: string
    signature: string
    loading: boolean
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')
    const {isFriend} = useFriendService()
    const [info, showInfo] = useState(false)

    const applySuccess = () => {  //如果不是好友 则可以添加
        Modal.success({
            content: '发送好友申请成功！'
        })
    }

    const applyFailed = () => {  //如果已经是好友 则不能添加
        Modal.error({
            content: '不能添加已经添加的好友！'
        })
    }
    
    const application = () => {
        if(isFriend(props.id)){
            console.log(confirmMsg)
            showModal(false)
            applySuccess()
            setConfirmMsg('')
        }
        else {
            showModal(false)
            applyFailed()
            setConfirmMsg('')
        }
        
    }

    const cancel = () => {
        showModal(false)
        setConfirmMsg('')
    }

    const tagColor = props.sex != "woman" ? "blue" : "red"
    const gender = props.sex != "woman" ? "男" : "女"
    const simpleName = props.name.length>7?props.name.substring(0,7)+"...":props.name

    return (
        <Card bodyStyle={{padding:"10px"}} hoverable={true} loading={props.loading}>
            <div style={{float:"left"}}>
                <a onClick={()=>showInfo(true)}><Avatar src={props.avatar}
                    style={{
                        width: "3rem",
                        height: "3rem"
                    }}
                /></a>
            </div>
            <div style={{float:"left", height:"3rem"}}>
                <a onClick={()=>showInfo(true)}><Typography 
                    style={{
                        textAlign:"left"
                    }}
                >{simpleName}</Typography></a>

                <Tag color={tagColor}
                    style={{
                        float:"left",
                        marginTop:"7%",
                        width:"1.2rem",
                        height:"1.4rem",
                        marginRight:"0.8rem",
                        padding:"0",
                        lineHeight:"normal"
                    }}
                >{gender}</Tag>

                <Tag style={{
                    float:"left",
                    marginTop:"7%",
                    height:"1.2rem",
                    lineHeight:"normal",
                }}>{props.location}</Tag>
            </div>
            <div style={{
                float:"right", 
                width:"6rem",
                height:"3rem"
            }}>
                <Button size='small' onClick={()=>showModal(true)} type='primary' 
                     style={{
                        width:"4.2rem",
                        float:"right",
                        top:"0.77rem",
                        fontSize:"0.7rem",
                     }}
                >添加</Button>
            </div>
            <Modal
                title={"添加" + " " + simpleName + " " + "为好友"}
                visible={modal}
                onOk={application}
                onCancel={cancel}
                destroyOnClose={true}
                okText={"确认"}
                cancelText={"取消"}
            >
                <p>请输入验证信息</p>
                <TextArea rows={4} 
                    value={confirmMsg}
                    onChange={(e)=>setConfirmMsg(e.target.value)}
                />
            </Modal>
            <Modal 
                title="详细信息"
                visible={info}
                footer={null}
                onCancel={()=>showInfo(false)}
                destroyOnClose={true}
                maskClosable={true}
                bodyStyle={{paddingTop:"0"}}
                width="24%"
            >
            <div>
                <div>
                <Avatar src={props.avatar} style={{
                    height:"4rem",
                    width:"4rem",
                    display:"block",
                    margin:"auto"
                }}
                /></div>
                <Divider style={{
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem"
                }}/>
                <div>
                    <Typography style={{
                        fontSize:"1.2rem",
                        textAlign:"center"
                    }}>{props.name}</Typography>
                </div>
                <div style={{height:"0.5rem"}}></div>
                <div style={{padding:"0.5rem"}}>
                    <Typography style={{
                        color:"grey",
                        float:"left",
                        marginLeft:"38%"
                    }}>性别&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{gender}</Typography>
                </div>
                <div style={{padding:"0.5rem"}}>
                    <Typography style={{
                        color:"grey",
                        float:"left",
                        marginLeft:"38%"
                    }}>地区&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{props.location}</Typography>
                </div>
                <div style={{padding:"0.5rem"}}>
                    <Typography style={{
                        color:"grey",
                        float:"left",
                        marginLeft:"29%"
                    }}>个人签名&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{props.signature}</Typography>
                </div>
            </div>
            </Modal>
        </Card>
    )
}