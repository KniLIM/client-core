import React, {CSSProperties, useState} from 'react';
import {Button, Popover} from "antd";
import {Picker, BaseEmoji} from 'emoji-mart';

import {
    PictureOutlined,
    SmileOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons/lib";

import 'emoji-mart/css/emoji-mart.css'
import './ToolBar.css'

/**
 * todo:  按钮响应逻辑
 * @param propStyle
 */

interface ToolBarProps {
    addEmoji: (value: string) => void;
    style: CSSProperties;
};

export default (props: ToolBarProps) => {
    const style: CSSProperties = {
        ...props.style,
        display: "flex",
        paddingTop: "0.35rem",
    }

    const [visible, setVisible] = useState(false);

    const onClickEmoji = (emoji: BaseEmoji, e: React.MouseEvent) => {
        setVisible(false);

        let codes: Array<number> = [];
        emoji.unified.split('-').forEach((code: string) => codes.push(Number.parseInt('0x' + code, 16)));
        const emojiStr = String.fromCodePoint(...codes);
        props.addEmoji(emojiStr);
    }

    return (
        <div style={style}>
            <Popover
                placement='top'
                content={
                    () =>
                        <Picker
                            set='apple'
                            showPreview={false}
                            emojiTooltip={true}
                            onClick={onClickEmoji}
                            native={true}
                            emojiSize={16}
                        />
                }
                trigger='click'
                visible={visible}
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

            <Button
                style={{marginLeft: "0.8rem"}}
                type="default"
                shape="circle"
                size={"small"}
                icon={<PictureOutlined />}
            />
            <Button
                style={{marginLeft: "0.8rem"}}
                type="default"
                shape="circle"
                size={"small"}
                icon={<FolderOpenOutlined />}
            />
        </div>
    )
}
