// msg test

import { IMsg, Msg, MsgType, ContentType } from 'models/msg';
import MsgProtoBufSerializer from "models/pipeline/backend/serializer/MsgProtoBufSerializer";
import RedundanceProtoBufSerializer from "../pipeline/backend/serializer/RedundanceProtoBufSerilizer";

describe('message', () => {
    const textObj: IMsg = {
        content: "啊",
        contentType: 1,
        createAt: 1592716024670,
        msgId: "00000",
        msgType: 0,
        receiver: "929d5b80-b183-11ea-9f93-acde48001122",
        sender: "92949b9e-b183-11ea-9f93-acde48001122",
    }
    const textMsg = Msg.fromObject(textObj);
    const serializer = new MsgProtoBufSerializer();
    const serializer2 = new RedundanceProtoBufSerializer();

    test('create from factory', () => {
        expect(textMsg instanceof Msg).toBeTruthy();
    });

    test('get content', () => {
        expect(textMsg.getContent()).toBe('啊');
    });

    test('get property', () => {
        expect(textMsg.toObj()).toEqual({ ...textObj, createAt: textMsg.getCreateAt() });
    });

    test('serializer', () => {
        // expect(serializer.deserialize(serializer.serialize(textMsg))).toStrictEqual(textMsg);
        const ser = serializer.serialize(textMsg);
        const ser2  = serializer2.serialize(ser);

        const des = serializer2.deserialize(ser2);
        console.log('re:', des);

        const des2 = serializer.deserialize(des.content);
        console.log('final:', des2);
        console.log('raw:', textMsg);
    })
});
