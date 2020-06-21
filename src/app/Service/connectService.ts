import {useState} from 'react';
import {createModel} from 'hox';
import io from 'socket.io-client'
import {IUser} from "./userService";
import {IMsgRecord} from "../ChatBox/service";
import {ImagePipelineFactory, TextPipelineFactory} from "../../models/pipeline";
import {ContentType, Msg, MsgType} from "../../models/msg";

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
    // const [key, setKey] = useState()
    // const [dh,setDh] = useState(createDH)
    // 加密解密工具
    // const [aes,setAes]=useState()

    // const newDHKey = () =>{
    //     setDh(createDH());
    //     return getPublicKey;
    // }

    const connectSocket = async (host: string, port: string, token: string, user: IUser) => {

        console.log("starting connect socket")

        if (socket && socket.connected) return connect

        // const clientKey = getPublicKey(dh)
        // console.log('clientGenKey', clientKey)

        const tempSocket = io('http://' + host + ':' + port + "/sockets", {
            query: {
                userId: user.userId,
                token: token,
                device: Device.D_WEB,
                // clientKey: clientKey,
            },
            timeout: 200,
            reconnection: false// todo Test用，记得删
        })
        addEventListenerOptions(tempSocket)
        console.log(tempSocket)
        setSocket(tempSocket)

    }

    const disconnectSocket = () => {
        if (socket && socket.connected)
            socket.disconnect()
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
                console.log('hello is get:', hello)
                // const tempKey = dh.computeSecret(serverPublicKey)
                // console.log(tempKey)
                // setKey(tempKey)
                // const tempAes = new AESCrypter(tempKey)
                if (hello === 'hello') {
                    // setAes(tempAes)
                    console.log('say hello and get data')
                    tempSocket.emit("hello",  (data: any) => {
                        console.log(data)
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
                console.log(data)
                const info = new TextPipelineFactory().getPipeline().backward(data)
                console.log(info)

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
        console.log('pipeline get')
        const finalMsg = pipeline.forward(
            Msg.fromObject({
                msgId: msg.msgId,
                msgType: MsgType.P2P,
                contentType: ContentType.TEXT,
                sender: msg.senderId,
                receiver: rcvID,
                content: msg.content
            }))
        console.log(Msg.fromObject({
            msgId: msg.msgId,
                msgType: MsgType.P2P,
                contentType: ContentType.TEXT,
                sender: msg.senderId,
                receiver: rcvID,
                content: msg.content
        }))

        console.log(pipeline.backward(finalMsg));
        console.log('emitting ing ...',finalMsg)
        socket.emit('send-msg',Buffer.from(finalMsg), (data: any) => {
            console.log(data)
        })

    }



    return {
        connect, setConnect, connectSocket, disconnectSocket,sendMsg
    };
});
