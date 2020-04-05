export default interface ISerializer {
    serialize(item: any): Uint8Array;
    deserialize(data: Uint8Array): any;
}
