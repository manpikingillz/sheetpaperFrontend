import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../App.css'
import userProfile from '../user_profile.jpg';


class UserProfile extends Component {

    callback(key) {
        console.log(key);
    }

    showDescriptionModal = () => { }

    render() {
        const TabPane = Tabs.TabPane;
        const { loggedInUser } = this.props;
        console.log("props with loggedInUser", loggedInUser)

        return (
            <div>
                {/* <MainHeader/> */}
                <br />
                <Row type="flex">
                    <Col md={{ span: 8 }}>
                        <Card>
                            <Row>
                                <Col md={{ span: 18, offset: 6 }}>
                                    <img src={userProfile} style={{ height: '40%', width: '40%' }} alt="logo" />
                                    <h1 style={{ fontWeight: "bold" }} className="GrayText">{loggedInUser.first_name + ' ' + loggedInUser.last_name}</h1>
                                    <h3 style={{ fontWeight: "normal" }} className="GrayText">Male, 29 years old</h3>
                                    <h3 style={{ fontWeight: "normal" }} className="GrayText">Joined January 2019</h3>

                                </Col>
                            </Row>

                        </Card>
                    </Col>
                    <Col md={{ span: 16 }}>
                        <div style={{ paddingLeft: '24px' }}>
                            <h3 style={{ fontWeight: "normal", textAlign: 'center', paddingTop: '24px' }} className="GrayText">"{loggedInUser.profile.description}"</h3>

                            <h3 style={{ fontWeight: "normal", textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', textDecoration: 'underline' }} className="GrayText" onClick={this.showDescriptionModal}>Edit Description</h3>
                            <Tabs defaultActiveKey="1" onChange={this.callback} >
                                <TabPane tabBarStyle={{ color: "#4c4c4c4" }} tab="Upcoming Trips(1)" key="1">
                                    <Row>
                                        <Col md={{ span: 20 }}>
                                            <Card>
                                                <Row>
                                                    <Col md={{ span: 3 }}>
                                                        <img src={userProfile} style={{ height: '80%', width: '80%' }} alt="logo" />
                                                    </Col>
                                                    <Col md={{ span: 14 }}>
                                                        <h3 style={{ fontWeight: "bold", color: "#0099ff" }} >Kampala to Mbarara</h3>
                                                        <h3 style={{ fontWeight: "normal", }} className="GrayText">Sunday, March 10 at 9:45pm</h3>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <h3 style={{ fontWeight: "bold", }} className="GrayText">10,000 per seat</h3>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab="Recent Trips(5)" key="2">
                                    <Row>
                                        <Col md={{ span: 20 }}>
                                            <Card>
                                                <Row>
                                                    <Col md={{ span: 3 }}>
                                                        <img src={userProfile} style={{ height: '80%', width: '80%' }} alt="logo" />
                                                    </Col>
                                                    <Col md={{ span: 14 }}>
                                                        <h3 style={{ fontWeight: "bold", color: "#0099ff" }} >Kampala to Mbarara</h3>
                                                        <h3 style={{ fontWeight: "normal", }} className="GrayText">Sunday, March 7 at 9:00pm</h3>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <h3 style={{ fontWeight: "bold", }} className="GrayText">10,000 per seat</h3>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Requests(1)" key="3">
                                    <Row>
                                        <Col md={{ span: 20 }}>
                                            <Card>
                                                <Row>
                                                    <Col md={{ span: 3 }}>
                                                        <img src={userProfile} style={{ height: '80%', width: '80%' }} alt="logo" />
                                                    </Col>
                                                    <Col md={{ span: 14 }}>
                                                        <h3 style={{ fontWeight: "bold", color: "#ff3d00" }} >Kampala to Mbale</h3>
                                                        <h3 style={{ fontWeight: "normal", }} className="GrayText">Sunday, March 12 at 8:00pm</h3>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <h3 style={{ fontWeight: "bold", }} className="GrayText">2 seats needed</h3>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        loggedInUser: state.currentUser
    }
}

export default connect(mapStateToProps, null)(UserProfile);
// export default UserProfile;
