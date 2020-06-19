import {useState,useEffect} from 'react';
import {createModel} from 'hox';
import Axios from 'axios';

export class IGroup {
    public id: string = ''
    public owner: string = ''
    public name: string = ''
    public avatar: string = ''
    public signature: string = ''
    public announcement: string = ''
    public createAt: string = ''
}

export class IUserTmp {
    public id: string = ''
    public nickName: string = ''
    public memo: string = ''
    public avatar: string = ''
    public isAdmin: boolean = false
}

const groupService = 'group/'

export default createModel(() => {
    const defaultGroup = new IGroup()

    const [loading, setLoading] = useState(false)
    const [groups, setGroups] = useState<Array<IGroup>>([])
    const [groupList, setGroupList] = useState<Array<IGroup>>([])
    const [groupInfo, setGroupInfo] = useState<IGroup>(defaultGroup)
    const [member, setMember] = useState<Array<IUserTmp>>()
    const [gFirst, setGfirst] = useState(true)
    const [mFirst, setMfirst] = useState(true)

    useEffect(() => {
        gFirst ? setGfirst(false) : getGroupInfoById(groupInfo.id)
    },[groupInfo])

    useEffect(() => {
        mFirst ? setMfirst(false) : getGroupMember(groupInfo.id)
    }, [member])

    const isInGroup = (id: string) => {
        if (!groups) return false;

        for (let group of groups) {
            if (group.id === id) {
                return true;
            }
        }

        return false;
    }

    const createGroup = (params:any) => {
        Axios.post(groupService, params).then((res) => {
            const tempGroup = new IGroup()
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = res.data['result']['createdAt']
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
        })
    }

    const deleteGroup = (id:string) => {
        Axios.delete(groupService+id).then()
    }

    const getGroupInfoById = (id:string) => {
        setLoading(true)
        Axios.get(groupService+id).then((res) => {
            const tempGroup = new IGroup()
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = res.data['result']['createdAt']
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
            setGroupInfo(tempGroup)
            setLoading(false)
        })
    }

    const updateGroupInfo = (id:string, params:any) => {
        Axios.patch(groupService+id,params).then((res) => {
            const tempGroup = new IGroup()
            tempGroup.id = res.data['result']['id']
            tempGroup.announcement = res.data['result']['announcement']
            tempGroup.avatar = res.data['result']['avatar']
            tempGroup.createAt = res.data['result']['createdAt']
            tempGroup.owner = res.data['result']['owner']
            tempGroup.name = res.data['result']['name']
            tempGroup.signature = res.data['result']['signature']
            setGroupInfo(tempGroup)
        })
    }

    const getGroupMember = (id:string) => {
        setLoading(true)
        Axios.get(groupService+id+'/member').then((res) => {
            const userList: Array<IUserTmp> = []
            console.log(res)
            for(let f of res.data['result']) {
                const tempUser = new IUserTmp()
                tempUser.id = f['id']
                tempUser.nickName = f['nickName']
                tempUser.memo = f['memo']
                tempUser.avatar = f['avatar']
                tempUser.isAdmin = f['isAdmin']
                userList.push(tempUser)
            }
            setMember(userList)
            setLoading(false)
        })
    }

    const participate = (id:string, userId:string, comment:string) => {
        let params:any = {
            'user_id': userId,
            'comment':comment
        }
        Axios.post(groupService+id+'/participation',params).then()
    }

    const handleParticipation = (id:string, userId:string, state:string) => {
        let params:any = {
            'user_id': userId,
            'state':state
        }
        Axios.patch(groupService+id+'/participation',params).then()
    }

    const exitGroup = (id:string, userId:string) => {
        let params:any = {'user_id':userId}
        Axios.post(groupService+id+'/exit',params).then()
    }

    const expelGroup = (id:string, userId:string) => {
        let params:any = {'user_id':userId}
        Axios.post(groupService+id+'/expel',params).then()
    }

    const editMemo = (id:string, userId:string, newName:string) => {
        let params:any = {
            'user_id': userId,
            'new_nickname':newName
        }
        Axios.post(groupService+id+'/nickname',params).then()
    }

    const searchGroupByKeyword = (keyword: string) => {
        setLoading(true)
        let params:any = {'keyword':keyword}
        Axios.get(groupService, params).then((res) => {
            const groupList: Array<IGroup> = [];
                for(let f of res.data['result']) {
                    const tempGroup = new IGroup()
                    tempGroup.id = f['group_id']
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
        groups, setGroups,isInGroup,loading,setLoading,
       searchGroupByKeyword,editMemo,groupList,groupInfo,
       expelGroup,exitGroup,handleParticipation,member,
       participate,getGroupMember,updateGroupInfo,
       getGroupInfoById,deleteGroup,createGroup
    };
});
