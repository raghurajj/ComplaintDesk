import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import Home from './Home';

const Google = ({googleAuthenticate}) => {

    let location = useLocation(); 
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: '+ state);
        console.log('Code: '+ code);
        

        if(state && code){
            googleAuthenticate(state,code);
        }
    }, [location]);

    return (
        <Home/>
    );
};

export default connect(null, {googleAuthenticate })(Google);