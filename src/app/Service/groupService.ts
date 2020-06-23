import {useState} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';
import {getDB} from 'utils';
import {IFriend, IGroup, IUserInfo} from 'app/Service/utils/IUserInfo'
import {message} from "antd";
import { getDateTime } from '../Message/util';
import useChatService from 'app/ChatBox/service';

export class IUserTmp {
    public id: string = ''
    public nickName: string = ''
    public memo: string = ''
    public avatar: string = ''
    public isAdmin: boolean = false
}

const modifyTime = (time:string) => {
    let tmp = time.split('-')
    return tmp[0] + '-' + tmp[1] + '-' + tmp[2] + ' ' +
            tmp[3] + ':' + tmp[4] + ':' + tmp[5]
}

const deleteGroupMsg = (groupId:string)=>{
    getDB().then(db => {
        if (db) {
            const msgStore = db.transaction('msgList', 'readwrite').objectStore('msgList');
            msgStore.delete(groupId);
        }
    });
}

const editGroupDB = (groups: Array<IGroup>) => {
    getDB().then(db => {
        if (db) {
            const userStore = db.transaction('user', 'readwrite').objectStore('user')
            const getRequest = userStore.getAll()
            getRequest.onsuccess = (e: any) => {
                const res = e.target.result as Array<{ id: string, info: IUserInfo }>
                const tmp: IUserInfo = res[0].info
                tmp.groups = groups
                const uid: string = res[0].id
                userStore.put({
                    id: uid,
                    info: tmp
                })
            }
        }
    })
}


const groupService = 'group/'

