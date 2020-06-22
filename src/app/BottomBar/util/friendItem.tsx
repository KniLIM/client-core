import React, {useEffect, useState} from 'react'
import { Card, Avatar, Typography, Button, Tag, Modal, Input, Divider } from 'antd'
import useFriendService from 'app/Service/friendService';
import useUserService from 'app/Service/userService';

const {TextArea} = Input;

interface itemProps {
    id: string
    avatar: string
    name: string
    sex: string
    location: string
    signature: string
}

export default (props: itemProps) => {
    const [modal, showModal] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('')
    const { isFriend, addFriend } = useFriendService()
    const { user } = useUserService()
    const [info, showInfo] = useState(false)

    const applySuccess = () => {  //如果不是好友 则可以添加
        Modal.success({
            content: '发送好友申请成功！'
        })
    }
    const applyFailed = () => {  //如果已经是好友 则不能添加
        Modal.error({
            content: '添加失败！'
        })
    }

    const application = () => {
        addFriend(user.userId, props.id, user.nickname, confirmMsg)
        showModal(false)
        setConfirmMsg('')
    }

    const cancel = () => {
        showModal(false)
        setConfirmMsg('')
    }

    const tagColor = props.sex ? "blue" : "red"
    const gender = props.sex ? "男" : "女"
    const simpleName = props.name.length > 7 ? props.name.substring(0, 7) + "..." : props.name

    return (
        <Card bodyStyle={{padding: "10px"}} hoverable={false}>
            <div style={{float: "left", marginTop: "0.3rem"}}>
                <a onClick={() => showInfo(true)}>
                    <Avatar src={props.avatar}
                            style={{
                                width: "3rem",
                                height: "3rem"
                            }}
                    /></a>
            </div>
            <div style={{ float: "left", height: "3rem", marginBottom: "0.5rem"}}>
                <a onClick={() => showInfo(true)}><Typography
                    style={{
                        textAlign: "left",
                        marginLeft:"0.5rem"
                    }}
                >{simpleName}</Typography></a>

                <Tag color={tagColor}
                     style={{
                         float: "left",
                         marginTop: "7%",
                         width: "1.2rem",
                         height: "1.4rem",
                         marginRight: "0.8rem",
                         padding: "0",
                         lineHeight: "normal",
                         marginLeft:"0.5rem"
                     }}
                >{gender}</Tag>

                <Tag style={{
                    float: "left",
                    marginTop: "7%",
                    height: "1.4rem",
                    lineHeight: "normal",
                }}>{props.location.length > 6 ? props.location.slice(0,5)+'...' : props.location}</Tag>
            </div>
            <div style={{
                float: "right",
                width: "4.2rem",
                height: "3rem"
            }}>
                <Button size='small' onClick={() => showModal(true)} type='primary'
                        style={{
                            width: "4.2rem",
                            float: "right",
                            top: "0.77rem",
                            fontSize: "0.7rem",
                        }}
                        disabled={!!isFriend(props.id, user.userId)}
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
                          onChange={(e) => setConfirmMsg(e.target.value)}
                />
            </Modal>
            <Modal
                title="详细信息"
                visible={info}
                footer={null}
                onCancel={() => showInfo(false)}
                destroyOnClose={true}
                maskClosable={true}
                bodyStyle={{paddingTop: "0", height: "100%", overflow:"hidden"}}
                width="30%">
                <div style={{textAlign:"center",paddingTop: "10px"}}>
                    <Avatar src={props.avatar} style={{
                        height: "4rem",
                        width: "4rem",
                    }}/>
                    </div>
                <Divider style={{
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem"
                }} />
                <div>
                    <Typography style={{
                        fontSize: "1.2rem",
                        textAlign: "center"
                    }}>{props.name}</Typography>
                </div>
                <div style={{ height: "0.5rem" }}></div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>性别</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{gender}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>地区</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{props.location}</Typography>
                </div>
                <div style={{ float: "left", width: "100%", marginBottom: "2%" }}>
                    <Typography style={{
                        color: "grey",
                        float: "left",
                        width: "30%",
                        textAlign: "right"
                    }}>个人签名</Typography>

                    <Typography style={{
                        float: "right",
                        width: "68%",
                        textAlign: "left",
                    }}>{props.signature}</Typography>
                </div>
            </Modal>
        </Card>
    )
}
