import { IPipeline, PipelineDecorator } from 'pipeline/IPipeline';
import IEncryptor from 'pipeline/backend/encryptor';
import Base64Encryptor from 'pipeline/backend/encryptor/base64';


type EncryptType = 'base64' | 'AES' | 'DES' | 'RC4' | 'TripleDES' | 'Rabbit';

export default class EncryptDecorator extends PipelineDecorator {
    private encryptor: IEncryptor;

    public constructor(wrapper: IPipeline, encryptType: EncryptType = 'base64') {
        super(wrapper);
        switch (encryptType) {
            case 'base64':
                this.encryptor = new Base64Encryptor();
            default:
                throw Error('error encryptor type');
        }
    }

    public forward(input: Uint8Array): Uint8Array {
        return this.encryptor.encrypt(this.wrapper.forward(input));
    }

    public backward(input: Uint8Array): Uint8Array {
        return this.wrapper.backward(this.encryptor.decrypt(input));
    }
}
