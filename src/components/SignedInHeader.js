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

class SignedInHeader extends React.Component {

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

  render() {
    const { Header } = Layout;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/user-profile">
            Profile
                </Link>
        </Menu.Item>
        <Menu.Item key="1">
          Payments
              </Menu.Item>
        <Menu.Item key="2">
          <Link to="/account">
            My account
                </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4" onClick={this.props.logout}>
          Log out
              </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Desktop>
          <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
            <Row>
              <Col span={3}>
                <Link to="/">
                  <span style={{ color: '#fa541c', fontSize: '3em', fontWeight: 'bolder' }}>Book-in</span>
                  {/* <span style={{color: '#fa541c', fontSize: '3em', fontWeight: 'bolder'}}>vila</span>
                                      <span style={{color: "#00abff",fontSize: '3em', fontWeight: 'bolder'}}>ride</span> */}
                </Link>
              </Col>

              <Col span={9}>
                <Menu
                  theme="light"
                  mode="horizontal"
                  // defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1"><span style={{ fontWeight: 'bold' }}>Dashboard</span></Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/trips-manage/">
                      <span style={{ fontWeight: 'bold' }}>Trips</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3"><span style={{ fontWeight: 'bold' }}>Help</span></Menu.Item>
                </Menu>
              </Col>

              <Col span={4} offset={5}>
                <Link to="/find-ride">
                  <Button type="primary" shape="round" size='large' icon="search" style={{ backgroundColor: '#ff3d00', borderWidth: '0px' }}>
                    Book a Bus
                                        </Button>
                </Link>
              </Col>

              <Col span={2} offset={1}>
                <img src={userProfile} style={{ height: '40px', width: '40px' }} alt="logo" />
                &nbsp;&nbsp;
                                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon style={{ fontSize: '24px', color: "#4c4c4c", fontWeight: "normal" }} type="down" />
                  </a>
                </Dropdown>
              </Col>

            </Row>

          </Header>
        </Desktop>

        <Mobile>
          <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
            <Row>
              <Col span={18}>
                <Link to="/">
                  <span style={{ color: '#fa541c', fontSize: '3em', fontWeight: 'bolder' }}>Book-in</span>
                  {/* <span style={{color: '#fa541c', fontSize: '3em', fontWeight: 'bolder'}}>vila</span>
                                      <span style={{color: "#00abff",fontSize: '3em', fontWeight: 'bolder'}}>ride</span> */}
                </Link>
              </Col>


              <Col span={6} style={{textAlign: 'right'}}>
                <Button type="primary" size="large" onClick={this.showDrawer}>
                  <Icon type="menu" />
                </Button>
              </Col>

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

// export default SignedInHeader;
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(null, mapDispatchToProps)(SignedInHeader);
