export enum NotificationType {
    N_FRIEND_ADD_APPLICATION,
    N_FRIEND_ADD_RESULT,
    N_FRIEND_DELETE_RESULT,
    N_GROUP_JOIN_APPLICATION,
    N_GROUP_JOIN_RESULT,
    N_GROUP_WITHDRAW_RESULT,
    N_GROUP_KICKOFF_RESULT,
    N_GROUP_DELETE,
};

export interface INotification {
    readonly sender: string,
    readonly receiver: string,
    readonly notificationType: NotificationType,
    readonly content: string,
    readonly createAt: string,
};

export class Notification{
    private sender: string;
    private receiver: string;
    private notificationType: NotificationType;
    private content: string;
    private createAt: string;

    private constructor(sender: string, receiver: string, notificationType: NotificationType,
        content: string, createAt: string) {
        this.sender = sender;
        this.receiver = receiver;
        this.notificationType = notificationType;
        this.content = content;
        this.createAt = createAt;
    }

    public static fromObject(obj: INotification): Notification {
        return new Notification(
            obj.sender,
            obj.receiver,
            obj.notificationType,
            obj.content,
            obj.createAt);
    }

    public toObj(): INotification {
        return {
            sender: this.sender,
            receiver: this.receiver,
            notificationType: this.notificationType,
            content: this.content,
            createAt: this.createAt,
        };
    }

    public getSender() {
        return this.sender;
    }

    public getReceiver() {
        return this.receiver;
    }

    public getNotificationType() {
        return this.notificationType;
    }

    public getContent() {
        return this.content;
    }

    public getCreateAt() {
        return this.createAt;
    }
};
