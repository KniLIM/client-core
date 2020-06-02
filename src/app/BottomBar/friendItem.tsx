import React, { useState } from 'react'
import { Card, Avatar, Typography, Button , Tag, Modal} from 'antd'
import { Input } from 'antd';

const { TextArea } = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    sex: string
    location: string
    loading:boolean
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')

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
        // 需要判断是否是好友
        console.log(confirmMsg)
        showModal(false)
        applySuccess()
        setConfirmMsg('')
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
                <Avatar src={props.avatar} 
                    style={{
                        width: "3rem",
                        height: "3rem"
                    }}
                />
            </div>
            <div style={{float:"left", height:"3rem"}}>
                <Typography 
                    style={{
                        textAlign:"left"
                    }}
                >{simpleName}</Typography>

                <Tag color={tagColor}
                    style={{
                        float:"left",
                        marginTop:"7%",
                        width:"1.2rem",
                        height:"1.2rem",
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
        </Card>
    )
}