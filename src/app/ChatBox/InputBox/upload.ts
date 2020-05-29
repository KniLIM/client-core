import qiNiu from 'qiniu';
import {bucket, accessKey, secretKey} from 'utils/config';
import {message} from 'antd';

interface UploadFile {
    type: string;
    size: number;
};

class UpLoader {
    constructor() {
        this.UpdateToken();
    }

    private time = Date.now();
    private expires = 7200;
    private options = {
        scope: bucket,
        expires: this.expires
    };
    private token = "";
    private mac = new qiNiu.auth.digest.Mac(accessKey, secretKey);

    private UpdateToken() {
        const putPolicy = new qiNiu.rs.PutPolicy(this.options);
        this.token = putPolicy.uploadToken(this.mac);
        this.time = Date.now();
    }

    public getToken() {
        if (this.checkTokenTime()) this.UpdateToken();
        return {token: this.token};
    }

    private checkTokenTime() {
        return (new Date().getTime() - this.time) > this.expires;
    }
};

export const uploader = new UpLoader();

export const beforeImgUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传JPG格式或PNG格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小要小于2MB');
    }
    return isJpgOrPng && isLt2M;
};
