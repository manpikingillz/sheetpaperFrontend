import React, { Component } from 'react';
import axios from 'axios';
import { Upload, Icon, message, Form, Button } from 'antd';
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

class SheetMusicUploadForm extends Component{

  handleSubmit = () => {
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
        if (err) {
            return;
        }
        console.log("values are here: ", values)
        let formData = new FormData();

        formData.append('file', values.sheetMusicFile[0].originFileObj);
        formData.append('uploadedBy', this.props.loggedInUser.pk);

                return axios.post(`${API_HOST_URL}/api/sheetmusicfiles/`,
                    formData,
                    {
                        headers: {
                            Authorization: 'Token ' + this.props.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        console.log(res)
                        form.resetFields();
                        this.setState({ visible: false });
                        this.fetchData()
                    })
                    .catch(error => console.log(error));

    });
}

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };



    render(){
      const { getFieldDecorator } = this.props.form;

    return(
        <div>
          {/* <Form layout="vertical" onSubmit={this.handleSubmit} >
                <Form.Item >
                  {getFieldDecorator('sheetMusicFile', {
                    // valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  },
                  {
                    rules: [{ required: true, message: 'Please upload some files' }],
                })(
                    <Upload.Dragger beforeUpload={()=>false}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload</p>
                    </Upload.Dragger>,
                  )}
                </Form.Item>
                <Form.Item
                                // wrapperCol={{ span: 12, offset: 5 }}
                                >
                                <Button type="primary" htmlType="submit" style={{height: '3em', marginRight: '10px', width: '100%', backgroundColor: '#3452b4', borderWidth: '0px'}}>
                                    Save
                                </Button>
                            </Form.Item>
          </Form> */}

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

const SheetMusicUpload = Form.create({ name: 'sheet-music-upload-form' })(SheetMusicUploadForm);

export default SheetMusicUpload

