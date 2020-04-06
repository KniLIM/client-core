import ISerializer from 'models/pipeline/backend/serializer/ISerializer';


export default class TextSerializer implements ISerializer {
    public serialize(item: string): Uint8Array {
        return Buffer.from(item, 'utf8');
    }

    public deserialize(data: Uint8Array): string {
        return Buffer.from(data).toString('utf8');
    }
}
