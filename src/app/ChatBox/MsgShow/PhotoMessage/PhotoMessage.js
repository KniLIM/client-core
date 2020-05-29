import React, { Component } from 'react';

import './PhotoMessage.css';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaError from 'react-icons/lib/fa/exclamation-triangle';

import { Modal, Button } from 'antd';

const ProgressBar = require('react-progress-bar.js');
const Circle = ProgressBar.Circle;


export class PhotoMessage extends Component {
    state = { visible: false };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    render() {
        var progressOptions = {
            strokeWidth: 2.3,
            color: '#efe',
            trailColor: '#aaa',
            trailWidth: 1,
            step: (state, circle) => {
                circle.path.setAttribute('trail', state.color);
                circle.path.setAttribute('trailwidth-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0)
                    circle.setText('');
                else
                    circle.setText(value);
            }
        };

        const error = this.props.data.status && this.props.data.status.error === true;

        return (
            <div className="rce-mbox-photo">
                <Modal
                    width={'auto'}
                    height={'auto'}
                    closable={false}
                    centered={true}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div style={{width: '100%', margin: 'auto', maxWidth: '1000px', maxHeight: '800px'}} align="center">
                        <img
                            // style={{maxWidth: '1000px', maxHeight: '800px'}}
                            style={{width: '100%'}}
                            src={this.props.data.uri}
                        />
                    </div>
                </Modal>
                <div
                    className="rce-mbox-photo--img"
                    style={this.props.data.width && this.props.data.height && {
                        width: this.props.data.width,
                        height: this.props.data.height,
                    }}
                >
                    <img
                        src={this.props.data.uri}
                        alt={this.props.data.alt}
                        onClick={this.showModal}
                        onLoad={this.props.onLoad}
                        onError={this.props.onPhotoError}/>
                    {
                        error &&
                        <div className="rce-mbox-photo--img__block">
                            <span
                                className="rce-mbox-photo--img__block-item rce-mbox-photo--error">
                                <FaError/>
                            </span>
                        </div>
                    }
                    {
                        !error &&
                        this.props.data.status &&
                        !this.props.data.status.download &&
                        <div className="rce-mbox-photo--img__block">
                            {
                                !this.props.data.status.click &&
                                <button
                                    onClick={this.props.onDownload}
                                    className="rce-mbox-photo--img__block-item rce-mbox-photo--download">
                                    <FaCloudDownload/>
                                </button>
                            }
                            {
                                typeof this.props.data.status.loading === 'number' &&
                                this.props.data.status.loading !== 0 &&
                                <Circle
                                    progress={this.props.data.status.loading}
                                    options={progressOptions}
                                    initialAnimate={true}
                                    containerClassName={'rce-mbox-photo--img__block-item'} />
                            }
                        </div>
                    }
                </div>
                {
                    this.props.text &&
                    <div className="rce-mbox-text">
                        {this.props.text}
                    </div>
                }
            </div>
        );
    }
}

PhotoMessage.defaultProps = {
    text: '',
    data: {},
    onDownload: null,
    onOpen: null,
    onLoad: null,
    onPhotoError: null,
};


export default PhotoMessage;
