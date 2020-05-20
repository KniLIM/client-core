import * as crypto from 'crypto';
// 需要api支持


const getRandomNumber = (): number => {
    try {
        const num = parseInt(crypto.randomBytes(3).toString('hex'), 16);
        return num;
    } catch (err) {
        throw err;
    }
};


const createDH = () => {
    const dh = crypto.createDiffieHellman(32, getRandomNumber());
    return dh;
};

export const generateKey = () => {

}