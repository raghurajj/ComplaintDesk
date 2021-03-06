import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL
} from './types';

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        // console.log(config);

        try {
            const res = await axios.get('/auth/users/me/', config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            // console.log("yupp");
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        // console.log("ntt");
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const googleAuthenticate =(state,code) => async dispatch=>{
    if(state && code && !localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details ={
            'state':state,
            'code':code
        }; 

        const formBody = Object.keys(details).map(key => encodeURIComponent(key)+ '=' + encodeURIComponent(details[key])).join('&');

        try{
            const res = await axios.post(`/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type:GOOGLE_AUTH_SUCCESS,
                payload:res.data
            });

            dispatch(load_user());
        }catch(err){
            dispatch({
                type:GOOGLE_AUTH_FAIL
            });

        }
    }
};

export const facebookAuthenticate =(state,code) => async dispatch=>{
    if(state && code && !localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details ={
            'state':state,
            'code':code
        }; 

        const formBody = Object.keys(details).map(key => encodeURIComponent(key)+ '=' + encodeURIComponent(details[key])).join('&');

        try{
            const res = await axios.post(`/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type:FACEBOOK_AUTH_SUCCESS,
                payload:res.data
            });

            dispatch(load_user());
        }catch(err){
            dispatch({
                type:FACEBOOK_AUTH_FAIL
            });

        }
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ token: localStorage.getItem('access') });
    
        try {
            const res = await axios.post('/auth/jwt/verify/', body, config);
    
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/auth/jwt/create/', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = ({ firstname,lastname, email, password, re_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ firstname,lastname, email, password, re_password }); 

    try {
        const res = await axios.post('/auth/users/', body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token }); 

    try {
        const res = await axios.post('/auth/users/activation/', body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email }); 

    try {
        const res = await axios.post('/auth/users/reset_password/', body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password }); 

    try {
        const res = await axios.post('/auth/users/reset_password_confirm/', body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};