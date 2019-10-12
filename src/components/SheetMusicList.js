import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Layout, Menu, Dropdown, Icon, Drawer, Input, Divider, Table, Popconfirm} from 'antd';
import userProfile from '../user_profile.jpg';
import * as actions from '../store/actions/auth';
import { useMediaQuery } from 'react-responsive';
import Highlighter from 'react-highlight-words';


const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

const API_HOST_URL = process.env.REACT_APP_API_URL

class SheetMusicList extends React.Component{

    state = {
        files: [],
        file: {},
        searchText: ''
      }
    
      componentDidMount(){
        this.fetchData();
      }
    
      getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
    
    
      columns = [
        {
          title: 'File Name',
          dataIndex: 'file',
          key: 'file',
          ...this.getColumnSearchProps('file'),
          render: (record) => (
            <span>
                {
                    record ? this.getFileIcon(record) : ''
                }
                {
                    record ? ' ' + this.getFileName(record) : ''
                }
            </span>  
          )
            
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (record) => (
            <span>
            <a href="javascript:;" onClick={() => this.download(record.file)}><Icon type="eye" /></a>
    
            <Divider type="vertical" />
            {this.state.files.length >= 1
              ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                  <a href="javascript:;"><Icon type="delete" /></a>
                </Popconfirm>
              ) : null}
              </span>
          ),
    
        }
      ];
    
      fetchData = () => {
        axios.get(`${API_HOST_URL}/api/sheetmusicfiles/`)
          .then(res => {
            this.setState({
              files: res.data
            })
            console.log(this.state.files)
            for(let item of this.state.files){
               
                console.log("item ", item.file.split('/')[5]);
            }
          })
      }
    
      getFileName(filePath){
          //split the file link to get the filename
          return filePath.split('/')[5]
      }
    
      getFileIcon(filePath){
          let icon = ''
          const fileName = this.getFileName(filePath);
          const fileExtension = fileName.split('.')[1];
    
        if(fileExtension == 'pdf'){
            icon = <Icon type="file-pdf" style={{color: 'red', fontSize: '30px'}} />
        } 
        else if(fileExtension == 'doc' || fileExtension == 'docx'){
            icon = <Icon type="file-word"  style={{color: '#2a579a', fontSize: '30px'}}  />
        }
        else if(fileExtension == 'ppt' || fileExtension == 'pptx'){
            icon = <Icon type="file-ppt"  style={{color: '#b7472a', fontSize: '30px'}}/>
        }
        else if(fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'png'){
            icon = <Icon type="file-image" theme="filled"  style={{fontSize: '30px'}} />
        } else {
            icon = <Icon type="tablet"  style={{fontSize: '30px'}}  />
        }
    
        return icon;
      }
    
      handleDelete = (record) => {
    
        return axios.delete(`${API_HOST_URL}/api/sheetmusicfiles/${record.id}/`,
        {
          headers: {Authorization: 'Token ' + this.props.token}  
        })
                    .then(res => {
                      console.log(res)
                      this.setState({ visible: false });
                      this.fetchData()
                })
                    .catch(error => console.err(error));
      }
    
    download(url) {
      // fake server request, getting the file url as response
      setTimeout(() => {
        const response = {
          file: url,
        };
        // server sent the url to the file!
        // now, let's download:
        window.open(response.file);//opens in a different tab
        // you could also do: opens in the same tab
        // window.location.href = response.file;
      }, 100);
    }
    

    render(){      
        return(
            <div>
                <Desktop>
                         <Row>
                            <Col span={16} offset={4}>
                                <Table columns={this.columns} dataSource={this.state.files} rowKey="id"/>
                            </Col>
                        </Row>
                </Desktop>
    
                <Tablet>
                    <Table columns={this.columns} dataSource={this.state.files} rowKey="id"/>
                </Tablet>

                <Mobile>
                    <Table columns={this.columns} dataSource={this.state.files} rowKey="id"/>
                </Mobile>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      userPermissions: state.userPermissions,
      token: state.token
    }
  }

export default connect(mapStateToProps, null)(SheetMusicList);
