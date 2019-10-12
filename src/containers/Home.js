import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../App.css'
import bussvg from '../Bus.svg';
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

class Home extends Component {

  render() {
    return (
      <div>
        {/* style={{ background: '#bae7ff', padding: 50, minHeight: 280 }} */}

        <div className="home-bg">
          <Row>
            <Col span={16}>
              <Row>
                <Col span={16}>
                  <span style={{ color: '#002766', fontSize: '5vw', fontWeight: 'bolder' }}>
                    Book a bus to your destination
                  </span>
                </Col>
                <Col span={24}>
                  <span style={{ color: '#00474f', fontSize: '2vw' }}>
                    the number one bus booking platform in Uganda
                  </span>

                </Col>
              </Row>
              <br />
              <br />
            </Col>
            <Col md={8} sm={24}>
              <img src={bussvg} className="App-logo" alt="logo" />
            </Col>
          </Row>
        </div>

        <div>
  </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps, null)(Home);


