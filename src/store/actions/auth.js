import * as actionTypes from './actionTypes';
import axios from 'axios';
import { message } from 'antd'
import { history } from '../../helpers/history'

const API_HOST_URL = process.env.REACT_APP_API_URL //'http://127.0.0.1:8000'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        currentUser: user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const localTokenForSocialAccount = (socialAccountInfo, dispatch) => {
    console.log("user_id: ", socialAccountInfo.user.id)
    axios.get(`${API_HOST_URL}/api/userprofile/tokens/?user_id=${socialAccountInfo.user.id}`)
        .then(res => {
            console.log("Retrived token object: ", res);
            const localtoken = res.data[0].key;
            console.log("Local Token for Social Account: ", localtoken);

            window.localStorage.setItem("token", localtoken);
            dispatch(authSuccess(localtoken, socialAccountInfo))
        })
        .catch(err => {
            console.log(" Error retrieving local token: ", JSON.stringify(err));
        })

}

//Use GoogleId / FacebookId returned from Google API / Facebook API to get Social Account created on the server.
export const socialAccountInfo = (uid, dispatch) => {
    let socialAccountInfo = {};
    console.log("Id for socialAccountInfo: ", uid)
    //get social account, which has the user information including the username.
    //we will then use the username for getting the token
    axios.get(`${API_HOST_URL}/api/userprofile/socialaccounts/?uid=${uid}`)
        .then(res => {
            socialAccountInfo = res.data[0];
            console.log("SocialAccount Info: ", socialAccountInfo)

            // window.localStorage.setItem("socialAccount", JSON.stringify(socialAccountInfo));
            localTokenForSocialAccount(socialAccountInfo, dispatch);
        })
        .catch(err => {
            console.log(" Error retrieving social account: ", JSON.stringify(err));
        })
}

export const googleLogin = (the_token, googleId) => {
    return dispatch => {
        dispatch(authStart());
        //send google token to backend so that backend can verify it.
        axios.post(`${API_HOST_URL}/rest-auth/google/`, {
            access_token: the_token
        })
            .then(res => {
                console.log("Backend google response: ", res);

                //get the django rest social account info for the google user
                console.log("googleId: ", googleId)
                socialAccountInfo(googleId, dispatch)

                // dispatch(fetchLoggedInEmployee(userId)) 
                dispatch(checkAuthTimeout(3600))
                // history.push('/post-trip')
                // navigateCallback();
                // console.log("Google Token stored is: ", window.localStorage.getItem('token'))
            })
            .catch(err => {
                dispatch(authFail(err))
                console.log("Error backend authenticating google token: ", err.response);
                // console.log(err.response.status);
                // if(err.response.status == 400){
                //     message.error(JSON.stringify('Please provide correct username and password!'),10);
                // }  
            })
    }
}

export const facebookLogin = (the_token, facebookId) => {
    return dispatch => {
        dispatch(authStart());
        //send facebook token to backend so that backend can verify it.
        console.log("facebook token sent to backend: ", the_token)
        axios.post(`${API_HOST_URL}/rest-auth/facebook/`, {
            access_token: the_token
        })
            .then(res => {
                console.log("Backend facebook response: ", res);

                //get the django rest social account info for the facebook user
                socialAccountInfo(facebookId, dispatch)

                dispatch(checkAuthTimeout(3600))

            })
            .catch(err => {
                dispatch(authFail(err))
                console.log("Error backend authenticating facebook token: ", err);
            })
    }
}

export const loggedInUserInfo = (token, dispatch) => {
    let loggedInUser = {};

    axios.get(`${API_HOST_URL}/rest-auth/user/`, {
        headers: { Authorization: 'Token ' + token }
    })
        .then(res => {
            loggedInUser = res.data;
            console.log("LoggedIn User Info: ", loggedInUser)

            window.localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
            dispatch(authSuccess(token, loggedInUser))
        })
        .catch(err => {
            console.log("LoggedInUser Error: ", JSON.stringify(err));
        })
}


export const authLogin = (email, password, navigateCallback) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${API_HOST_URL}/rest-auth/login/`, {
            email: email,
            password: password
        })
            .then(res => {
                console.log("authLogin response: ", res)
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() * 3600 * 1000);

                window.localStorage.setItem('token', token);
                window.localStorage.setItem('expirationDate', expirationDate);
                //LoggedIn User Info    
                loggedInUserInfo(token, dispatch)
                // dispatch(fetchLoggedInEmployee(userId)) 
                dispatch(checkAuthTimeout(3600))
                // history.push('/post-trip')
                navigateCallback();
                console.log("Token is: ", window.localStorage.getItem('token'))
            })
            .catch(err => {
                dispatch(authFail(err))
                console.log("Login Error: ", err.response);
                // console.log(err.response.status);
                // if(err.response.status == 400){
                //     message.error(JSON.stringify('Please provide correct username and password!'),10);
                // }  
            })
    }
}

export const authSignup = (firstName, lastName, username, email, password1, password2, navigateCallback) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${API_HOST_URL}/rest-auth/registration/`, {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            profile: {

            }
        })
            .then(res => {
                const token = res.data.key;
                // const currentUser = res.data;
                const expirationDate = new Date(new Date().getTime() * 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                // dispatch(authSuccess(token, currentUser))
                loggedInUserInfo(token, dispatch)
                dispatch(checkAuthTimeout(3600))
                // console.log("data",res.data);
                navigateCallback();
                message.success("Your account created successfully.")
            })
            .catch(err => {
                dispatch(authFail(err))
                message.error("A problem occured. Account not created!")
            })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = window.localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(window.localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