export default createModel(() => {
    const defaultGroup = new IGroup()

    const [loading, setLoading] = useState(false)
    const [groups, setGroups] = useState<Array<IGroup>>([])
    const [groupList, setGroupList] = useState<Array<IGroup>>([])
    const [groupInfo, setGroupInfo] = useState<IGroup>(defaultGroup)
    const [member, setMember] = useState<Array<IUserTmp>>([])
    const [isOwner, setIsOwner] = useState(false)
    const [memoLoading, setMemoLoading] = useState(false)
    const [groupListLoading, setGroupListLoading] = useState(false)
    const {setSortedMsgList} = useChatService();

    const isInGroup = (id: string) => {
        if (!groups) return false;

        for (let group of groups) {
            if (group.id === id) {
                return true;
            }
        }

        return false;
    }

    const updateSorted = (groupId: string) => {
        setSortedMsgList(prev => {
            const index = prev.indexOf(groupId);
            const newList = [...prev];
            if (index !== -1) {
                newList.splice(index, 1);
            }
            return newList;
        });
    }

    const createGroup = (params: any) => {
        Axios.post(groupService, params).then((res) => {
            const tempGroup = new IGroup()
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = getDateTime(new Date().getTime().toString())
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
            const tmp = groups
            tmp.push(tempGroup)
            editGroupDB(tmp)
            setGroups(tmp)
        })
    }

    const deleteGroup = (id: string) => {
        console.log('group:', id);
        Axios.delete(groupService + id).then(() => {
            let tmp = groups
            tmp = tmp.filter(item => item.id !== id)
            editGroupDB(tmp)
            setGroups(tmp)
            deleteGroupMsg(id)
            updateSorted(id);
        })
    }

    const getGroupInfoById = (id: string) => {
        setLoading(true)
        Axios.get(groupService + id).then((res) => {
            const tempGroup = new IGroup()
            console.log(res)
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = modifyTime(res.data['result']['created_at'])
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
            setGroupInfo(tempGroup)
            setLoading(false)
        })
    }

    const updateGroupInfo = (id: string, userId: string, params: any) => {
        let tempGroup: IGroup = groupInfo
        if (params.name !== undefined) tempGroup.name = params.name
        if (params.avatar !== undefined) tempGroup.avatar = params.avatar
        if (params.signature !== undefined) tempGroup.signature = params.signature
        if (params.announcement !== undefined) tempGroup.announcement = params.announcement

        setGroupInfo(tempGroup)

        const tmp = groups
        for (let i = 0; i < tmp.length; ++i) {
            if (tmp[i].id === tempGroup.id) {
                tmp[i] = tempGroup
                break
            }
        }
        editGroupDB(tmp)
        setGroups(tmp)

        Axios.patch(groupService + id, params).then((res) => {
            const tempGroup = new IGroup()
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = modifyTime(res.data['result']['created_at'])
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
            setGroupInfo(tempGroup)
        })
    }


    /**
     * 请求网络，更新当前用户的群组列表
     * @param id 当前用户的id
     * @param name 当前用户的name
     */
    const updateGroupList = (id: string) => {
        Axios.get(groupService+'user', {
            params: {user_id: id}
        }).then((res) => {
            console.log('update group', res)
            if (res.data['success']) {
                const result = res.data['result']
                if (result && result[0]['owner']){
                    const username =  result[0]['owner'];
                    const groupList: Array<IGroup> = [];
                    for (let f of result) {
                        if (f['owner'] == username) {
                            const tempGroup = new IGroup()
                            tempGroup.id = f['id']
                            tempGroup.announcement = f['announcement']
                            tempGroup.avatar = f['avatar']
                            tempGroup.createAt = f['created_at']
                            tempGroup.owner = f['owner']
                            tempGroup.signature = f['signature']
                            tempGroup.name = f['name']
                            groupList.push(tempGroup)
                        }
                    }
                }
                setGroups(groupList);
                editGroupDB(groupList)
            } else {
                message.info('please exit and login again')
            }
        })
    };


    const getGroupMember = (id: string, userId: string) => {
        setLoading(true)
        Axios.get(groupService + id + '/member').then((res) => {
            const userList: Array<IUserTmp> = []
            for (let f of res.data['result']) {
                const tempUser = new IUserTmp()
                tempUser.id = f['id']
                tempUser.nickName = f['nickName']
                tempUser.memo = f['memo']
                tempUser.avatar = f['avatar']
                tempUser.isAdmin = f['admin']
                userList.push(tempUser)
            }
            setMember(userList)
            for (let i of userList) {
                if (i.id === userId) {
                    setIsOwner(i.isAdmin)
                    break;
                }
            }
            setLoading(false)
        })
    }

    const participate = (id: string, userId: string, comment: string) => {
        let params: any = {
            'user_id': userId,
            'comment': comment
        }
        Axios.post(groupService + id + '/participation', params).then()
    }

    const handleParticipation = (id: string, userId: string, state: string) => {
        let params: any = {
            'user_id': userId,
            'state': state
        }
        Axios.patch(groupService + id + '/participation', params).then()
    }

    const exitGroup = (id: string, userId: string) => {
        let params: any = {'user_id': userId}
        Axios.post(groupService + id + '/exit', params).then(() => {
            let tmp = groups
            tmp = tmp.filter(item => item.id !== id)
            editGroupDB(tmp)
            setGroups(tmp);
            deleteGroupMsg(id);
            updateSorted(id);
        })
    }

    const expelGroup = (id: string, userId: string) => {
        setMemoLoading(true)
        let params: any = {'user_id': userId}
        setMemoLoading(true)
        Axios.post(groupService + id + '/expel', params).then(() => {
            setMember(prev => {
                return prev.filter((item) => item.id !== userId);
            })
            setMemoLoading(false)
        })
    }

    const editMemo = (id: string, userId: string, newName: string) => {
        setMemoLoading(true)
        let params: any = {
            'user_id': userId,
            'new_nickname': newName
        }
        Axios.post(groupService + id + '/nickname', params).then(() => setMemoLoading(false))
    }

    const searchGroupByKeyword = (keyword: string) => {
        setLoading(true)
        let params: any = {
            params: {'keyword': keyword}
        }
        Axios.get(groupService, params).then((res) => {
            console.log(res)
            const groupList: Array<IGroup> = []
            for (let f of res.data['result']) {
                const tempGroup = new IGroup()
                tempGroup.id = f['id']
                tempGroup.announcement = f['announcement']
                tempGroup.avatar = f['avatar']
                tempGroup.createAt = f['created_at']
                tempGroup.owner = f['owner']
                tempGroup.name = f['name']
                tempGroup.signature = f['signature']
                groupList.push(tempGroup)
            }
            setGroupList(groupList)
            setLoading(false)
        })
    }

    return {
        groups, setGroups, isInGroup, loading, setLoading, updateGroupList,
        searchGroupByKeyword, editMemo, groupList, groupInfo,
        expelGroup, exitGroup, handleParticipation, member, groupListLoading,
        participate, getGroupMember, updateGroupInfo, isOwner, memoLoading,
        getGroupInfoById, deleteGroup, createGroup, setGroupInfo, setMember
    };
});
