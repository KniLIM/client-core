import React, { Component } from 'react';
import Axios from 'axios';
import {message} from 'antd';
import {
    FileFilled,
    CloudDownloadOutlined,
    LoadingOutlined,
} from "@ant-design/icons/lib";

import './FileMessage.css';


export class FileMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloading: false,
        };
    }

    request() {
        return Axios({
            method: 'POST',
            url: this.props.data.uri,
            responseType: 'arraybuffer'
        }).then((res) => {
            if (res.status === 200) {
                return { data: res.data, type: res.headers['content-type'] };
            } else {
                message.error('文件下载失败');
                return null;
            }
        })
    }

    async onClick(e) {
        if (this.state.downloading)
            return;

        this.setState({ downloading: true });
        const response = await this.request();
        if (response !== null) {
            const blob = new Blob([response.data], { type: response.type });
            console.log(response.type);

            const downloadEl = document.createElement('a');
            const href = window.URL.createObjectURL(blob);

            let filename = this.props.text;
            if (response.type !== 'application/octet-stream' && !response.type.startsWith('text')) {
                filename = filename.split('.');
                filename = filename.slice(0, filename.length - 1).join('.')
            }

            downloadEl.href = href;
            downloadEl.download = filename;
            document.body.appendChild(downloadEl);

            downloadEl.click();
            document.body.removeChild(downloadEl);
            window.URL.revokeObjectURL(href);
        }
        this.setState({ downloading: false });
    }

    render() {
        return (
            <div className='rce-mbox-file'>
                <button
                    onClick={this.onClick.bind(this)}
                    disabled={this.state.downloading}
                >
                    <div className="rce-mbox-file--icon">
                        <FileFilled style={{ color: '#aaa' }} />
                        <div className="rce-mbox-file--size">
                            {this.props.data.size}
                        </div>
                    </div>
                    <div className="rce-mbox-file--text">
                        {this.props.text}
                    </div>
                    <div className="rce-mbox-file--buttons">
                        {
                            this.state.downloading ?
                            <LoadingOutlined style={{ color: '#aaa' }} /> :
                            <CloudDownloadOutlined style={{ color: '#aaa'}} />
                        }
                    </div>
                </button>
            </div>
        );
    }
}

FileMessage.defaultProps = {
    text: '',
    data: {},
    onClick: null,
};


export default FileMessage;
