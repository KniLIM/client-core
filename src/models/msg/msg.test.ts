// msg test

import { IMsg, Msg, MsgType, ContentType } from 'models/msg';


describe('message', () => {
    const textObj: IMsg = {
        msgId: '12345678',
        msgType: MsgType.P2P,
        contentType: ContentType.TEXT,
        sender: '4j6hh3jk23',
        receiver: 'cv8df678e4',
        content: 'hello world',
    }
    const textMsg = Msg.fromObject(textObj);


    test('create from factory', () => {
        expect(textMsg instanceof Msg).toBeTruthy();
    });

    test('get content', () => {
        expect(textMsg.getContent()).toBe('hello world');
    });

    test('get property', () => {
        expect(textMsg.toObj()).toEqual({ ...textObj, createAt: textMsg.getCreateAt() });
    });
});
