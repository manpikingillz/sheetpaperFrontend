import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css'

import Login from './containers/Login'
import Signup from './containers/Signup';
import SheetMusicList from './components/SheetMusicList';
import PrivateRoute from './components/PrivateRoute';
import MainHeader from './components/MainHeader';
import SheetMusicUpload from './components/SheetMusicUpload';

class App extends Component {
  render() {
    const { Content, Footer } = Layout;
    return (
      
      <Router>
        <Layout className="layout">
            <Content style={{ padding: '0 00px' }}>
            <MainHeader/>
              <Switch>
                  <Route path="/" exact component={SheetMusicList} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/upload" exact component={SheetMusicUpload} />

              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Sheetpaper ©2019
            </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;

