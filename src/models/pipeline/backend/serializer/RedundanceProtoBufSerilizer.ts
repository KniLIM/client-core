import ISerializer from 'models/pipeline/backend/serializer';
import { ISerializedMsg } from 'models/msg';
import { redundance } from 'models/pipeline/backend/serializer/redundance/redundance';


export default class RedundanceProtoBufSerializer implements ISerializer {
    public serialize(item: ISerializedMsg): Uint8Array {
        const converted: redundance.Redundance = redundance.Redundance.create({
            ...item});
        return redundance.Redundance.encode(converted).finish();
    }

    public deserialize(data: Uint8Array): Uint8Array {
        return data;
    }
};
