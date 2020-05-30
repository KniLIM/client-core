import React, {CSSProperties, useState} from 'react';
import {Button, Popover, Upload, message} from "antd";
import {Picker, BaseEmoji} from 'emoji-mart';
import {uploader, beforeImgUpload, beforeFileUpload} from 'app/ChatBox/InputBox/upload';
import useMsgListService from 'app/ChatBox/service';
import useService from 'app/service';
import {
    PictureOutlined,
    SmileOutlined,
    FolderOpenOutlined,
    AudioOutlined,
    ArrowUpOutlined
} from "@ant-design/icons/lib";
import { UploadChangeParam } from 'antd/lib/upload';

import 'emoji-mart/css/emoji-mart.css'
import './ToolBar.css'


interface ToolBarProps {
    addEmoji: (value: string) => void;
    onSendMsg: () => void;
    style: CSSProperties;
};

export default (props: ToolBarProps) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        paddingTop: "0.35rem",
    }

    const {user, currentChatBoxId} = useService();
    const {addMsg} = useMsgListService();
    const [pickerVisible, setVisible] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const [fileUploading, setFileUploading] = useState(false);

    const onClickEmoji = (emoji: BaseEmoji, e: React.MouseEvent) => {
        setVisible(false);

        let codes: Array<number> = [];
        emoji.unified.split('-').forEach((code: string) => codes.push(Number.parseInt('0x' + code, 16)));
        const emojiStr = String.fromCodePoint(...codes);
        props.addEmoji(emojiStr);
    };

    const onImgUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setImgUploading(true);
        } else if (info.file.status === 'done') {
            const imgUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            addMsg(currentChatBoxId, {
                msgId: '00000',
                senderId: user.userId,
                senderAvatar: user.userAvatar,
                type: 'photo',
                content: imgUrl,
                date: new Date(),
            })

            setImgUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送图片失败');
        }
    };

    const onFileUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setFileUploading(true);
        } else if (info.file.status === 'done') {
            const fileUrl = 'http://cdn.loheagn.com/' + (info.file.response.key as string);
            addMsg(currentChatBoxId, {
                msgId: '00000',
                senderId: user.userId,
                senderAvatar: user.userAvatar,
                type: 'file',
                content: fileUrl,
                date: new Date(),
                name: info.file.name,
            });
            setFileUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送文件失败');
        }
    }

    return (
        <div style={style}>
            <div style={{marginTop: "0.01rem"}}>
                <Popover
                    placement='top'
                    content={
                        () =>
                            <Picker
                                showPreview={false}
                                emojiTooltip={true}
                                onClick={onClickEmoji}
                                native={true}
                                emojiSize={16}
                            />
                    }
                    trigger='click'
                    visible={pickerVisible}
                    onVisibleChange={v => setVisible(v)}
                >
                    <Button
                        style={{marginLeft: "0.8rem"}}
                        type="default"
                        shape="circle"
                        size={"small"}
                        icon={<SmileOutlined />}
                    />
                </Popover>
            </div>

            <div style={{marginLeft: "0.8rem"}}>
                <Upload
                    data={() => uploader.getToken()}
                    beforeUpload={beforeImgUpload}
                    showUploadList={false}
                    onChange={onImgUploadChange}
                    disabled={imgUploading}
                    accept=".jpeg, .png"
                    action="http://up-z1.qiniup.com"
                >
                    <Button
                        type="default"
                        shape="circle"
                        size="small"
                        loading={imgUploading}
                        icon={<PictureOutlined />}
                    />
                </Upload>
            </div>

            <div style={{marginLeft: "0.8rem"}}>
                <Upload
                    data={() => uploader.getToken()}
                    beforeUpload={beforeFileUpload}
                    showUploadList={false}
                    onChange={onFileUploadChange}
                    disabled={fileUploading}
                    action="http://up-z1.qiniup.com"
                >
                    <Button
                        type="default"
                        shape="circle"
                        size="small"
                        loading={fileUploading}
                        icon={<FolderOpenOutlined />}
                    />
                </Upload>
            </div>

            <div style={{marginTop: "0.01rem", marginLeft: '21.5rem'}}>
                <Button
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<AudioOutlined />}
                />
            </div>
            <div style={{marginTop: "0.01rem", marginLeft: '0.4rem'}}>
                <Button
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<ArrowUpOutlined />}
                    onClick={(e) => props.onSendMsg()}
                />
            </div>
        </div>
    );
};
