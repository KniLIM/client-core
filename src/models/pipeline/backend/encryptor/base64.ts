import IEncryptor from 'pipeline/backend/encryptor';


export default class Base64Encryptor implements IEncryptor {
    public encrypt(input: Uint8Array): Uint8Array {
        const encrypted = Buffer.from(input).toString('utf8');
        return Buffer.from(encrypted, 'base64');
    }

    public decrypt(input: Uint8Array): Uint8Array {
        const decrypted = Buffer.from(input).toString('base64');
        return Buffer.from(decrypted, 'utf8');
    }
}
