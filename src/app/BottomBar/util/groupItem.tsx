import React, { useState } from 'react'
import { Card, Avatar, Typography, Button , Tag, Modal, Divider} from 'antd'
import { Input } from 'antd'
import useGroupService from 'app/Service/groupService';

const { TextArea } = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    owner: string
    signature: string
    loading:boolean
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')
    const {isInGroup} = useGroupService()
    const [info, showInfo] = useState(false)

    const applySuccess = () => {  //如果在群里 则可以添加
        Modal.success({
            content: '申请加入群聊成功！'
        })
    }

    const applyFailed = () => {  //如果已经在群里 则不能添加
        Modal.error({
            content: '不能加入已经加入的群聊！'
        })
    }
    
    const application = () => {
        // 需要判断是否在群里
        if(isInGroup(props.id)){
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
                        textAlign:"left",
                        marginTop:"0.77rem"
                    }}
                >{simpleName}</Typography></a>
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
                >加入</Button>
            </div>
            <Modal
                title={"加入群聊：" + " " + simpleName}
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
                    }}>群主&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{props.owner}</Typography>
                </div>
                {/* <div style={{padding:"0.5rem"}}>
                    <Typography style={{
                        color:"grey",
                        float:"left",
                        marginLeft:"38%"
                    }}>地区&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{props.location}</Typography>
                </div> */}
                <div style={{padding:"0.5rem"}}>
                    <Typography style={{
                        color:"grey",
                        float:"left",
                        marginLeft:"29%"
                    }}>群聊简介&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography style={{color:"black"}}>{props.signature}</Typography>
                </div>
            </div>
            </Modal>
        </Card>
    )
}