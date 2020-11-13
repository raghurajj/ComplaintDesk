import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import Styles from './Components.module.css';

const Activate = (props) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.verify(uid, token);
        setVerified(true);
    };

    if (verified)
        return <Redirect to='/' />
    return (
        <div className={Styles.container}>
            <div className='container'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop: '200px' }}>
                    <h1>Verify your Account:</h1>
                    <button 
                        onClick={verify_account}
                        style={{ marginTop: '50px' }}
                        type="button"
                        className={`${Styles.btn} ${Styles.fill_button}`}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);