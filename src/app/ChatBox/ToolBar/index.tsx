import React, {CSSProperties} from 'react';
import {Button} from "antd";
import {
    FileImageOutlined,
    FolderOpenOutlined,
    VideoCameraOutlined
} from "@ant-design/icons/lib";

/**
 * todo:  按钮响应逻辑
 * @param propStyle
 */

export default (propStyle: CSSProperties) => {
    const style: CSSProperties = {
        ...propStyle,
        display: "flex",
        paddingBottom:"0.6rem"
    }
    return (
        <div style={style}>
            <Button
                style={{marginLeft: "3%"}}
                type="default"
                shape="circle"
                size={"small"}
                icon={<FileImageOutlined />}
            />
            <Button
                style={{marginLeft: "3%"}}
                type="default"
                shape="circle"
                size={"small"}
                icon={<VideoCameraOutlined />}
            />
            <Button
                style={{marginLeft: "3%"}}
                type="default"
                shape="circle"
                size={"small"}
                icon={<FolderOpenOutlined />}
            />
        </div>
    )
}
