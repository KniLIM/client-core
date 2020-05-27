export enum MsgType {
    P2P = 0,
    P2G = 1,
}

export enum ContentType {
    WITHDRAW = 0, // 撤回
    TEXT     = 1, // 文字（包括内置表情包）
    IMAGE    = 2, // 图片
    FILE     = 3, // 文件
    AUDIO    = 4, // 语音
    VIDEO    = 5, // 视频
}

export interface IMsg {
    readonly msgId: string,             // msgId 规则： 端 (0: Web, 1: phone, 2: pc ...) + sender + createAt，可作为文件命名
    readonly msgType: MsgType,
    readonly contentType: ContentType,
    readonly sender: string,
    readonly receiver: string,
    readonly createAt?: number,
    readonly content: string,
}

export interface ISerializedContentMsg {
    readonly msgId: string,
    readonly msgType: MsgType,
    readonly contentType: ContentType,
    readonly sender: string,
    readonly receiver: string,
    readonly createAt: number,
    readonly content: Uint8Array,
}

export class Msg {
    private msgId: string;
    private msgType: MsgType;
    private contentType: ContentType;

    private sender: string;
    private receiver: string;
    private createAt: number;

    private content: any;

    private constructor(msgId: string, msgType: MsgType, contentType: ContentType,
        sender: string, receiver: string, content: string) {
        this.msgId = msgId;
        this.msgType = msgType;
        this.contentType = contentType;

        this.sender = sender;
        this.receiver = receiver;
        this.createAt = Date.now();

        this.content = content;
    }

    public static fromObject(obj: IMsg): Msg {
        let out = new Msg(obj.msgId, obj.msgType, obj.contentType, obj.sender,
            obj.receiver, obj.content as string);
        out.createAt = obj.createAt ?? Date.now();
        return out;
    }

    public toObj() {
        return {
            msgId: this.msgId,
            msgType:this.msgType,
            contentType: this.contentType,
            sender: this.sender,
            receiver: this.receiver,
            createAt: this.createAt,
            content: this.content,
        };
    }

    public getMsgId(): string {
        return this.msgId;
    }

    public getMsgType(): MsgType {
        return this.msgType;
    }

    public getContentType(): ContentType {
        return this.contentType;
    }

    public getSender(): string {
        return this.sender;
    }

    public getReceiver(): string {
        return this.receiver;
    }

    public getCreateAt(): number {
        return this.createAt;
    }

    public getCreateAtDate(): Date {
        return new Date(this.createAt);
    }

    public getContent(): string {
        return this.content;
    }
}
