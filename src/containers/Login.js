import React from 'react';
import { Form, Icon, Input, Button, Spin, Row, Col, Card, Menu, Layout, message } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink, Link, Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import NotSignedInHeader from '../components/NotSignedInHeader';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const API_HOST_URL = process.env.REACT_APP_API_URL

class NormalLoginForm extends React.Component {

    state = {
        redirectToReferrer: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.onAuth(values.email, values.password, () => {
                // console.log(this.props);
                const path = this.props.location.state.from;
                console.log("previous path: ", path)
                // this.props.history.push(path);
                console.log("Props after Login: ", this.props);
                // this.props.history.push('/trips-manage');
                // this.props.history.push("/trips-manage");
                // return (<Redirect to="/find-ride"/>);
                this.setState({ redirectToReferrer: true });
                console.log("changed state: ", this.state.redirectToReferrer);
            });
            // this.setState({ redirectToReferrer: true });
        });
    }

    successResponseGoogle = (response) => {
        console.log(response);
        console.log("Access Token from Google: ", response.tokenObj.access_token);
        this.props.onGoogleAuth(response.tokenObj.access_token, response.profileObj.googleId);
        //     return axios.post(`${API_HOST_URL}/rest-auth/google/`, {
        //             // headers: {Authorization: 'Token ' + response.tokenObj.access_token}  
        //             access_token: response.tokenObj.access_token
        //       })
        //       .then(res => {
        //         console.log(res)

        //   })
        //       .catch(error => {
        //         message.error("Error occured!");  
        //         console.log(error);

        //       });
    }

    failureResponseGoogle = (response) => {
        console.log("Google failure response: ", response);
    }

    responseFacebook = (response) => {
        console.log("facebook callback response: ", response);
        this.props.onFacebookAuth(response.accessToken, response.id)
    }

    render() {
        const { Header } = Layout;
        const { getFieldDecorator } = this.props.form;

        let { from } = this.props.location.state || { from: { pathname: "/" } };
        // let { redirectToReferrer } = this.state;
        console.log("the location state: ", this.props)

        if (this.props.isAuthenticated) return <Redirect to={from} />;

        return (
            <div>
                <div>
                    {/* <NotSignedInHeader/> */}
                    <br />
                    <Row>
                        <Col sm={{ span: 24 }} md={{ span: 8, offset: 8 }}>
                            <Card>
                                <Row type="flex" justify="center">
                                    <Col span={24}>
                                        <h2 style={{ color: "#002766", margin: "12px", textAlign: 'center' }}>Login</h2>
                                    </Col>
                                    <Col span={12}>
                                        <GoogleLogin
                                            clientId={'598454724372-pq6t32l8ueum9lb0immf3np1njqv58b8.apps.googleusercontent.com'}
                                            onSuccess={this.successResponseGoogle}
                                            onFailure={this.failureResponseGoogle}
                                        >
                                            <FontAwesome
                                                name='google'
                                            />
                                            <span> Login with Google</span>
                                        </GoogleLogin>
                                    </Col>
                                    <Col span={12}>
                                        <FacebookLogin
                                            appId="3033159083366475"
                                            autoLoad={true}
                                            fields="name,email,picture"
                                            callback={this.responseFacebook}
                                            // cssClass="facebook-button-class"
                                            render={renderProps => (
                                                <button  className="facebook-button-class" onClick={renderProps.onClick}>Login with Facebook</button>
                                              )}
                                        />
                                    </Col>
                                </Row>

                                <Row type="flex" justify="center">
                                    <Col span={24}>
                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <Form.Item>
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                                        { required: true, message: 'Please input your Email!' }],
                                                })(
                                                    <Input style={{ height: '3em' }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                                })(
                                                    <Input style={{ height: '3em' }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button loading={this.props.loading} type="primary" htmlType="submit" style={{ height: '3em', marginRight: '10px', width: '100%', backgroundColor: '#ff3d00', borderWidth: '0px' }}>
                                                    Login
                                                </Button>
                                                <Row type="flex" justify="center">
                                                    <Col>
                                                        <NavLink style={{ marginRight: '10px' }} to='/login'>
                                                            I forgot my password
                                                        </NavLink>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                            <Row type="flex" justify="center">
                                <Col>

                                    <Link style={{ marginRight: '10px' }} to={{
                                        pathname: '/signup',
                                        state: {
                                            from: this.props.location
                                        }
                                    }}>
                                        <h3>Not yet a member? Sign Up</h3>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </div>
            </div>

        );
    }
}

const Login = Form.create({ name: 'login_form' })(NormalLoginForm);

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, navigateCallback) => dispatch(actions.authLogin(email, password, navigateCallback)),
        onGoogleAuth: (token, googleId) => dispatch(actions.googleLogin(token, googleId)),
        onFacebookAuth: (token, facebookId) => dispatch(actions.facebookLogin(token, facebookId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);