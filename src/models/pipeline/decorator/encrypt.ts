import IPipeline from 'models/pipeline/IPipeline';
import PipelineDecorator from 'models/pipeline/decorator';
import IEncryptor from 'models/pipeline/backend/encryptor';
import Base64Encryptor from 'models/pipeline/backend/encryptor/base64';


type EncryptType = 'base64' | 'AES' | 'DES' | 'RC4' | 'TripleDES' | 'Rabbit';

export default class EncryptDecorator extends PipelineDecorator {
    private backend: IEncryptor;

    public constructor(wrapper: IPipeline, encryptType: EncryptType = 'base64') {
        super(wrapper);
        switch (encryptType) {
            case 'base64':
                this.backend = new Base64Encryptor();
                break;
            default:
                throw Error('error encryptor type');
        }
    }

    public forward(input: any): Uint8Array {
        return this.backend.encrypt(this.wrapper.forward(input));
    }

    public backward(input: Uint8Array): any {
        return this.wrapper.backward(this.backend.decrypt(input));
    }
};
