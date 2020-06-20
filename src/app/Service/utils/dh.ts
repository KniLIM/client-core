import * as crypto from 'crypto';
import {util} from "protobufjs";

// 需要api支持
const Length = 512
const getRandomNumber = (): number => {
    try {
        const num = parseInt(crypto.randomBytes(3).toString('hex'), 16);
        return num;
    } catch (err) {
        throw err;
    }
};

export const createDH = () => {
    return crypto.createDiffieHellman(Length);
};

export const getPublicKey = (dh:crypto.DiffieHellman)=>{
    dh.generateKeys()
    return dh.getPublicKey('base64')
}

export const getFinalKey = (dh:crypto.DiffieHellman,serverKey:Uint8Array)=>{
    return dh.computeSecret(serverKey)
}
