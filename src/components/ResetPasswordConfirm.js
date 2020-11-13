import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import Styles from './Components.module.css';

const ResetPasswordConfirm = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />
    return (
        <div className={Styles.container}>
            <div className='container'>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input 
                            className='form-control'
                            type='password'
                            placeholder='New Password'
                            name='new_password'
                            value={new_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm New Password'
                            name='re_new_password'
                            value={re_new_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <button className={`${Styles.btn} ${Styles.fill_button}`} type='submit'>Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);