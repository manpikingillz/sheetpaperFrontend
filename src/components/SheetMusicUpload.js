import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
// import SheetMusicList from './components/SheetMusicList';

const API_HOST_URL = process.env.REACT_APP_API_URL

const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    multiple: true,
    action: `${API_HOST_URL}/api/sheetmusicfiles/`,
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class SheetMusicUpload extends Component{

    render(){

    return(
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload</p>
            </Dragger>
        </div>
        );
    }   
}

export default SheetMusicUpload

