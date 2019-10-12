import React from 'react';
import {Form, Input, Icon, Button, Card, Col, Row, Layout} from 'antd';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.onAuth(
                values.firstName,
                values.lastName,
                values.username,
                values.email, 
                values.password,
                values.confirm,
                () => { 
                  // this.props.history.push('/find-ride'); 
                  console.log(this.props);
                }    
            );
            
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;

      let { from } = this.props.location.state || { from: { pathname: "/" } };
      // let { redirectToReferrer } = this.state;
      console.log("the location state: ",this.props)

      if (this.props.isAuthenticated) return <Redirect to={from} />;
  
      return (
        <div>
        {/* <NotSignedInHeader/> */}
        {/* style={{backgroundColor: '#009bff'}} */}
        <div className="signup-bg">
          <br/>
          <Row type="flex" >
            <Col span={24}>
              <h2 style={{color: '#ffffff', fontSize: '2em', fontWeight: 'bold', textAlign: 'center', textShadow: '0 0 3px #234252'}}>
                  Free signup for bus passengers
              </h2>
                      {/* <br/> */}
                          
                <h2 style={{color: '#ffffff',  textAlign: 'center'}}>
                  Use Book-In to book your bus trips
                </h2>
                <br/>
            </Col>
          </Row>
          <Row>
              <Col  sm={{span: 24}} md={{span: 8, offset: 8}} >
                  <Card>
                      <Row type="flex" justify="center">
                                <Col span={24}>
                                    <h2 style={{color: "#002766", margin: "12px", textAlign: 'center'}}>Sign Up</h2> 
                                </Col>
                      </Row>

                      <Row type="flex" justify="center">
                          <Col span={24}>
                              <Form onSubmit={this.handleSubmit}>
                                  <Form.Item>
                                                  {getFieldDecorator('firstName', {
                                                  rules: [{ required: true, message: 'Please input your First Name!' }],
                                                  })(
                                                  <Input style={{ height: '3em' }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
                                                  )}
                                    </Form.Item>
                                    <Form.Item>
                                                  {getFieldDecorator('lastName', {
                                                  rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                  })(
                                                  <Input style={{ height: '3em' }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                                                  )}
                                    </Form.Item>
                                    <Form.Item>
                                                  {getFieldDecorator('username', {
                                                  rules: [{ required: true, message: 'Please input your username!' }],
                                                  })(
                                                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                  )}
                                    </Form.Item>

                                    <Form.Item>
                                      {getFieldDecorator('email', {
                                        rules: [{
                                          type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                          required: true, message: 'Please input your E-mail!',
                                        }],
                                      })(
                                        <Input style={{ height: '3em' }}  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email"  />
                                      )}
                                    </Form.Item>

                                    <Form.Item>
                                      {getFieldDecorator('password', {
                                        rules: [{
                                          required: true, message: 'Please input your password!',
                                        }, {
                                          validator: this.validateToNextPassword,
                                        }],
                                      })(
                                        <Input style={{ height: '3em' }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password"  />
                                      )}
                                    </Form.Item>
                                    <Form.Item >
                                      {getFieldDecorator('confirm', {
                                        rules: [{
                                          required: true, message: 'Please confirm your password!',
                                        }, {
                                          validator: this.compareToFirstPassword,
                                        }],
                                      })(
                                        <Input style={{ height: '3em' }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
                                      )}
                                    </Form.Item> 

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{height: '3em', marginRight: '10px', width: '100%', backgroundColor: '#ff3d00', borderWidth: '0px'}}>
                                                              Sign Up
                                        </Button>
                                                      <Row type="flex" justify="center">
                                                          <Col>
                                                              <NavLink style={{marginRight: '10px'}} to='/login'> 
                                                                  Already a member? Sign In
                                                              </NavLink>
                                                          </Col>
                                                      </Row>
                                    </Form.Item>
                              </Form>
        </Col>
        </Row>
        </Card>
        <br/>
          <Row type="flex" justify="center">
                                <Col>
                                
                                <NavLink style={{marginRight: '10px'}} to='/login'> 
                                    <h2 style={{color: '#ffffff'}}>Need more info? See how it works</h2>
                                </NavLink>
                                </Col>
          </Row>
          <br/>
        </Col>
        </Row>
        </div>
        </div>
      );
    }
  }
  
  const Signup = Form.create({ name: 'register' })(RegistrationForm);
  
  const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName, lastName, username, email, password1, password2, navigateCallback) => dispatch(actions.authSignup(firstName, lastName, username, email, password1, password2, navigateCallback)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);