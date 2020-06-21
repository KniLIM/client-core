import React, {Component} from "react";
import "./index.css";
import {Button} from "antd"
import MediaRecorder from "react-audio-analyser"
import { PlayCircleOutlined, PauseCircleOutlined, StopOutlined } from '@ant-design/icons';
import {uploader, beforeImgUpload, beforeFileUpload} from 'app/ChatBox/InputBox/upload';

export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ""
        }
    }

    componentDidMount() {
    }

    controlAudio(status) {
        this.setState({
            status
        })
    }

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    onFileUploadChange = (info) => {
        if (info.file.status === 'uploading') {
            setFileUploading(true);
        } else if (info.file.status === 'done') {
            const fileUrl = 'http://cdn.loheagn.com/' + (info.file.response.key);
            // socket send
            setFileUploading(false);
        } else if (info.file.status === 'error') {
            message.error('发送文件失败');
        }
    }

    render() {
        const {status, audioSrc, audioType} = this.state;
        const audioProps = {
            audioType: 'audio/mp3',
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
            status,
            audioSrc,
            timeslice: 1000,
            width: 0,
            height: 0,
            startCallback: (e) => {
                console.log("succ start", e)
            },
            pauseCallback: (e) => {
                console.log("succ pause", e)
            },
            stopCallback: (e) => {
                this.setState({
                    
                })
                console.log("succ stop", e)
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        return (
            <div>
                <MediaRecorder {...audioProps}>
                </MediaRecorder>
                <div className="btn-box">
                        {
                            status !== "recording" && 
                            <Button type="primary" shape="circle" onClick={() => this.controlAudio("recording")} icon={<PlayCircleOutlined />} />
                        }
                        {
                            status === "recording" &&
                            <Button type="primary" shape="circle" onClick={() => this.controlAudio("paused")} icon={<PauseCircleOutlined />} />
                        }
                        <Button type="primary" shape="circle" onClick={() => this.controlAudio("inactive")} icon={<StopOutlined />} />
                </div>
            </div>
        );
    }
}