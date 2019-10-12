import React from 'react';
import { connect } from 'react-redux';
import {Layout} from 'antd';
import NotSignedInHeader from '../components/NotSignedInHeader';
import SignedInHeader from '../components/SignedInHeader';

class MainHeader extends React.Component{
    render(){
        return(
            <div>
                {
                this.props.isAuthenticated ?
                <SignedInHeader/> : <NotSignedInHeader/>    

                }
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
  }
  
  export default connect(mapStateToProps, null)(MainHeader);
// export default MainHeader;
