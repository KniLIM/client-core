export default interface IEncryptor {
    encrypt(input: Uint8Array): Uint8Array;
    decrypt(input: Uint8Array): Uint8Array;
};
