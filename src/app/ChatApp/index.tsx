import React, {useEffect, useState} from 'react';
import useRouter from 'use-react-router';
import useService, {TABS} from "app/Service";
import useGroupService from 'app/Service/groupService';
import userUserService from 'app/Service/userService';
import {Drawer, Empty, message, Modal, Form, Button, Upload, Input} from 'antd';
import Sidebar from "app/Sidebar"
import HeaderBar from "app/Headerbar"
import ChatBox from "app/ChatBox"
import BottomBar from "app/BottomBar"
import Detail from "app/Detail"
import Message from "app/Message"
import AddFriendView from 'app/BottomBar/AddFriendView';
import AddGroupView from 'app/BottomBar/AddGroupView';
import ImgCrop from 'antd-img-crop';
import { uploader, beforeImgUpload } from 'app/ChatBox/InputBox/upload';
import { UploadChangeParam } from 'antd/lib/upload';

import './ChatApp.css';

const { TextArea } = Input;

/**
 * 主框架，最好别动
 */
function App() {
    const {
        tabBar,
        showAddGroupView,
        showAddFriendView,
        setNewGroupView,
        setNewFriendView,
    } = useService();
    const {user, userLoading} = userUserService();
    const { createGroup } = useGroupService();

    const { history } = useRouter();

    const [createGroupVisible, setVisible] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const [img, setImg] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    useEffect(() => {
        if (userLoading === false && user.userId === '') {
            message.info('请先登录');
            history.push('/login');
        }
    }, [userLoading, user]);

    const handleCreateGroup = (fieldValue: any) => {
        const values = {
            'owner': user.userId,
            ...fieldValue,
            'avatar': img
        }
        for (var key in values) {
            if (values[key] === undefined || values[key] === '') {
                delete values[key]
            }
        }
        // console.log(values)
        createGroup(values)
    };

    const onImgUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setImgUploading(true);
        } else if (info.file.status === 'done') {
            const imgUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            setImg(imgUrl);
            setFileList([{
                uid: '0',
                name: 'image.png',
                status: 'done',
                url: imgUrl,
            }])
            setImgUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送图片失败');
        }
    }

    const RightBox = (tab: TABS) => {
        switch (tab) {
            case TABS.EMPTY:
                return (<div style={{
                    border: "thin dashed",
                    borderLeft: "none",
                    width: "68%",
                    textAlign: "center",
                    paddingTop: "30%"
                }}><Empty description={"你走以后，我的世界空空如也"}/></div>)
            case TABS.CHAT:
                return (<ChatBox border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
            case TABS.LIST:
                return (<Detail border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
            case TABS.MESSAGE:
                return (<Message border={"thin dashed"} borderLeft={"none"} width={"68%"}/>);
        }
    };

    return (
        <div
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: "1rem",
                width: "86%",
                height: "80%",
                marginTop: "8rem",
                maxWidth: "52rem",
                minWidth: "40rem",
                maxHeight: "80rem",
                minHeight: "40rem",
                border: "2px dashed",
                position: "relative",
                textAlign: 'center',
            }}
        >
            <HeaderBar height={"2rem"}/>
            <div style={{
                display: "flex",
                overflow: "auto",
                position: "absolute",
                top: "4rem",
                bottom: "4rem",
                right: "2rem",
                left: "2rem",
            }}>
                <Sidebar width={"32%"} border={"thin dashed"}/>
                {RightBox(tabBar)}
            </div>
            <BottomBar
                groupVisible={createGroupVisible}
                setGroupVisible={setVisible}
                style={{
                    bottom: "2%",
                    height: "2rem",
                    position: "absolute",
                }}
            />
            <Drawer
                title="添加好友"
                placement="left"
                closable={false}
                onClose={() =>setNewFriendView(false)}
                visible={showAddFriendView}
                getContainer={false}
                style={{position: "absolute",overflow:"hidden"}}
                width="42%"
            >
                <AddFriendView />
            </Drawer>
            <Drawer
                title="添加群组"
                placement="right"
                closable={false}
                onClose={()=>setNewGroupView(false)}
                visible={showAddGroupView}
                getContainer={false}
                style={{position: "absolute",overflow:"hidden"}}
                width="42%"
            >
                <AddGroupView />
            </Drawer>
            <Modal
                centered={true}
                visible={createGroupVisible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form onFinish={handleCreateGroup} className='modify-form'>
                    <Form.Item
                        name='name'
                        label='群名称'
                    >
                        <Input
                            placeholder='请输入群名称'
                        />
                    </Form.Item>
                    <Form.Item
                        label='群头像'
                        name='avatar'
                    >
                        <ImgCrop rotate>
                            <Upload
                                data={() => uploader.getToken()}
                                beforeUpload={beforeImgUpload}
                                showUploadList={false}
                                onChange={onImgUploadChange}
                                disabled={imgUploading}
                                accept=".jpeg, .png"
                                action="http://up-z1.qiniup.com"
                                listType="picture-card"
                            >
                                {img === '' ? '上传群头像' : <img src={img} alt="avatar" style={{ width: '100%' }}></img>}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                    <Form.Item
                        name='signature'
                        label='群简介'
                    >
                        <TextArea
                            rows={4}
                            placeholder='请输入简介'
                        />
                    </Form.Item>
                    <Button className='modify-button' type='primary' htmlType='submit'>
                        提交
                        </Button>
                    <Button className='modify-cancel-button' onClick={() => setVisible(false)}>
                        取消
                        </Button>
                </Form>
            </Modal>
        </div>
    );
}

export default App;
