import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (<Route
     {...rest}
     render={props =>{
      console.log("Props in Private Route: ", props.location)
     return (isAuthenticated
      ? <Component {...props} />
     : <Redirect to={{ pathname: "/login", state: {from: props.location} }} />)}
      
    }
    />)
    
     };
  
  //  PrivateRoute.propTypes = {
  //   isAuthenticated: PropTypes.object.isRequired,
  //   component: PropTypes.func.isRequired
  //  }
  
const mapStateToProps = (state) => {
    return {
       isAuthenticated: state.token !== null
    }
  };
  
export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute)

  
// export const PrivateRoute = ({ component: Component, isAuthenticated,  ...rest }) => (
//    <Route {...rest} render={props => (
//     isAuthenticated
//    ? (<Component {...props} />) 
//        : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
//    )} />
// );

// export default PrivateRoute;