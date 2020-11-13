import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import Styles from './Components.module.css';

const ResetPassword = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        props.reset_password(email);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />
    return (
        <div className={Styles.container}>
            <div className='container'>
                <h1>Request Password Reset:</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input 
                            className='form-control'
                            type='email'
                            placeholder='Your Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <button className={`${Styles.btn} ${Styles.fill_button}`} type='submit'>Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);