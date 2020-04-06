import TextSerializer from 'models/pipeline/backend/serializer/backend/text';
import Base64Encryptor from 'models/pipeline/backend/encryptor/base64';


describe('base64 encryptor', () => {
    const encryptor = new Base64Encryptor();
    const serializer = new TextSerializer();

    const content = serializer.serialize('hello world');

    test('encrypt', () => {
        expect(encryptor.decrypt(encryptor.encrypt(content))).toEqual(content);
    });

    test('after serialize', () => {
        expect(serializer.deserialize(encryptor.decrypt(encryptor.encrypt(content)))).toBe('hello world');
    });
});
