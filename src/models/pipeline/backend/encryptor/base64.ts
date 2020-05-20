import IEncryptor from 'models/pipeline/backend/encryptor';


export default class Base64Encryptor implements IEncryptor {
    public encrypt(input: Uint8Array): Uint8Array {
        const encrypted = Buffer.from(input).toString('base64');
        return Buffer.from(encrypted);
    }

    public decrypt(input: Uint8Array): Uint8Array {
        const decrypted = Buffer.from(input).toString();
        return Buffer.from(decrypted, 'base64');
    }
};
