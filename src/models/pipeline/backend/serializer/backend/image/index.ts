import ISerializer from 'models/pipeline/backend/serializer/ISerializer';
import images from 'images';


export default class ImageSerializer implements ISerializer {
    public serialize(item: any): any{
        return images(item).encode('jpg');
    }

    public deserialize(item: Uint8Array, checkpoint: string): string {
        const img = images(Buffer.from(item));

        // TODO: 保存到指定位置，返回文件名
        img.save(checkpoint, 'jpg');
        return checkpoint + '.jpg';
    }
};
