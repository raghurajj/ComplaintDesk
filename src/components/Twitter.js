import React, { useEffect } from 'react';
import {useLocation, Redirect} from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import Home from './Home';

const Twitter = ({facebookAuthenticate}) => {

    let location = useLocation(); 
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: '+ state);
        console.log('Code: '+ code);
        

        if(state && code){
            facebookAuthenticate(state,code);
        }
    }, [location]);

    return (
        <Home/>
    );
};

export default connect(null, {facebookAuthenticate })(Twitter);