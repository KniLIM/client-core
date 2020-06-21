import { Msg, IMsg, ISerializedMsg } from 'models/msg';
import ISerializer from 'models/pipeline/backend/serializer';
import { msg, google } from 'models/pipeline/backend/serializer/msg/msg';


const getTimeStamp = (ms: number) =>
    google.protobuf.Timestamp.fromObject({
        seconds: ms / 1000,
        nanos: (ms % 1000) * 1e6,
    });

const getMs = (ts: google.protobuf.ITimestamp) =>
    (ts.seconds as number ) * 1000 + (ts.nanos as number) / 1e6;

export default class MsgProtoBufSerializer implements ISerializer {
    public serialize(item: IMsg | Msg): ISerializedMsg {
        if (item instanceof Msg) {
            item = item.toObj() as IMsg;
        }

        const converted: msg.Msg = msg.Msg.create({
            ...item, createAt: item.createAt ? item.createAt.toString() : Date.now().toString() });
        console.log(msg.Msg.encode(converted).finish());
        return {
            msgType: item.msgType,
            sender: item.sender,
            receiver: item.receiver,
            device: 'web',
            content: msg.Msg.encode(converted).finish(),
        } as ISerializedMsg;
    }

    public deserialize(data: Uint8Array): Msg {
        const deserialized: msg.Msg = msg.Msg.decode(data);
        return Msg.fromObject({ ...deserialized, createAt: Number.parseInt(deserialized.createAt) });
    }
};
