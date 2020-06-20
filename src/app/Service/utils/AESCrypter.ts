import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export class AESCrypter {
    key:Uint8Array
    iv:string

    constructor(key:Uint8Array) {
        this.iv=""
        this.key = key
    }

    // AES加密
     encrypt(data:any) {
        const clearEncoding = 'utf8';
        const cipherEncoding = 'base64';
        const cipherChunks = [];
        const cipher = crypto.createCipheriv(algorithm, this.key, this.iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        return cipherChunks.join('');
    }

    // AES解密
    decrypt(data:any) {
        if (!data) {
            return "";
        }
        const clearEncoding = 'utf8';
        const cipherEncoding = 'base64';
        const cipherChunks = [];
        const decipher = crypto.createDecipheriv(algorithm, this.key, this.iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    }

}
