import ISerializer from 'serializer/ISerializer';
import images from 'images';


export default class ImageSerializer implements ISerializer {
    public serialize(item: images.ImagesStatic): Uint8Array {
        return item.encode('jpg');
    }

    public deserialize(item: Uint8Array): images.ImagesStatic {
        return images(Buffer.from(item));
    }
}
