import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import Styles from './Components.module.css';
import { Spring } from 'react-spring/renderprops'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons"


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    const continueWithGoogle = async()=>{
        try{
            const res = await axios.get('/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };
    
    const continueWithFacebook = async()=>{
        try{
            const res = await axios.get('/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };

    const continueWithTwitter = async()=>{
        try{
            const res = await axios.get('/auth/o/twitter/?redirect_uri=http://localhost:8000/twitter')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <Spring
            from={{opacity:0,marginLeft:-500}}
            to={{opacity:1,marginLeft:0}}
            config={{duration:1000}}
            >
                {props =>(
                <div style={props}>
                     <div className={Styles.container}>
                        <div className='row mx-3'>
                            <div className="col-md-5 mx-auto my-auto"> 
                                <h1>Sign In</h1>
                                <p>Sign into your Account</p>
                                <form onSubmit={e => onSubmit(e)}>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control'
                                            type='email'
                                            placeholder='Email'
                                            name='email'
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Password'
                                            name='password'
                                            value={password}
                                            onChange={e => onChange(e)} 
                                            minLength='6'
                                            required
                                        />
                                    </div>
                                    <button className={`${Styles.btn} ${Styles.fill_button}`} type='submit'>Login</button>
                                </form>

                                <p className='mt-3'>
                                        OR
                                </p>
                                <p className='mt-3'>
                                    <button className="btn btn-danger" onClick={continueWithGoogle}><FontAwesomeIcon icon={faGoogle} /> &nbsp;Continue with google</button>
                                </p>
                                <p className='mt-3'>
                                    <button className="btn btn-primary" onClick={continueWithFacebook}><FontAwesomeIcon icon={faFacebook} /> &nbsp; Continue with facebook</button>
                                </p>
                                <p className='mt-3'>
                                    <button className="btn btn-success" onClick={continueWithTwitter}><FontAwesomeIcon icon={faTwitter} /> &nbsp;Continue with twitter</button>
                                </p>
                                <p className='mt-3'>
                                Don't have an account? <Link to='/signup'>Sign Up</Link>
                                </p>
                                <p className='mt-3'>
                                Forgot your Password? <Link to='/reset_password'>Reset Password</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </Spring>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);























// import React,{Component, useState} from 'react';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';

// import Styles from './Components.module.css';

// class Login extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//            username:"",
//            password:""
//         };
//         this.onChangeInput=this.onChangeInput.bind(this);
//         this.handleLogin=this.handleLogin.bind(this);
//     }

//     onChangeInput(event){
//         this.setState({
//             [event.target.name]:event.target.value
//         })

//     }

//     handleLogin(event){
//         event.preventDefault();
//     }

//     render(){
//         return (
//             <div className="row" >
//                 <div className="col-md-5 mx-auto my-5">
//                     <form method="GET">
//                         <div className={Styles.C_input}>
//                             <input onChange={this.onChangeInput}  type="text" name="username" placeholder="Username"/><br/> 
//                         </div>  
//                         <div className={Styles.C_input}>
//                             <input onChange={this.onChangeInput} type="password" name="password" placeholder="Password"/><br/> 
//                         </div> 

//                         <div className="row">
//                             <div className="col-md-5 mx-auto" >
//                                 <button onClick={this.handleLogin} className={`${Styles.btn} ${Styles.fill_button}`}>Login</button>
//                             </div>
//                             <div className="col-md-5 mx-auto" >
//                                 <p>Don't have an account then  </p>
//                                 <button className={`${Styles.btn} ${Styles.fill_button}`}><Link to="/uregister" className={Styles.navlink}>Register</Link></button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//         );
//     }
// }

// export default Login;