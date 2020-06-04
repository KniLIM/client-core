import { Msg } from "models/msg";

export default interface IPipeline {
    forward(input: Msg): any;
    backward(data: Uint8Array): Msg;
};
