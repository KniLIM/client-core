import ISerializer from 'models/pipeline/backend/serializer';
import { ISerializedMsg } from 'models/msg';
import { redundance } from 'models/pipeline/backend/serializer/redundance/redundance';


export default class RedundanceProtoBufSerializer implements ISerializer {
    public serialize(item: ISerializedMsg): Uint8Array {
        const converted: redundance.Redundance = redundance.Redundance.create({
            ...item});
        return redundance.Redundance.encode(converted).finish();
    }

    public deserialize(data: Uint8Array): any {
        // return data;
        // const int8data = new Int8Array(data);
        const deserialized: redundance.Redundance = redundance.Redundance.decode(data);

        return deserialized.content;
    }
};
