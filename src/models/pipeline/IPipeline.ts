import {Msg} from 'models/msg';
import { Notification } from 'models/notification';
import {IMsgRecord} from "../../app/ChatBox/service";

export default interface IPipeline {
    forward(input: Msg): any;
    backward(data: Uint8Array):any;
};
