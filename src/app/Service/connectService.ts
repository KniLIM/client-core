import { useEffect, useState } from 'react';
import { createModel } from 'hox';
import io from 'socket.io-client'
import { IMsgRecord } from "../ChatBox/service";
import { ImagePipelineFactory, TextPipelineFactory } from "../../models/pipeline";
import { ContentType, Msg, MsgType } from "../../models/msg";
import { IUser, IConnect } from 'app/Service/utils/IUserInfo'
import chatService from '../ChatBox/service'
import friendService from './friendService'
import useService from 'app/Service';
import { message } from "antd";
import useChatBoxService from 'app/ChatBox/service'

enum Device {
    D_WEB,
    D_PHONE,
    D_TABLET,
    D_PC,
    D_WATCH,
}

export default createModel(() => {
    const [connect, setConnect] = useState<IConnect>(new IConnect());
    const [socket, setSocket] = useState();
    const [loadingSocket, setLoadingSocket] = useState(false);
    const { addMsg } = chatService();
    const { searchPicFriendById, searchNameFriendById } = friendService();
    const { isCurrentChatGroup } = useService();
    const { msgReadList } = useChatBoxService();

    // const [key, setKey] = useState()
    // const [dh,setDh] = useState(createDH)
    // 加密解密工具
    // const [aes,setAes]=useState()

    // const newDHKey = () =>{
    //     setDh(createDH());
    //     return getPublicKey;
    // }


    const connectSocket = (user: IUser) => {
        // console.log('connecting function run ：',socket)
        // console.log(connect.port , loadingSocket)
        if (connect.port === 0) {
            setLoadingSocket(false)
            return;
        }

        if (loadingSocket) return;
        setLoadingSocket(true)

        const host = connect.host;
        const port = connect.port;
        const token = connect.token;
        // console.log("starting connect socket token", token)

        if (socket && socket.connected) return connect
        // else if (socket && socket.disconnected) {
        //     socket.connect()
        //     return;
        // }

        // const clientKey = getPublicKey(dh)
        // console.log('clientGenKey', clientKey)

        const tempSocket = io('http://' + host + ':' + port + "/sockets", {
        // const tempSocket = io('http://localhost:8777/sockets', {
            query: {
                userId: user.userId,
                token: token,
                device: Device.D_WEB,
                // clientKey: clientKey,
            },
            timeout: 1000,
            reconnection: true,
            reconnectionAttempts: 20,
        })
        addEventListenerOptions(tempSocket, user.userId)
        console.log(tempSocket)
        setSocket(tempSocket)
    }

    const disconnectSocket = () => {
        if (socket && socket.disconnected) {
            console.log('user disconnect .....')
            socket.disconnect()
        }
    }

    // logout
    const leaveSocket = () => {
        if (socket) {
            console.log('user leave .....')
            socket.emit('leave');
            setConnect(new IConnect())
        }
    }

    const rcvMsg = (userId: string, data: Uint8Array) => {
        const info = new TextPipelineFactory().getPipeline().backward(new Uint8Array(data))
        console.log('new msg is :', info)
        if (info) {
            let cType: 'text' | 'photo' | 'file';
            switch (info.getContentType()) {
                case ContentType.FILE:
                    cType = 'file';
                    break;
                case ContentType.IMAGE:
                    cType = 'photo';
                    break;
                default:
                case ContentType.TEXT:
                    cType = 'text'
            }
            let chatBoxId: string = '';
            if (info.getMsgType() === MsgType.P2G) {
                chatBoxId = info.getReceiver();
            } else {
                chatBoxId = info.getSender() === userId ? info.getReceiver() : info.getSender();
            }
            msgReadList[info.getSender()]++;
            addMsg(chatBoxId, {
                msgId: info.getMsgId(),
                senderId: info.getSender(),
                senderAvatar: searchPicFriendById(info.getSender()),
                type: cType,
                content: info.getContent(),
                name: searchNameFriendById(info.getSender()),
                date: info.getCreateAtDate(),
            });
        } else {
            console.log('info error')
        }
    }

    const addEventListenerOptions = (tempSocket: SocketIOClient.Socket, userId: string) => {
        if (tempSocket) {
            tempSocket.on(
                'connect_error', (error: any) => {
                    console.log(error)
                }
            );
            tempSocket.on(
                'connect-error', (error: any) => {
                    console.log('connect-connect-error', error)
                });
            tempSocket.on('connect-ack', (hello: string) => {
                console.log('connect-ack')
                // const tempKey = dh.computeSecret(serverPublicKey)
                // console.log(tempKey)
                // setKey(tempKey)
                // const tempAes = new AESCrypter(tempKey)
                if (hello === 'hello') {
                    // setAes(tempAes)
                    tempSocket.emit("hello", (data: 'hello' | Array<Uint8Array>) => {
                        console.log('hello ack:', data);

                        if (data !== 'hello') {
                            console.log('get offline msg');
                            data.forEach((bytes: Uint8Array) => rcvMsg(userId, bytes));
                        }
                    })
                } else {
                    console.log('加密失败哦')
                    socket.disconnect()
                }
            });
            tempSocket.on('connect_timeout', (timeout: any) => {
                console.log('timeout:', timeout)
            });
            tempSocket.on('rcv-msg', (data: Uint8Array) => {
                console.log('rcv-msg')
                rcvMsg(userId, data);
            });
            tempSocket.on('notification', (data: any) => {
                console.log(data)
            });
            tempSocket.on('error', (error: any) => {
                console.log(error)
            });
        }
    }

    const sendMsg = (rcvID: string, msg: IMsgRecord) => {
        console.log('starting sendMsg function')
        if (!socket) {
            console.log("socket is null")
            return false
        }

        let pipeline, cType: ContentType;
        switch (msg.type) {
            default:
            case "text":
                pipeline = new TextPipelineFactory().getPipeline();
                cType = ContentType.TEXT;
                break;
            case "file":
                cType = ContentType.FILE;
                pipeline = new ImagePipelineFactory().getPipeline();
                break;
            case "photo":
                pipeline = new ImagePipelineFactory().getPipeline();
                cType = ContentType.IMAGE
        }
        const finalMsg = pipeline.forward(
            Msg.fromObject({
                sender: msg.senderId,
                msgType: isCurrentChatGroup ? MsgType.P2G : MsgType.P2P,
                contentType: cType,
                receiver: rcvID,
                content: msg.content,
                msgId: msg.senderId + Date.now(),
            }));

        // console.log('msg is :', Msg.fromObject({
        //     msgId: msg.msgId,
        //     msgType: MsgType.P2P,
        //     contentType: cType,
        //     sender: msg.senderId,
        //     receiver: rcvID,
        //     content: msg.content
        // }))

        console.log('emitting ing ...',finalMsg)
        socket.emit('send-msg', Buffer.from(finalMsg), (data: any) => {
            console.log('send-msg:', data)
            if (data !== 'send-ack') message.warn('send error')
        })
    }
    const isDisConnectInSocket = (): boolean => {
        return socket ? socket.disconnected : true
    }

    return {
        connect, setConnect, connectSocket, disconnectSocket, sendMsg, leaveSocket, isDisConnectInSocket
    };
});
