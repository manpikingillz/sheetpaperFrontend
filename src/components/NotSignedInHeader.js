import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Layout, Menu, Icon, Drawer } from 'antd';

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


class NotSignedInHeader extends React.Component {

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

    render() {
        const { Header } = Layout;
        return (
            <div>
                <Desktop>

                    <Header style={{ backgroundColor: '#ffffff', height: '65px' }}>
                        <Row>
                            <Col span={8}>
                                <Link to="/">
                                    <span style={{ color: '#fa541c', fontSize: '3em', fontWeight: 'bolder' }}>Book-In</span>
                                    {/* <span style={{color: '#fa541c', fontSize: '3em', fontWeight: 'bolder'}}>vila</span>
                                      <span style={{color: "#00abff",fontSize: '3em', fontWeight: 'bolder'}}>ride</span> */}
                                </Link>
                            </Col>

                            <Col span={4} offset={6}>
                                <Menu
                                    theme="light"
                                    mode="horizontal"
                                    // defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}>
                                    <Menu.Item key="1">
                                        <Link to="/trips-manage">
                                            <span style={{ fontWeight: 'bold' }}>About</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="2"><span style={{ fontWeight: 'bold' }}>How it works</span></Menu.Item>
                                </Menu>
                            </Col>

                            <Col span={4} offset={0}>
                                <Link to="/find-ride">
                                    <Button type="primary" shape="round" size='large' icon="search" style={{ backgroundColor: '#ff3d00', borderWidth: '0px' }}>
                                        Book a Bus
                                        </Button>
                                </Link>
                            </Col>

                            <Col span={2} offset={0}>
                                <Link to="/login">
                                    <Button shape="round" size='large'>Sign in</Button>
                                </Link>
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


                            <Col span={6} style={{ textAlign: 'right' }}>
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

export default NotSignedInHeader;