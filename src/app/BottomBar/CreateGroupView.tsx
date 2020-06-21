import React, {useState} from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { uploader, beforeImgUpload } from 'app/ChatBox/InputBox/upload';
import { UploadChangeParam } from 'antd/lib/upload';
import useGroupService from 'app/Service/groupService';
import userUserService from 'app/Service/userService';

const {TextArea} = Input;


export interface CreateGroupViewProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

export default (props: CreateGroupViewProps) => {
    const {user} = userUserService();
    const { createGroup } = useGroupService();

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
        props.setVisible(false)
        message.success('创建群聊成功!');
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

    return (
        <Modal
            centered={true}
            visible={props.visible}
            onCancel={() => props.setVisible(false)}
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
                <Button className='modify-cancel-button' onClick={() => props.setVisible(false)}>
                    取消
                </Button>
            </Form>
        </Modal>
    );
};
