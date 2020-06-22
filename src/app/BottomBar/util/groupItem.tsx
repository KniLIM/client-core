import React, { useState } from 'react'
import { Card, Avatar, Typography, Button ,Modal, Divider} from 'antd'
import { Input } from 'antd'
import useGroupService from 'app/Service/groupService'
import useUserService from 'app/Service/userService'

const { TextArea } = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    owner: string
    signature: string
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')
    const [info, showInfo] = useState(false)

    const {
        isInGroup,participate
    } = useGroupService()

    const {user} = useUserService()

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
        if(!isInGroup(props.id)){
            console.log(props)
            participate(props.id, user.userId, confirmMsg)
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

    const simpleName = props.name.length>10?props.name.substring(0,10)+"...":props.name

    return (
        <Card bodyStyle={{padding:"10px"}}>
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
                        marginTop:"0.77rem",
                        marginLeft:"0.5rem"
                    }}
                >{simpleName}</Typography></a>
            </div>
            <div style={{
                float:"right",
                width:"4.2rem",
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
                title={"加入群聊：" + " " + props.name}
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
                bodyStyle={{paddingTop:"0",height:"100%",overflow:"hidden"}}
                width="24%">
                <div style={{textAlign:"center",paddingTop: "10px"}}>
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
                        }}>{props.owner}</Typography>
                </div>
                <div style={{float:"left",width:"100%",marginBottom:"2%"}}>
                        <Typography style={{
                            color:"grey",
                            float:"left",
                            width:"30%",
                            textAlign:"right"
                        }}>群聊简介</Typography>

                        <Typography style={{
                            float:"right",
                            width:"68%",
                            textAlign:"left",
                        }}>{props.signature}</Typography>
                </div>
            </Modal>
        </Card>
    )
}
