import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken, 
        userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL, 
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password, 
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDgMrYo4aSvw9jTFR_pjMdCQQKvSqNWDvY';

        if(!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDgMrYo4aSvw9jTFR_pjMdCQQKvSqNWDvY';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            });
    };
}