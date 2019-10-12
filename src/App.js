import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css'

import Login from './containers/Login'
import Signup from './containers/Signup';
import Home from './containers/Home';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import MainHeader from './components/MainHeader';


class App extends Component {
  render() {
    const { Content, Footer } = Layout;
    return (
      
      <Router>
        <Layout className="layout">
            <Content style={{ padding: '0 00px' }}>
            <MainHeader/>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <PrivateRoute path="/user-profile" exact component={UserProfile} />

              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Book-In ©2019
            </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;

