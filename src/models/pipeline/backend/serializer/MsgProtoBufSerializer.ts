import { Msg, IMsg, ISerializedMsg } from 'models/msg';
import ISerializer from 'models/pipeline/backend/serializer';
import { msg } from 'models/pipeline/backend/serializer/msg/msg';


export default class MsgProtoBufSerializer implements ISerializer {
    public serialize(item: IMsg | Msg): ISerializedMsg {
        if (item instanceof Msg) {
            item = item.toObj() as IMsg;
        }

        const converted: msg.Msg = msg.Msg.create({
            ...item, createAt: item.createAt ? item.createAt : Date.now() });
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
        return Msg.fromObject({ ...deserialized, createAt: deserialized.createAt as number });
    }
};
