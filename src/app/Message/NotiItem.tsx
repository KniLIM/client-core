import React, { useState } from 'react'
import { Card, Typography, Button } from 'antd'
import {  BellTwoTone, StarTwoTone, ContactsTwoTone } from '@ant-design/icons'

interface notiProps {
    rcvId: string
    senderId: string
    type: string
    content: string
    createAt: string
}

export default (props: notiProps) => {
    const [ifHandle, setIfHandle] = useState(false)
    const [handleMsg, setHandleMsg] = useState("未处理")

    const HandleType = [
        "N_FRIEND_ADD_APPLICATION",       // 加好友申请 
        "N_GROUP_JOIN_APPLICATION",       // 加群聊申请 
    ]

    const NotifyType = [
        "N_FRIEND_ADD_RESULT",             // 加好友结果 
        "N_FRIEND_DELETE_RESULT",          // 删好友结果
        "N_GROUP_JOIN_RESULT",             // 加群聊结果
        "N_GROUP_WITHDRAW_RESULT",         // 退群聊结果
        "N_GROUP_KICKOFF_RESULT",          // 踢人结果
        "N_GROUP_DELETE",                  // 删群结果
    ]

    const NotiIcon = () => {
        switch(props.type){
            case "N_FRIEND_ADD_APPLICATION" : {
                return (
                    <ContactsTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_GROUP_JOIN_APPLICATION" : {
                return (
                    <StarTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_FRIEND_ADD_RESULT" : {
                return(
                    <BellTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_FRIEND_DELETE_RESULT" : {
                return (
                    <BellTwoTone  twoToneColor="#FF1493" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_GROUP_JOIN_RESULT": {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_GROUP_WITHDRAW_RESULT" : {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_GROUP_KICKOFF_RESULT" : {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
            case "N_GROUP_DELETE" : {
                return (
                    <BellTwoTone  twoToneColor="#4169E1" style={{
                        fontSize:"2.3rem",
                        marginTop:"0.5rem"
                    }}/>
                )
            }
        }
        return null
    }

    const handleOk = () => {
        if(props.type == "N_FRIEND_ADD_APPLICATION"){ //同意加好友
            // 向发送者发送通知消息

        }
        else {  // 同意加群
            // 向发送者发送通知消息

        }
        setHandleMsg("已同意")
        setIfHandle(true)
        console.log(ifHandle)
        console.log(handleMsg)
    }

    const handleReject = () => {
        if(props.type == "N_FRIEND_ADD_APPLICATION"){ // 拒绝加好友
            // 向发送者发送通知消息

        }
        else { // 拒绝加群
            // 向发送者发送通知消息

        }
        setHandleMsg("已拒绝")
        setIfHandle(true)
    }

    const SetFooter = () => {
        // if(props.type !== "N_FRIEND_ADD_APPLICATION" &&
        //    props.type !== "N_GROUP_JOIN_APPLICATION") return null
        if (false) return null
        else {
            if(ifHandle){
                return(
                    <div style={{
                        float:"right",
                        width:"9.1rem",
                        marginTop:"0.9rem"
                    }}><Typography>{handleMsg}</Typography>
                    </div>
                )
            }
            else {
                return(
                    <div style={{
                        float:"right",
                        width:"9.1rem",
                        marginTop:"0.9rem"
                    }}>
                        <Button style={{
                            lineHeight:"normal",
                            fontSize:"0.8rem"
                        }} size="small" type="primary" 
                        onClick={handleOk}>同意</Button>

                        <Button style={{
                            marginLeft:"0.7rem",
                            lineHeight:"normal",
                            fontSize:"0.8rem"
                        }} size="small" type="primary"
                        onClick={handleReject}>拒绝</Button>
                    </div>
                )
            }
        }
    }

    return(
        <Card bodyStyle={{padding:"10px"}}>
            <div style={{
                float:"left",
                width: "4.1rem",
                height: "3.2rem"
            }}>
                <NotiIcon />
            </div>
            <div style={{
                float:"left",
                width:"17rem",
                height:"3.2rem",
                marginLeft:"10px"
            }}>
                <Typography style={{textAlign:"left", color:"grey"}}>{props.createAt}</Typography>
                <div style={{padding:"0.2rem"}}></div>
                <Typography style={{
                    textAlign:"left"
                }}>{props.content}</Typography>
            </div>
            <SetFooter />
        </Card>
    )
}