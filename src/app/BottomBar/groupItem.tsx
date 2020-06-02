import React, { useState } from 'react'
import { Card, Avatar, Typography, Button , Tag, Modal} from 'antd'
import { Input } from 'antd';

const { TextArea } = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    loading:boolean
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')

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
        console.log(confirmMsg)
        showModal(false)
        applySuccess()
        setConfirmMsg('')
    }

    const cancel = () => {
        showModal(false)
        setConfirmMsg('')
    }

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
                        textAlign:"left",
                        marginTop:"0.77rem"
                    }}
                >{simpleName}</Typography>
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
        </Card>
    )
}