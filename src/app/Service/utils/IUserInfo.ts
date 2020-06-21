
export class IUser {
    public userId: string = '';
    public userAvatar: string = '';
    public email: string = '';
    public phone: string = '';
    public nickname: string = '';
    public sex: string = '';
    public signature: string = '';
    public location: string = '';
    public birthday: string = '';
};


export class IUserInfo {
    public user = new IUser();
    public friends: Array<IFriend> = [];
    public groups: Array<IGroup> = [];
    public connect: IConnect = { host: '', port: 0, token: '', };
};

export class IFriend {
    public id: string = ''
    public nickname: string = ''
    public isTop: boolean = false
    public isBlack: boolean = false
    public createAt: Date = new Date()
    public avatar: string = ''
}


export class IGroup {
    public id: string = ''
    public owner: string = ''
    public name: string = ''
    public avatar: string = ''
    public signature: string = ''
    public announcement: string = ''
    public createAt: string = ''
}

export class IConnect {
    public host: string = ''
    public port: number = 0
    public token: string = ''
}