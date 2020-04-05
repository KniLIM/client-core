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
    readonly msgId: string,
    readonly msgType: MsgType,
    readonly contentType: ContentType,
    readonly sender: string,
    readonly receiver: string,
    readonly createAt: number,
    readonly content: any,
};

export interface ISerializedContentMsg {
    readonly msgId: string,
    readonly msgType: MsgType,
    readonly contentType: ContentType,
    readonly sender: string,
    readonly receiver: string,
    readonly createAt: number,
    readonly content: Uint8Array,
}

export abstract class Msg {
    protected msgId: string;
    protected msgType: MsgType;
    protected contentType: ContentType;

    protected sender: string;
    protected receiver: string;
    protected createAt: number;

    public constructor(msgId: string, msgType: MsgType, contentType: ContentType,
        sender: string, receiver: string) {
        this.msgId = msgId;
        this.msgType = msgType;
        this.contentType = contentType;

        this.sender = sender;
        this.receiver = receiver;
        this.createAt = Date.now();
    }

    public toObj(): IMsg {
        return {
            msgId: this.msgId,
            msgType:this.msgType,
            contentType: this.contentType,
            sender: this.sender,
            receiver: this.receiver,
            createAt: this.createAt,
            content: this.getContent(),
        } as IMsg;
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

    public abstract getContent(): any;
}
