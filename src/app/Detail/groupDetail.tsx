import React, { CSSProperties ,useState} from 'react'
import {Tabs, Avatar, Typography, Button} from 'antd'

const { TabPane } = Tabs

export default (style:CSSProperties) => {
    const [edit, setEdit] = useState(false)

    // 是否是群主
    const isOwner = true

    const member = []

    const exitGroup = () => {
        //TODO 退群操作
    }

    const editMsg = () => {
        setEdit(true)
    }

    const deleteGroup = () => {
        // TODO 解散群操作
    }

    const Footer = () => {
        return isOwner ? (
            <div style={{
                float:"right"
            }}>
                <Button onClick={editMsg} type="primary" style={{
                    lineHeight:"normal",
                    fontSize:"90%",
                    marginTop:"2rem",
                    marginRight:"1rem"
                }}
                >编辑信息</Button>

                <Button onClick={deleteGroup} type="primary" style={{
                    lineHeight:"normal",
                    fontSize:"90%",
                    marginTop:"2rem",
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
                    marginTop:"2rem",
                    marginRight:"3rem"
                }}> 退出该群</Button>
            </div>
        )
    }

    return !edit ? (
        <div style={{height:"100%"}}>
            <div style={{padding:"10px"}}></div>
            <Avatar style={{height:"6rem", width:"6rem"}}
            src="https://tse4-mm.cn.bing.net/th/id/OIP.piv-T61QrgN-B0HkMQuJCQAAAA?pid=Api&rs=1" />
            <Typography style={{
                fontSize:"1.3rem",
                paddingTop:"10px"
            }}>群组群组群群组</Typography>
            <Tabs defaultActiveKey="1" style={{height:"68%"}}>
                <TabPane tab="简介" key="1">
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
                    <div style={{float:"left",width:"100%",marginBottom:"2%"}}>
                        <Typography style={{
                            color:"grey",
                            float:"left",
                            width:"30%",
                            textAlign:"right"
                        }}>群组介绍</Typography>

                        <Typography style={{
                            float:"right",
                            width:"63%",
                            textAlign:"left",
                            marginRight:"5%"
                        }}>这是KniLIM的测试交流群，欢迎大家加入～
                        这是KniLIM的测试交流群，欢迎大家加入～
                        这是KniLIM的测试交流群，欢迎大家加入～
                        </Typography>
                    </div>
                    <div style={{float:"left",width:"100%",marginBottom:"2%"}}>
                        <Typography style={{
                            color:"grey",
                            float:"left",
                            width:"30%",
                            textAlign:"right"
                        }}>公告</Typography>

                        <Typography style={{
                            float:"right",
                            width:"63%",
                            textAlign:"left",
                            marginRight:"5%"
                        }}>目前正在完成群组详情页的制作　痛みよ感じる、痛みよ考える
                        痛みよ感じる、痛みよ考える</Typography>
                    </div>
                    <Footer />
                </TabPane>

                <TabPane tab="成员" key="2">

                </TabPane>
            </Tabs>
        </div>
    ) : (
        <div>编辑信息</div>
    )
}