import {useState} from 'react';
import {createModel} from 'hox';
import io from 'socket.io-client'
import {IUser} from "./userService";
import {IMsgRecord} from "../ChatBox/service";
import {ImagePipelineFactory, TextPipelineFactory} from "../../models/pipeline";
import {ContentType, Msg, MsgType} from "../../models/msg";
import chatService from '../ChatBox/service'
import friendService from './friendService'

export class IConnect {
    public host: string = ''
    public port: number = 0
    public token: string = ''
}

enum Device {
    D_WEB,
    D_PHONE,
    D_TABLET,
    D_PC,
    D_WATCH,
}

export default createModel(() => {
    const [connect, setConnect] = useState<IConnect>(new IConnect());
    const [socket, setSocket] = useState()
    const [loadingSocket, setLoadingSocket] = useState(false)
    const {addMsg} = chatService()
    const {searchPicFriendById, searchNameFriendById} = friendService()
    // const [key, setKey] = useState()
    // const [dh,setDh] = useState(createDH)
    // 加密解密工具
    // const [aes,setAes]=useState()

    // const newDHKey = () =>{
    //     setDh(createDH());
    //     return getPublicKey;
    // }

    const connectSocket = async (host: string, port: string, token: string, user: IUser) => {

        if (loadingSocket) return
        setLoadingSocket(true)
        console.log("starting connect socket")

        if (socket && socket.connected) return connect
        else if (socket && socket.disconnected) {
            socket.connect()
            return
        }

        // const clientKey = getPublicKey(dh)
        // console.log('clientGenKey', clientKey)

        const tempSocket = io('http://' + host + ':' + port + "/sockets", {
            query: {
                userId: user.userId,
                token: token,
                device: Device.D_WEB,
                // clientKey: clientKey,
            },
            timeout: 500,
            reconnection: true,
            reconnectionAttempts: 20,
        })
        addEventListenerOptions(tempSocket)
        console.log(tempSocket)
        setSocket(tempSocket)

        setTimeout(() => setLoadingSocket(false), 500)

    }

    const disconnectSocket = () => {
        if (socket)
            socket.disconnect()
    }

    // logout
    const leaveSocket = () => {
        if (socket) {
            socket.emit('leave');
            socket.disconnect()
        }
    }

    const addEventListenerOptions = (tempSocket: SocketIOClient.Socket) => {
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
                    console.log('say hello and get data')
                    tempSocket.emit("hello", (data: any) => {
                        console.log('sat hello result :', data)
                    })
                } else {
                    console.log('加密失败哦')
                    socket.disconnect()
                }
            });
            tempSocket.on('connect_timeout', (timeout: any) => {
                console.log('timeout:', timeout)
            });
            tempSocket.on('rcv-msg', (data: any) => {
                console.log('I get rcv-msg')
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
                    addMsg(info.getReceiver(), {
                        msgId: info.getMsgId(),
                        senderId: info.getSender(),
                        senderAvatar: searchPicFriendById(info.getSender()),
                        type: cType,
                        content: info.getContent(),
                        name: searchNameFriendById(info.getSender()),
                        date: info.getCreateAtDate(),
                    })
                } else {
                    console.log('info error')
                }
                // const enData = aes.encrypt(data)
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

        let pipeline;
        switch (msg.type) {
            case "text":
                pipeline = new TextPipelineFactory().getPipeline();
                break;
            case "file":
            case "photo":
                pipeline = new ImagePipelineFactory().getPipeline();
                break;
        }
        const finalMsg = pipeline.forward(
            Msg.fromObject({
                msgId: msg.msgId,
                msgType: MsgType.P2P,
                contentType: ContentType.TEXT,
                sender: msg.senderId,
                receiver: rcvID,
                content: msg.content
            }))
        console.log('msg is :',Msg.fromObject({
            msgId: msg.msgId,
                msgType: MsgType.P2P,
                contentType: ContentType.TEXT,
                sender: msg.senderId,
                receiver: rcvID,
                content: msg.content
        }))
        // console.log('emitting ing ...',finalMsg)
        socket.emit('send-msg', Buffer.from(finalMsg), (data: any) => {
            console.log('send-msg:', data)
            if (data === 'send-ack')
                return true
        })

    }

    return {
        connect, setConnect, connectSocket, disconnectSocket, sendMsg, leaveSocket
    };
});
