import TextSerializer from 'models/pipeline/backend/serializer/backend/text';


describe('text serializer', () => {
    const en_us = 'hello world';
    const zh_cn = '你好 世界';
    const serializer = new TextSerializer();

    test('serialize en_us', () => {
        expect(serializer.deserialize(serializer.serialize(en_us))).toBe(en_us);
    });

    test('serialize zh_cn', () => {
        expect(serializer.deserialize(serializer.serialize(zh_cn))).toBe(zh_cn);
    });
});
