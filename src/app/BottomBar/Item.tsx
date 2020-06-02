import React from 'react'
import { Card, Avatar, Typography, Button , Tag} from 'antd'

interface itemProps {
    id: string
    avatar: string
    name: string
    sex: string
    location: string
    loading:boolean
    type: string // friend表示好友item，group表示群组item
}

export default (props: itemProps) => {
    const application = () => {
        if(props.type == "friend"){
            // do something
        }
        else {
            // do something
        }
    }

    const tagColor = props.sex != "woman" ? "blue" : "red"
    const gender = props.sex != "woman" ? "男" : "女"


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
                >{
                    props.name.length>7?props.name.substring(0,7)+"...":props.name
                }</Typography>

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
                <Button size='small' onClick={application} type='primary' 
                     style={{
                        width:"4.2rem",
                        float:"right",
                        top:"0.77rem",
                        fontSize:"0.7rem",
                     }}
                >添加</Button>
            </div>
        </Card>
    )
}