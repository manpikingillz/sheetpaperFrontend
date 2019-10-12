import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Layout, Menu, Dropdown, Icon, Drawer} from 'antd';
import userProfile from '../user_profile.jpg';
import * as actions from '../store/actions/auth';
import { useMediaQuery } from 'react-responsive'

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

class MainHeader extends React.Component{

    state = { visible: false, placement: 'right' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  componentDidMount() {
    // this.props.onTryAutoSignup();
  }


    render(){

        const { Header } = Layout;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Link to="/">
                        My sheet music
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="4" onClick={this.props.logout}>
                    Log out
                </Menu.Item>
            </Menu>
        );
            
        return(
            <div>
                <Desktop>
                    <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
                        <Row>
                            <Col span={16}>
                                <Link to="/">
                                    <span style={{ color: '#3452b4', fontSize: '3em', fontWeight: 'bolder' }}>Sheet</span>
                                    <span style={{ color: '#ff0046', fontSize: '3em', fontWeight: 'bolder' }}>paper</span>
                                </Link>
                            </Col>

                            <Col span={6} offset={ this.props.isAuthenticated ? 0 : 2}>
                                <Link to="/upload">
                                    <Button type="primary" shape="round" size='large'  style={{ backgroundColor: '#3452b4', borderWidth: '0px' }}>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Link>
                                &nbsp;
                                <Link to="/">
                                    <Button type="primary" shape="round" size='large'  style={{ backgroundColor: '#ff0046', borderWidth: '0px' }}>
                                        <Icon type="search" /> Search
                                    </Button>
                                </Link>
                            </Col>
                            {
                                this.props.isAuthenticated && 
                                <Col span={2}>
                                    <img src={userProfile} style={{ height: '40px', width: '40px' }} alt="logo" />
                                    &nbsp;&nbsp;
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon style={{ fontSize: '24px', color: "#4c4c4c", fontWeight: "normal" }} type="down" />
                                        </a>
                                    </Dropdown>
                                </Col>
                            }
                        </Row>
                    </Header>
                </Desktop>
    
                <Tablet>
                    <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
                        <Row>
                            <Col span={14}>
                                <Link to="/">
                                    <span style={{ color: '#3452b4', fontSize: '1.5em', fontWeight: 'bolder' }}>Sheet</span>
                                    <span style={{ color: '#ff0046', fontSize: '1.5em', fontWeight: 'bolder' }}>paper</span>
                                </Link>
                            </Col>
                            <Col span={8} offset={ this.props.isAuthenticated ? 0 : 2}>
                                <Link to="/upload">
                                    <Button type="primary" shape="round" size='small'  style={{ backgroundColor: '#3452b4', borderWidth: '0px' }}>
                                        <Icon type="upload" /> 
                                    </Button>
                                </Link>
                                &nbsp;
                                <Link to="/">
                                    <Button type="primary" shape="round" size='small'  style={{ backgroundColor: '#ff0046', borderWidth: '0px' }}>
                                        <Icon type="search" />
                                    </Button>
                                </Link>
                            </Col>
                            {
                                this.props.isAuthenticated && 
                                <Col span={2}>
                                    <img src={userProfile} style={{ height: '20px', width: '20px' }} alt="logo" />
                                    &nbsp;&nbsp;
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon style={{ fontSize: '24px', color: "#4c4c4c", fontWeight: "normal" }} type="down" />
                                        </a>
                                    </Dropdown>
                                </Col>
                            }

                            {/* <Col span={6} style={{textAlign: 'right'}}>
                                <Button type="primary" size="large" onClick={this.showDrawer}>
                                    <Icon type="menu" />
                                </Button>
                            </Col> */}
                        </Row>
                    </Header>

                    <Drawer
                        title="Basic Drawer"
                        placement={this.state.placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </Tablet>

                <Mobile>
                    <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
                        <Row>
                            <Col span={14}>
                                <Link to="/">
                                    <span style={{ color: '#3452b4', fontSize: '1.5em', fontWeight: 'bolder' }}>Sheet</span>
                                    <span style={{ color: '#ff0046', fontSize: '1.5em', fontWeight: 'bolder' }}>paper</span>
                                </Link>
                            </Col>
                            <Col span={8} offset={ this.props.isAuthenticated ? 0 : 2}>
                                <Link to="/upload">
                                    <Button type="primary" shape="round" size='small'  style={{ backgroundColor: '#3452b4', borderWidth: '0px' }}>
                                        <Icon type="upload" /> 
                                    </Button>
                                </Link>
                                &nbsp;
                                <Link to="/">
                                    <Button type="primary" shape="round" size='small'  style={{ backgroundColor: '#ff0046', borderWidth: '0px' }}>
                                        <Icon type="search" />
                                    </Button>
                                </Link>
                            </Col>
                            {
                                this.props.isAuthenticated && 
                                <Col span={2}>
                                    <img src={userProfile} style={{ height: '20px', width: '20px' }} alt="logo" />
                                    &nbsp;&nbsp;
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon style={{ fontSize: '24px', color: "#4c4c4c", fontWeight: "normal" }} type="down" />
                                        </a>
                                    </Dropdown>
                                </Col>
                            }

                            {/* <Col span={6} style={{textAlign: 'right'}}>
                                <Button type="primary" size="large" onClick={this.showDrawer}>
                                    <Icon type="menu" />
                                </Button>
                            </Col> */}
                        </Row>
                    </Header>

                    <Drawer
                        title="Basic Drawer"
                        placement={this.state.placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </Mobile>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState()),
      logout: () => dispatch(actions.logout()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
// export default MainHeader;
